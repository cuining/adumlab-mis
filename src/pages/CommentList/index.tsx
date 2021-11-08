import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import OperationModal from './components/OperationModal';
import type { TableListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { category } from '../../constants';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  try {
    await addRule({ ...fields });
    return true;
  } catch (error) {
    message.error('Adding failed, please try again!');
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
  const key = 'remove';
  message.loading({ content: '删除中...', key });
  if (!selectedRows) return true;
  try {
    const { code } = await removeRule({
      id: selectedRows.map((row) => row.id),
    });
    if (code === 1) message.success({ content: '删除成功', key });
    return true;
  } catch (error) {
    message.error({ content: '删除失败, 请重试。', key });
    return false;
  }
};

const TableList: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();

  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: any) => {
    setDone(true);
    console.log(values);

    if (currentRow) {
      updateRule({ id: currentRow.id, ...values });
    } else {
      handleAdd(values);
    }
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '发布者',
      dataIndex: 'source',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.article-content" defaultMessage="Article content" />
      ),
      dataIndex: 'content',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.article-type" defaultMessage="Article type" />,
      dataIndex: 'category',
      hideInForm: true,
      valueEnum: category,
    },
    {
      title: '发布连接',
      sorter: true,
      hideInSearch: true,
      dataIndex: 'source_url',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.article-publishAt"
          defaultMessage="Article publish time"
        />
      ),
      dataIndex: 'publish_at',
      hideInSearch: true,
    },

    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="Edit" />
        </a>,
        <a
          key="delete"
          onClick={async () => {
            await handleRemove([record]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="Delete" />
        </a>,
      ],
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
        rowKey="id"
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
              setCurrentRow(undefined);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />

      <OperationModal
        done={done}
        current={currentRow}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default TableList;
