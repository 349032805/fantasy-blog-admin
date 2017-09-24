import http from '../axios'
export default {
    getConfig() {
        return http('get', '/api/getConfig');
    },
    addOrUpdateConfig(data) {
        return http('post', '/api/addOrUpdateConfig', data, 'json');
    }
}