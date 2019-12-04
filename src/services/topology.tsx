import request from '@/utils/request';

export async function get(id: string) {
  return request(`/api/topology//${id}`);
}

export async function list(pageIndex: number, pageCount: number) {
  return request(`/api/topologies?pageIndex=${pageIndex}&pageCount=${pageCount}`);
}