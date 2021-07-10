import type { FC} from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, Input, Radio } from 'antd';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<any> | undefined;
  onDone: () => void;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      values.publish_at = new Date().toLocaleDateString('zh');
      onSubmit(values as any);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {/* <Form.Item
          name="publish_at"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item> */}
        <Form.Item
          name="type"
          label="类型"
          initialValue={1}
        >
          <Radio.Group
            options={[{label: '新闻',value: 1}, {label: '通知', value: 2}]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          name="content"
          label="内容"
          rules={[{ message: '请输入内容，不少于10个字', min: 10 }]}
        >
          <TextArea rows={4} placeholder="请输入至少十个字符" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `文章${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
