export type TableListItem = {
  id: number;
  title: string;
  content: string;
  type: number;
  updatedAt?: Date;
  createdAt?: Date;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  title?: string;
  content?: string;
  id?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
