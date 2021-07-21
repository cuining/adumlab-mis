import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
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
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

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
      title: '图片',
      dataIndex: 'path',
      hideInSearch: true,
      render: (value) => <img src={value as string} alt="" width="100" />,
    },
    {
      title: '产品类型',
      dataIndex: 'category',
      valueEnum: category,
    },
    {
      title: '顺序',
      dataIndex: 'order_num'
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      hideInForm: true,
      valueEnum: { 1: '图片', 2: '视频' },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInForm: true,
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
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
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
