import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  const currentUid = localStorage.getItem('bmd-uid')
  return request(`/manager/user/${currentUid}`).then(response => {
    response.data.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    response.data.name = response.data.username
    return response
  })
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
