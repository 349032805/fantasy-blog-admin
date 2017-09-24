import http from '../axios'

export default {
    //获取所有文章
    getAllArticles(){
        return http('get','/api/getAllArticles');
    },
    //保存文章
    addArticle(data){
        return http('post','/api/addArticle', data,'json');
    },
    //获取文章详细
    getArticleDetail(id){
        return http('get','/api/getArticleDetail',{id:id});
    },
    //删除文章
    deleteArticle(id){
        return http('post','/api/deleteArticle', {id:id});
    },
    //修改文章
    updateArticle(data){
        return http('post','/api/updateArticle', data,'json');
    },
    //根据参数获取文章列表
    getArticlesByParams(data){
        return http('get','/api/getArticlesByParams',data);
    },
    //文章置顶
    setArticleUp(id,isUp){
        return http('post','/api/setArticleUp',{id:id,isUp:isUp});
    },
     //文章隐藏
    setArticleHide(id,isHide){
        return http('post','/api/setArticleHide',{id:id,isHide:isHide});
    }
}
