import http from '../axios'
export default {
  getAllFriendLinks(){
    return http('get','/api/getAllFriendLinks');
  },
  addLink(data){
    return http('post','/api/addLink',data,'json');
  },
  updateLink(data){
    return http('post','/api/updateLink',data,'json');
  },
  deleteLink(id){
    return http('post','/api/deleteLink', {id: id});
  }
}
