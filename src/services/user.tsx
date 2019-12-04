import request from '@/utils/request';

export async function get() {
  return request('/api/user/profile');
}