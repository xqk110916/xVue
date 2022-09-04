import request from '@/utils/request'

export const getData = params => request({ url: `/table/list`, method: 'get', params });
