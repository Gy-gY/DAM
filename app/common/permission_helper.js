let PERMISSIONS={
  admin_function:'admin_function',
  front_function:'front_function',
  download_pic:'download_pic',
  collection_pic:'collection_pic',
  folder_create_page:'folder_create_page',
  folder_create:'folder_create',
  folder_edit:'folder_edit',
  folder_delete:'folder_delete',
  folder_copy:'folder_copy',
  folder_move:'folder_move',
  folder_merge:'folder_merge',
  folder_link:'folder_link',
  content_upload_page:'content_upload_page',
  content_upload:'content_upload',
  content_edit:'content_edit',
  content_delete:'content_delete',
  content_audit_page:'content_audit_page',
  audit_pass:'audit_pass',
  audit_reject:'audit_reject',
  audit_online:'audit_online',
  audit_offline:'audit_offline',
  workgroup_management_page:'workgroup_management_page',
  workgroup_create:'workgroup_create',
  workgroup_edit:'workgroup_edit',
  workgroup_delete:'workgroup_delete',
  user_enable:'user_enable',
  user_disable:'user_disable',
  user_workgroup_manage:'user_workgroup_manage',
  join_workgroup:'join_workgroup',
  user_create:'user_create',
  user_edit:'user_edit',
  keyword_category_management_page:'keyword_category_management_page',
  category_create:'category_create',
  category_edit:'category_edit',
  category_delete:'category_delete',
  keyword_delete:'keyword_delete',
  keyword_create:'keyword_create',
  keyword_edit:'keyword_edit',
  operation_log_page:'operation_log_page',
  folder_read:'folder_read',

  // Below is the newest permissions.
  admin_login:'admin_login',
  assets_upload_page: 'assets_upload_page',
  assets_audit_page: 'assets_audit_page',
  folder_management_page:'folder_management_page',
  user_management_page: 'user_management_page',
  permission_management_page: 'permission_management_page',
  keyword_management_page: 'keyword_management_page',
  no_audit: 'no_audit',
  user_assets_page: 'user_assets_page',
  api_management_page: 'api_management_page',

};

