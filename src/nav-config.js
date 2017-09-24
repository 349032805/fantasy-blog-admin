const nav = [
  {
    icon: 'el-icon-star-on',
    index: 'index',
    path: '/index',
    title: '首页'
  },{
    icon: 'el-icon-document',
    index: 'blog',
    title: '博客',
    subs: [
       {
            index: 'belong',
            path:'/belong',
            icon: '',
            title: '分类描述'
        },
        {
            index: 'article',
            path:'/article',
            icon: '',
            title: '文章'
        }
    ]
  },{
    icon: 'el-icon-message',
    index: 'message',
    path: '/message',
    title: '留言'
  },{
    icon: 'el-icon-share',
    index: 'friendLink',
    path: '/friendLink',
    title: '友情链接'
  },{
    icon: 'el-icon-upload',
    index: 'fileUpload',
    path: '/fileUpload',
    title: '文件上传'
  },{
    icon: 'el-icon-setting',
    index: 'webConfig',
    path: '/webConfig',
    title: '网站配置'
  }

]
export default nav
