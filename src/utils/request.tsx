import _request, { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';

import { Cookie } from 'le5le-store';

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// response拦截器, 处理response
_request.interceptors.response.use((response: any, options) => {
  if (response.body.error) {
    notification.error({
      message: `服务错误`,
      description: response.body.error,
    });
  }
  return response;
});



/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response = {} } = error;
  const { status } = response;

  const errortext = codeMessage[response.status] || response.statusText;

  if (status === 401) {
    notification.error({
      message: '请先登录。',
    });

    return;
  }

  // environment should not be used
  if (status === 403) {
    router.push('/');
    return;
  }
  if (status <= 504 && status >= 500) {
    notification.error({
      message: `服务错误`,
      description: errortext,
    });
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/');
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  headers: {
    'Authorization': Cookie.get('token')
  },
  credentials: 'omit'
});

export default request;