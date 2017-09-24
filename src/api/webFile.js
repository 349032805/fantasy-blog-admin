import http from '../axios'
export default {
  getFilesByParams(data) {
    return http('get', '/api/getFilesByParams', data);
  },
  deleteFile(id, filePath) {
    return http('post', '/api/deleteFile', { id: id, filePath: filePath });
  },
  updateUse(id, use) {
    return http('post', '/api/updateUse', { id: id, use: use });
  }
}