export default [
  {
    'keyName': PERMISSIONS.admin_function,
    'displayName': '全部后台功能',
    'description': '全部后台功能',

    'path': '1',
    'parentId': null,
  },
  {
    'keyName': PERMISSIONS.admin_login,
    'displayName': '登录后台',
    'description': '登录后台功能',
    'path': '1,2',
    'parentId': 1,
  },
  {
    'keyName': PERMISSIONS.front_function,
    'displayName': '全部前台功能',
    'description': '全部前台功能',

    'path': '3',
    'parentId': null,
  },
  {
    'keyName': PERMISSIONS.download_pic,
    'displayName': '下载',
    'description': '下载',

    'path': '3,4',
    'parentId': 3,
  },
  {
    'keyName': PERMISSIONS.collection_pic,
    'displayName': '收藏',
    'description': '收藏',

    'path': '3,5',
    'parentId': 3,
  },
  {
    'keyName': PERMISSIONS.folder_create_page,
    'displayName': '创建目录页面',
    'description': '创建目录页面',

    'path': '1,6',
    'parentId': 1,
  },
  {
    'keyName': PERMISSIONS.folder_create,
    'displayName': '新建目录',
    'description': '新建目录',

    'path': '1,6,7',
    'parentId': 6,
  },
  {
    'keyName': PERMISSIONS.folder_management_page,
    'displayName': '目录管理页面',
    'description': '目录管理页面',

    'path': '1,8',
    'parentId': 1,
  },
  {
    'keyName': PERMISSIONS.folder_edit,
    'displayName': '修改目录',
    'description': '修改目录',

    'path': '1,8,9',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.folder_delete,
    'displayName': '删除目录',
    'description': '删除目录',

    'path': '1,8,10',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.folder_copy,
    'displayName': '复制到',
    'description': '复制到',

    'path': '1,8,11',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.folder_move,
    'displayName': '移动到',
    'description': '移动到',

    'path': '1,8,12',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.folder_merge,
    'displayName': '合并',
    'description': '合并',

    'path': '1,8,13',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.folder_link,
    'displayName': '映射',
    'description': '映射',

    'path': '1,8,14',
    'parentId': 8,
  },
  {
    'keyName': PERMISSIONS.content_upload_page,
    'displayName': '内容上传页面',
    'description': '内容上传页面',

    'path': '1,15',
    'parentId': 1,
  },
  {
    'keyName': PERMISSIONS.content_upload,
    'displayName': '内容上传',
    'description': '内容上传（文件，META信息）',

    'path': '1,15,16',
    'parentId': 15,
  },
  {
    'keyName': PERMISSIONS.content_edit,
    'displayName': '内容编辑',
    'description': '内容编辑',

    'path': '1,15,17',
    'parentId': 15,
  },
  {
    'keyName': PERMISSIONS.content_delete,
    'displayName': '内容删除',
    'description': '内容删除',

    'path': '1,15,18',
    'parentId': 15,
  },
  {
    'keyName': PERMISSIONS.assets_audit_page,
    'displayName': '内容审核页面',
    'description': '内容审核页面',

    'path': '1,19',
    'parentId': 1,
  },
  {
    'keyName': PERMISSIONS.audit_pass,
    'displayName': '审核通过',
    'description': '审核通过',

    'path': '1,19,20',
    'parentId': 19,
  },
  {
    'keyName': PERMISSIONS.audit_reject,
    'displayName': '审核驳回',
    'description': '审核驳回',

    'path': '1,19,21',
    'parentId': 19,
  },
  {
    'keyName': PERMISSIONS.audit_online,
    'displayName': '上线',
    'description': '上线',

    'path': '1,19,22',
    'parentId': 19,
  },
  {
    'keyName': PERMISSIONS.audit_offline,
    'displayName': '下线',
    'description': '下线',

    'path': '1,19,23',
    'parentId': 19,
  },
  {
    'keyName': PERMISSIONS.audit_offline,
    'displayName': '群组管理页面',
    'description': '群组管理页面',

    'path': '1,24',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.workgroup_create,
    'displayName': '新建群组',
    'description': '新建群组',

    'path': '1,24,25',
    'parentId': 24,
  },
  {
    // 'keyName': PERMISSIONS.workgroup_edit,
    'displayName': '编辑群组',
    'description': '编辑群组',

    'path': '1,24,26',
    'parentId': 24,
  },
  {
    // 'keyName': PERMISSIONS.workgroup_delete,
    'displayName': '删除群组',
    'description': '删除群组',

    'path': '1,24,27',
    'parentId': 24,
  },
  {
    'keyName': PERMISSIONS.user_management_page,
    'displayName': '用户管理页面',
    'description': '用户管理页面',

    'path': '1,28',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.user_enable,
    'displayName': '启用',
    'description': '启用',

    'path': '1,28,29',
    'parentId': 28,
  },
  {
    // 'keyName': PERMISSIONS.user_disable,
    'displayName': '停用',
    'description': '停用',

    'path': '1,28,30',
    'parentId': 28,
  },
  {
    'keyName': PERMISSIONS.user_workgroup_manage,
    'displayName': '管理组用户',
    'description': '管理组用户（查看，删除）',

    'path': '1,28,31',
    'parentId': 28,
  },
  {
    // 'keyName': PERMISSIONS.join_workgroup,
    'displayName': '加入组',
    'description': '加入组',

    'path': '1,28,32',
    'parentId': 28,
  },
  {
    // 'keyName': PERMISSIONS.user_create,
    'displayName': '新建用户',
    'description': '新建用户',

    'path': '1,28,33',
    'parentId': 28,
  },
  {
    // 'keyName': PERMISSIONS.user_edit,
    'displayName': '用户编辑',
    'description': '用户编辑',

    'path': '1,28,34',
    'parentId': 28,
  },
  {
    'keyName': PERMISSIONS.keyword_category_management_page,
    'displayName': '分类管理页面',
    'description': '分类管理页面',

    'path': '1,35',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.category_create,
    'displayName': '新建分类',
    'description': '新建分类',

    'path': '1,35,36',
    'parentId': 35,
  },
  {
    // 'keyName': PERMISSIONS.category_edit,
    'displayName': '编辑分类',
    'description': '编辑分类',

    'path': '1,35,37',
    'parentId': 35,
  },
  {
    // 'keyName': PERMISSIONS.category_delete,
    'displayName': '删除分类',
    'description': '删除分类',

    'path': '1,35,38',
    'parentId': 35,
  },
  {
    'keyName': PERMISSIONS.keyword_management_page,
    'displayName': '关键词管理页面',
    'description': '关键词管理页面',

    'path': '1,39',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.keyword_delete,
    'displayName': '删除关键词',
    'description': '删除关键词',

    'path': '1,39,40',
    'parentId': 39,
  },
  {
    // 'keyName': PERMISSIONS.keyword_create,
    'displayName': '新建关键词',
    'description': '新建关键词',

    'path': '1,39,41',
    'parentId': 39,
  },
  {
    // 'keyName': PERMISSIONS.keyword_edit,
    'displayName': '编辑关键词',
    'description': '编辑关键词',

    'path': '1,39,42',
    'parentId': 39,
  },
  {
    'keyName': PERMISSIONS.permission_management_page,
    'displayName': '权限管理页面',
    'description': '权限管理页面',

    'path': '1,43',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.operation_log_page,
    'displayName': '操作日志页面',
    'description': '操作日志页面',

    'path': '1,44',
    'parentId': 1,
  },
  {
    // 'keyName': PERMISSIONS.folder_read,
    'displayName': '目录读取',
    'description': '目录读取',

    'path': '1,8,45',
    'parentId': 8,
  },
];

export {
  PERMISSIONS,
};
