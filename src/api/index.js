import request from '@/utils/request'

export const getData = params => request({ url: `/table/page`, method: 'get', params });
