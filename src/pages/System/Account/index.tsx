import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormField } from '@ant-design/pro-form';

import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const key = 'adding';
  message.loading({ content: 'Adding', key });
  try {
    const result = await addRule({ ...fields });
    console.log(result.ret);

    if (!result) {
      message.error({ content: 'Adding failed, please try again!', key });
    } else if (result.ret == -1) {
      message.error({ content: result.msg, key });
    } else {
      message.success({ content: 'Added successfully', key });
    }

    return true;
  } catch (error) {
    message.error({ content: 'Adding failed, please try again!', key });
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.index" defaultMessage="Index" />,
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.username" defaultMessage="Username" />,
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.createAt" defaultMessage="Create time" />,
      dataIndex: 'created_at',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateAt" defaultMessage="Update time" />,
      dataIndex: 'updated_at',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newAccount',
          defaultMessage: 'New Account',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="用户名"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.username"
                  defaultMessage="username is required"
                />
              ),
            },
          ]}
          width="md"
          name="username"
        />
        <ProFormField
          valueType="password"
          label="密码"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.password"
                  defaultMessage="password is required"
                />
              ),
            },
          ]}
          width="md"
          name="password"
        />
        <ProFormField
          valueType="password"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.password"
                  defaultMessage="password is required"
                />
              ),
            },
          ]}
          width="md"
          name="password_confirmation"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
