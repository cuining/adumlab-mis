import type { FC } from 'react';
import { useEffect } from 'react';
import { Modal, Result, Button, Form, InputNumber, Input, Radio, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from '../style.less';

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
         <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input placeholder="请输入描述" />
        </Form.Item>
        <Form.Item name="category" label="产品类型" initialValue={1}>
          <Radio.Group
            options={[
              { label: '人气产品', value: 1 },
              { label: '人气产品下方九宫格', value: 2 },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="order_num" label="顺序" initialValue={0}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="url"
          label="内部链接"
          rules={[{ required: true, message: '请输入内部链接，以 / 开头' }]}
        >
          <Input placeholder="/toaster" />
        </Form.Item>
        <Form.Item name="path" label="Banner" valuePropName="path" getValueFromEvent={normFile}>
          <Upload name="file" action="/manager/file" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
