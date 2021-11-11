import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/manager/user', {
    params,
  });
}

export async function removeRule(params: { id: number }) {
  return request(`/manager/user/${params.id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/manager/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/manager/user/password/reset', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
