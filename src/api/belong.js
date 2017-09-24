import http from '../axios'

export default {
    getBelong(cate) {
        return http('get', '/api/getBelong', { cate: cate });
    },
    addOrUpdateBelong(data) {
        return http('post', '/api/addOrUpdateBelong', data, 'json');
    }
}
