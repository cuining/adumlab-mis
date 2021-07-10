import request from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request('/manager/user/login', {
    method: 'POST',
    data: params,
  }).then((response) => {
    return {
      status: response.code === 1 ? 'ok' : 'error',
      currentAuthority: response.data.id === 1 ? 'admin' : '',
      ...response
    }
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
