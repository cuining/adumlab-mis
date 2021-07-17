import type { FC} from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, Input, Radio, DatePicker } from 'antd';
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
        publish_at: current.publish_at ? moment(current.publish_at) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      values.publish_at = new Date().toLocaleDateString('zh').replace(/\//g, '-');
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
          name="source"
          label="发布者"
          rules={[{ required: true, message: '请输入发布者' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="source_url"
          label="发布链接"
          rules={[{ required: true, message: '请输入发布链接' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="publish_at"
          label="发布时间"
          rules={[{ required: true, message: '请选择发布时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="类型"
          initialValue={0}
        >
          <Radio.Group
            options={[{label: 'Toaster',value: 0}, {label: '通知', value: 2}]}
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
      title={done ? null : `${current ? '编辑' : '添加'}`}
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
