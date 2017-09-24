import http from '../axios'
export default {
  getMessagesByParams(data) {
    return http('get', '/api/getMessagesByParams', data);
  },
  deleteMessage(id) {
    return http('post', '/api/deleteMessage', { id: id });
  },
  responseMessage(id,response) {
    return http('post', '/api/responseMessage', { id: id,response: response});
  }
}
