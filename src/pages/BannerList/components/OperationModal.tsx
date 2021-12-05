import type { FC } from 'react';
import { useEffect } from 'react';
import { Modal, Result, Button, Form, InputNumber, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { category } from '../../../constants';

import styles from '../style.less';

const options = Object.keys(category).map((c) => ({ label: category[c], value: parseInt(c, 10) }));
interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<any> | undefined;
  onDone: () => void;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

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
      form.setFieldsValue(current);
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as any);
    }
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList[0]?.response?.data?.oss_path;
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
        <Form.Item name="category" label="产品类型" initialValue={0}>
          <Radio.Group options={options} optionType="button" buttonStyle="solid" />
        </Form.Item>
        <Form.Item name="type" label="资源类型" initialValue={1}>
          <Radio.Group
            options={[
              { label: '图片', value: 1 },
              { label: '视频', value: 2 },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="order_num" label="顺序" initialValue={0}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item name="path" label="Banner" valuePropName="path" getValueFromEvent={normFile}>
          <Upload name="file" action="http://123.56.134.170/manager/file" listType="picture" maxCount={1} withCredentials={true}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item label=" ">202*108，图片最大1Mb</Form.Item>
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
