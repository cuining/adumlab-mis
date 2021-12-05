import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  return request('/manager/banner', {
    params,
  }).then(res => res.data);
}

export async function removeRule(params: { id: number[] }) {
  return request(`/manager/banner/${params.id}`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/manager/banner', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request(`/manager/banner/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}
