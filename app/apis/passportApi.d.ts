export interface FetchAPI {
    (url: string, init?: any): Promise<any>;
}
export interface FetchArgs {
    url: string;
    options: any;
}
export declare class BaseAPI {
    basePath: string;
    fetch: FetchAPI;
    constructor(fetch?: FetchAPI, basePath?: string);
}
export interface APIMWorkgroupFolderRole {
    /**
     * 对应的目录ID
     */
    "folderIds"?: Array<number>;
    /**
     * 角色ID
     */
    "roleId"?: number;
    /**
     * 群组ID
     */
    "workgroupId"?: number;
}
export interface PageInfoRole {
    "endRow"?: number;
    "firstPage"?: number;
    "hasNextPage"?: boolean;
    "hasPreviousPage"?: boolean;
    "isFirstPage"?: boolean;
    "isLastPage"?: boolean;
    "lastPage"?: number;
    "list"?: Array<Role>;
    "navigatePages"?: number;
    "navigatepageNums"?: Array<number>;
    "nextPage"?: number;
    "orderBy"?: string;
    "pageNum"?: number;
    "pageSize"?: number;
    "pages"?: number;
    "prePage"?: number;
    "size"?: number;
    "startRow"?: number;
    "total"?: number;
}
export interface Permission {
    "createdAt"?: Date;
    /**
     * 权限项描述信息
     */
    "description"?: string;
    /**
     * 页面显示权限项信息时使用
     */
    "displayName"?: string;
    "id"?: number;
    /**
     * 权限项唯一英文标识，代码判断权限中使用
     */
    "keyName"?: string;
    "parentId"?: number;
    /**
     * 路径信息 使用主键进行逗号分隔, 最后一位为当前的主键1,2,3,4
     */
    "path"?: string;
    /**
     * 权限项分类, SYSTEM_FUNCTION 系统权限项，FOLDER_FUNCTION目录权限项
     */
    "type"?: string;
}
export interface ResFolder {
    "children"?: Array<ResFolder>;
    /**
     * 自增主键
     */
    "id"?: number;
    /**
     * 目录名称
     */
    "name"?: string;
    /**
     * 目录所属租户，本版本不使用
     */
    "ownerId"?: number;
    /**
     * 父节点主键Id
     */
    "parentId"?: number;
    /**
     * 该树路径编码
     */
    "seq"?: string;
}
export interface Role {
    /**
     * 创建时间
     */
    "createdAt"?: Date;
    /**
     * 角色描述
     */
    "description"?: string;
    "id"?: number;
    /**
     * 角色名称
     */
    "name"?: string;
    "rolePermissions"?: Array<RolePermission>;
    /**
     * 分为两类 'user'：用户角色， 'folder'：目录角色
     */
    "type"?: string;
}
export interface RolePermission {
    "createdAt"?: Date;
    "id"?: number;
    "permission"?: Permission;
    "permissionId"?: number;
    "roleId"?: number;
}
export interface User {
    /**
     * 账号权限，各个子系统统一存在此处，业务逻辑由各个子系统自行处理，格式由CRM系统定义
     */
    "accountRights"?: string;
    /**
     * 帐号类型:0-个人,1企业,2部门
     */
    "accountTypeId"?: string;
    /**
     * 地址
     */
    "address"?: string;
    /**
     * 管理员字段 确定是否为管理员 0为管理员 1为普通用户
     */
    "admin"?: string;
    "applyAccountRight"?: string;
    /**
     * 申请更改时间
     */
    "applyChangTime"?: Date;
    /**
     * 申请权限状态 1 申请 2审核通过 3驳回
     */
    "applyState"?: number;
    /**
     * 申请权限时间
     */
    "applyTime"?: Date;
    /**
     * 城市
     */
    "cityId"?: string;
    "code"?: string;
    /**
     * 公司名称
     */
    "company"?: string;
    /**
     * 公司类型
     */
    "companyType"?: string;
    /**
     * 信息完成百分比
     */
    "completeInfo"?: number;
    /**
     * 国家区号
     */
    "countryCode"?: string;
    /**
     * 国家
     */
    "countryId"?: string;
    /**
     * 出生日期 1990-01-01
     */
    "dateOfBirth"?: Date;
    /**
     * 备注
     */
    "description"?: string;
    /**
     * 显示名
     */
    "displayName"?: string;
    /**
     * 邮件
     */
    "email"?: string;
    /**
     * 传真
     */
    "fax"?: string;
    /**
     * 性别 0男 1女
     */
    "gender"?: number;
    /**
     * 身份证号
     */
    "idCard"?: string;
    /**
     * 头像地址
     */
    "imgPath"?: string;
    "invitationCode"?: string;
    "isMsg"?: boolean;
    /**
     * 是否是群组管理员
     */
    "isWorkgroupAdmin"?: boolean;
    /**
     * 职位
     */
    "job"?: string;
    /**
     * 申请签约摄影师时间
     */
    "mmpApplyTime"?: Date;
    /**
     * mmp申请成为签约摄影师
     */
    "mmpState"?: number;
    /**
     * 手机
     */
    "mobile"?: string;
    /**
     * 人工修改用户信息最后编辑时间
     */
    "modifyTime"?: Date;
    /**
     * 昵称
     */
    "nickName"?: string;
    /**
     * 父账号ID
     */
    "parentAccountId"?: string;
    /**
     * 密码
     */
    "password"?: string;
    /**
     * 平台类型  0:gic 1:cfp 2 社区 3 cfp摄影师 4:qq 5:sina 6:豆瓣 8.编辑部 9:用户中心注册 10:motionchina 11 mmp 12weixin 13mmp重复数据 20.手机端注册 21第三方登录注册
     */
    "platformType"?: number;
    /**
     * 邮编
     */
    "postcode"?: string;
    /**
     * 省份
     */
    "provinceId"?: string;
    "qq"?: string;
    /**
     * 真实名
     */
    "realName"?: string;
    /**
     * 注册时间
     */
    "regTime"?: Date;
    /**
     * 秘密问题答案
     */
    "secretAnswer"?: string;
    /**
     * 秘密问题
     */
    "secretQuestionId"?: string;
    /**
     * 排序字段
     */
    "sort"?: number;
    "standbyMobile"?: string;
    /**
     * 用户账户验证状态 0 未验证 1 验证手机,2验证邮箱 3验证备用手机
     */
    "state"?: number;
    /**
     * 用户账户状态 0 停用 1启用
     */
    "status"?: number;
    /**
     * 电话
     */
    "tel"?: string;
    /**
     * 第三方平台 平台id
     */
    "thirdParty"?: string;
    /**
     * 人工修改用户信息最后操作人(本表自关联)
     */
    "updatedBy"?: string;
    /**
     * 用户数据库记录最后更新时间，任何一个字段的更新都算
     */
    "updatedTime"?: Date;
    /**
     * 社区标记用户权限
     */
    "userClass"?: string;
    /**
     * 用户ID
     */
    "userId"?: string;
    /**
     * 用户名
     */
    "userName"?: string;
    /**
     * 备用
     */
    "userStatus"?: number;
    "weixin"?: string;
    /**
     * 所属组ID
     */
    "workgroupId"?: number;
}
export interface Workgroup {
    /**
     * 群组联系人
     */
    "contact"?: string;
    /**
     * 联系人邮箱
     */
    "contactEmail"?: string;
    /**
     * 联系人手机
     */
    "contactMobile"?: string;
    "createAt"?: Date;
    /**
     * 群组id
     */
    "id"?: number;
    "invitationCode"?: string;
    /**
     * 群组名称
     */
    "name"?: string;
    /**
     * 备注
     */
    "remark"?: string;
    "roleIds"?: Array<number>;
    "roles"?: Array<Role>;
    "sendInvitationCode"?: boolean;
    /**
     * query workgroups by tag
     */
    "tags"?: string;
}
export interface WorkgroupWithFolderPermission {
    /**
     * 群组联系人
     */
    "contact"?: string;
    /**
     * 联系人邮箱
     */
    "contactEmail"?: string;
    /**
     * 联系人手机
     */
    "contactMobile"?: string;
    "createAt"?: Date;
    /**
     * 群组id
     */
    "id"?: number;
    "invitationCode"?: string;
    /**
     * 群组名称
     */
    "name"?: string;
    "permissions"?: Array<Permission>;
    /**
     * 备注
     */
    "remark"?: string;
    "roleIds"?: Array<number>;
    "roles"?: Array<Role>;
    "sendInvitationCode"?: boolean;
    /**
     * query workgroups by tag
     */
    "tags"?: string;
}
/**
 * DefaultApi - fetch parameter creator
 */
export declare const DefaultApiFetchParamCreactor: {
    workgroupFolderRoleGetWorkgroupFoldersRoleGet(params: {
        workgroupId: number;
    }): FetchArgs;
    workgroupFolderRoleSetWorkgroupFoldersRolePost(params: {
        reqModel: APIMWorkgroupFolderRole;
    }): FetchArgs;
};
/**
 * DefaultApi - functional programming interface
 */
export declare const DefaultApiFp: {
    workgroupFolderRoleGetWorkgroupFoldersRoleGet(params: {
        workgroupId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<APIMWorkgroupFolderRole>;
    workgroupFolderRoleSetWorkgroupFoldersRolePost(params: {
        reqModel: APIMWorkgroupFolderRole;
    }): (fetch: FetchAPI, basePath?: string) => Promise<APIMWorkgroupFolderRole>;
};
/**
 * DefaultApi - object-oriented interface
 */
export declare class DefaultApi extends BaseAPI {
    /**
     * 获取某个群组对目录的控制表
     * 返回群组的角色配置，以及对应的若干目录。用来渲染群组的目录权限树。如果没有设置任何角色，返回内容为空
     * @param workgroupId workgroupId
     */
    workgroupFolderRoleGetWorkgroupFoldersRoleGet(params: {
        workgroupId: number;
    }): Promise<APIMWorkgroupFolderRole>;
    /**
     * 为某个群组设置对某些目录的控制角色或取消已有角色
     * 设置某个群组对某些目录的控制角色.  1， 删除旧的设置  2，重新设置当前目录为指定角色和目录。当取消已有角色时，不用传递 roleId参数
     * @param reqModel reqModel
     */
    workgroupFolderRoleSetWorkgroupFoldersRolePost(params: {
        reqModel: APIMWorkgroupFolderRole;
    }): Promise<APIMWorkgroupFolderRole>;
}
/**
 * DefaultApi - factory interface
 */
export declare const DefaultApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    workgroupFolderRoleGetWorkgroupFoldersRoleGet(params: {
        workgroupId: number;
    }): Promise<APIMWorkgroupFolderRole>;
    workgroupFolderRoleSetWorkgroupFoldersRolePost(params: {
        reqModel: APIMWorkgroupFolderRole;
    }): Promise<APIMWorkgroupFolderRole>;
};
/**
 * HealthApi - fetch parameter creator
 */
export declare const HealthApiFetchParamCreactor: {
    healthGet(): FetchArgs;
};
/**
 * HealthApi - functional programming interface
 */
export declare const HealthApiFp: {
    healthGet(): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * HealthApi - object-oriented interface
 */
export declare class HealthApi extends BaseAPI {
    /**
     * health
     */
    healthGet(): Promise<any>;
}
/**
 * HealthApi - factory interface
 */
export declare const HealthApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    healthGet(): Promise<any>;
};
/**
 * MessagecontrollerApi - fetch parameter creator
 */
export declare const MessagecontrollerApiFetchParamCreactor: {
    messageCheckGet(params: {
        name: string;
        code: string;
    }): FetchArgs;
    messageSendInvitationCodeSmsPost(params: {
        userId: string;
        workgroupId: number;
    }): FetchArgs;
    messageSendMailGet(params: {
        email: string;
        content?: string;
        subject?: string;
    }): FetchArgs;
    messageSendNoticeMailPost(params: {
        email: string;
        fromType: number;
        content?: string;
        subject?: string;
    }): FetchArgs;
    messageSendNoticeSmsPost(params: {
        mobile: string;
        smsType?: number;
        fee?: string;
        card?: string;
    }): FetchArgs;
    messageSendsmsForExistMobileGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): FetchArgs;
    messageSendsmsGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): FetchArgs;
};
/**
 * MessagecontrollerApi - functional programming interface
 */
export declare const MessagecontrollerApiFp: {
    messageCheckGet(params: {
        name: string;
        code: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendInvitationCodeSmsPost(params: {
        userId: string;
        workgroupId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendMailGet(params: {
        email: string;
        content?: string;
        subject?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendNoticeMailPost(params: {
        email: string;
        fromType: number;
        content?: string;
        subject?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendNoticeSmsPost(params: {
        mobile: string;
        smsType?: number;
        fee?: string;
        card?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendsmsForExistMobileGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    messageSendsmsGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * MessagecontrollerApi - object-oriented interface
 */
export declare class MessagecontrollerApi extends BaseAPI {
    /**
     * check
     * @param name name
     * @param code code
     */
    messageCheckGet(params: {
        name: string;
        code: string;
    }): Promise<any>;
    /**
     * 发送群组邀请码短信
     * 将指定ID的群组邀请码发送到指定的用户手机号上
     * @param userId 用户ID
     * @param workgroupId 群组ID
     */
    messageSendInvitationCodeSmsPost(params: {
        userId: string;
        workgroupId: number;
    }): Promise<any>;
    /**
     * sendMail
     * @param email email
     * @param content content
     * @param subject subject
     */
    messageSendMailGet(params: {
        email: string;
        content?: string;
        subject?: string;
    }): Promise<any>;
    /**
     * 发送自定义邮件
     * 发送自定义邮件
     * @param email email
     * @param fromType fromType
     * @param content content
     * @param subject subject
     */
    messageSendNoticeMailPost(params: {
        email: string;
        fromType: number;
        content?: string;
        subject?: string;
    }): Promise<any>;
    /**
     * 发送自定义短信
     * 发送自定义短信, 开发过程中如果没有设置card信息，短信发送接口会报错
     * @param mobile mobile
     * @param smsType smsType 1资格审核通过 2资格审核不通过 3合同审核通过 4 稿费发放
     * @param fee 当smsType为4的稿费
     * @param card 当smsType为4的已发送到您后面的信息(尾号是88888888888888888的卡号上/支付宝账号上)
     */
    messageSendNoticeSmsPost(params: {
        mobile: string;
        smsType?: number;
        fee?: string;
        card?: string;
    }): Promise<any>;
    /**
     * 为系统中存在的手机号发送短信
     * 系统会先验证手机号是否存在，再决定是否发送
     * @param mobile mobile
     * @param content content
     * @param countryCode countryCode
     */
    messageSendsmsForExistMobileGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): Promise<any>;
    /**
     * 为任意手机号发送短信
     * 没有检查手机号是否在系统中存在，直接发送
     * @param mobile mobile
     * @param content content
     * @param countryCode countryCode
     */
    messageSendsmsGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): Promise<any>;
}
/**
 * MessagecontrollerApi - factory interface
 */
export declare const MessagecontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    messageCheckGet(params: {
        name: string;
        code: string;
    }): Promise<any>;
    messageSendInvitationCodeSmsPost(params: {
        userId: string;
        workgroupId: number;
    }): Promise<any>;
    messageSendMailGet(params: {
        email: string;
        content?: string;
        subject?: string;
    }): Promise<any>;
    messageSendNoticeMailPost(params: {
        email: string;
        fromType: number;
        content?: string;
        subject?: string;
    }): Promise<any>;
    messageSendNoticeSmsPost(params: {
        mobile: string;
        smsType?: number;
        fee?: string;
        card?: string;
    }): Promise<any>;
    messageSendsmsForExistMobileGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): Promise<any>;
    messageSendsmsGet(params: {
        mobile: string;
        content?: string;
        countryCode?: string;
    }): Promise<any>;
};
/**
 * PermissioncontrollerApi - fetch parameter creator
 */
export declare const PermissioncontrollerApiFetchParamCreactor: {
    permissionListGet(params: {
        type?: string;
    }): FetchArgs;
    permissionPageListGet(params: {
        permission?: Permission;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
};
/**
 * PermissioncontrollerApi - functional programming interface
 */
export declare const PermissioncontrollerApiFp: {
    permissionListGet(params: {
        type?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    permissionPageListGet(params: {
        permission?: Permission;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * PermissioncontrollerApi - object-oriented interface
 */
export declare class PermissioncontrollerApi extends BaseAPI {
    /**
     * 获取权限项列表
     * 获取所有权限，也可以通过条件获取权限项列表，目前只支持type条件， type类型只有两种&#39;SYSTEM_FUNCTION&#39;, &#39;FOLDER_FUNCTION&#39;
     * @param type type
     */
    permissionListGet(params: {
        type?: string;
    }): Promise<any>;
    /**
     * pageList
     * @param permission permission
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    permissionPageListGet(params: {
        permission?: Permission;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
}
/**
 * PermissioncontrollerApi - factory interface
 */
export declare const PermissioncontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    permissionListGet(params: {
        type?: string;
    }): Promise<any>;
    permissionPageListGet(params: {
        permission?: Permission;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
};
/**
 * ResevtcontrollerApi - fetch parameter creator
 */
export declare const ResevtcontrollerApiFetchParamCreactor: {
    resevtFolderaddPost(params: {
        resFolder: ResFolder;
    }): FetchArgs;
    resevtFolderdeletePost(params: {
        resFolder: ResFolder;
    }): FetchArgs;
};
/**
 * ResevtcontrollerApi - functional programming interface
 */
export declare const ResevtcontrollerApiFp: {
    resevtFolderaddPost(params: {
        resFolder: ResFolder;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    resevtFolderdeletePost(params: {
        resFolder: ResFolder;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
};
/**
 * ResevtcontrollerApi - object-oriented interface
 */
export declare class ResevtcontrollerApi extends BaseAPI {
    /**
     * handleFolderAddEvt
     * @param resFolder resFolder
     */
    resevtFolderaddPost(params: {
        resFolder: ResFolder;
    }): Promise<boolean>;
    /**
     * handleFolderDeleteEvt
     * @param resFolder resFolder
     */
    resevtFolderdeletePost(params: {
        resFolder: ResFolder;
    }): Promise<boolean>;
}
/**
 * ResevtcontrollerApi - factory interface
 */
export declare const ResevtcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resevtFolderaddPost(params: {
        resFolder: ResFolder;
    }): Promise<boolean>;
    resevtFolderdeletePost(params: {
        resFolder: ResFolder;
    }): Promise<boolean>;
};
/**
 * RolecontrollerApi - fetch parameter creator
 */
export declare const RolecontrollerApiFetchParamCreactor: {
    roleListGet(): FetchArgs;
    rolePageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
};
/**
 * RolecontrollerApi - functional programming interface
 */
export declare const RolecontrollerApiFp: {
    roleListGet(): (fetch: FetchAPI, basePath?: string) => Promise<Role[]>;
    rolePageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<PageInfoRole>;
};
/**
 * RolecontrollerApi - object-oriented interface
 */
export declare class RolecontrollerApi extends BaseAPI {
    /**
     * list
     */
    roleListGet(): Promise<Role[]>;
    /**
     * pageList
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    rolePageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoRole>;
}
/**
 * RolecontrollerApi - factory interface
 */
export declare const RolecontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    roleListGet(): Promise<Role[]>;
    rolePageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoRole>;
};
/**
 * RolepermissioncontrollerApi - fetch parameter creator
 */
export declare const RolepermissioncontrollerApiFetchParamCreactor: {
    rolePermissionListGet(params: {
        rolePermission?: RolePermission;
    }): FetchArgs;
    rolePermissionPageListGet(params: {
        rolePermission?: RolePermission;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
};
/**
 * RolepermissioncontrollerApi - functional programming interface
 */
export declare const RolepermissioncontrollerApiFp: {
    rolePermissionListGet(params: {
        rolePermission?: RolePermission;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    rolePermissionPageListGet(params: {
        rolePermission?: RolePermission;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * RolepermissioncontrollerApi - object-oriented interface
 */
export declare class RolepermissioncontrollerApi extends BaseAPI {
    /**
     * list
     * @param rolePermission rolePermission
     */
    rolePermissionListGet(params: {
        rolePermission?: RolePermission;
    }): Promise<any>;
    /**
     * pageList
     * @param rolePermission rolePermission
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    rolePermissionPageListGet(params: {
        rolePermission?: RolePermission;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
}
/**
 * RolepermissioncontrollerApi - factory interface
 */
export declare const RolepermissioncontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    rolePermissionListGet(params: {
        rolePermission?: RolePermission;
    }): Promise<any>;
    rolePermissionPageListGet(params: {
        rolePermission?: RolePermission;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
};
/**
 * UsercontrollerApi - fetch parameter creator
 */
export declare const UsercontrollerApiFetchParamCreactor: {
    userAuthGet(params: {
        userId: string;
        code: string;
    }): FetchArgs;
    userCreatePost(params: {
        user: User;
    }): FetchArgs;
    userFindPwdPost(params: {
        user: User;
    }): FetchArgs;
    userFolderauthGet(params: {
        userId: string;
        folderId: number;
        code: string;
    }): FetchArgs;
    userGetUserByTGTGet(params: {
        TGT?: string;
    }): FetchArgs;
    userGetUserManageFoldersGet(params: {
        userId: string;
    }): FetchArgs;
    userIdDelete(params: {
        id: string;
    }): FetchArgs;
    userIdGet(params: {
        id: string;
    }): FetchArgs;
    userJoinWorkgroupPost(params: {
        userIds: string;
        workgroupId: number;
    }): FetchArgs;
    userLoginPost(params: {
        user: User;
    }): FetchArgs;
    userLogoutGet(params: {
        TGT?: string;
    }): FetchArgs;
    userPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    userRegisterPost(params: {
        user: User;
    }): FetchArgs;
    userResetPwdPost(params: {
        user: User;
    }): FetchArgs;
    userSearchPost(params: {
        user?: User;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    userSimpleInfoPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
        userIds?: string[];
    }): FetchArgs;
    userUngroupedUsersPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    userUpdatePut(params: {
        user: User;
    }): FetchArgs;
    userUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): FetchArgs;
    userUserPermissionListGet(params: {
        userId: string;
    }): FetchArgs;
};
/**
 * UsercontrollerApi - functional programming interface
 */
export declare const UsercontrollerApiFp: {
    userAuthGet(params: {
        userId: string;
        code: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    userCreatePost(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userFindPwdPost(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userFolderauthGet(params: {
        userId: string;
        folderId: number;
        code: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    userGetUserByTGTGet(params: {
        TGT?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userGetUserManageFoldersGet(params: {
        userId: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number[]>;
    userIdDelete(params: {
        id: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userIdGet(params: {
        id: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<User>;
    userJoinWorkgroupPost(params: {
        userIds: string;
        workgroupId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userLoginPost(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userLogoutGet(params: {
        TGT?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userRegisterPost(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<User>;
    userResetPwdPost(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userSearchPost(params: {
        user?: User;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userSimpleInfoPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
        userIds?: string[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userUngroupedUsersPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userUpdatePut(params: {
        user: User;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    userUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: string[];
    }>;
    userUserPermissionListGet(params: {
        userId: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<string[]>;
};
/**
 * UsercontrollerApi - object-oriented interface
 */
export declare class UsercontrollerApi extends BaseAPI {
    /**
     * 校验用户是否有某种权限
     * 校验用户是否有某种权限
     * @param userId 用户id
     * @param code 目标权限项目
     */
    userAuthGet(params: {
        userId: string;
        code: string;
    }): Promise<boolean>;
    /**
     * 内部创建用户
     * 系统管理员在群组或用户列表中新建用户，用户名，真实姓名，手机号不能为空，表单隐式把所属群组号也传递进来
     * @param user user
     */
    userCreatePost(params: {
        user: User;
    }): Promise<any>;
    /**
     * 未登录用户重置密码接口，供找回密码功能使用
     * 未登录用户重置密码接口，需要手机号，手机验证码，新密码
     * @param user 根据手机号修改密码
     */
    userFindPwdPost(params: {
        user: User;
    }): Promise<any>;
    /**
     * 校验用户对某个目录是否有某种权限
     * 校验用户对某个目录是否有某种权限
     * @param userId userId
     * @param folderId folderId
     * @param code code
     */
    userFolderauthGet(params: {
        userId: string;
        folderId: number;
        code: string;
    }): Promise<boolean>;
    /**
     * 根据TGT获取登录用户信息
     * 根据TGT获取登录用户信息
     * @param TGT 客户端存储的TGT
     */
    userGetUserByTGTGet(params: {
        TGT?: string;
    }): Promise<any>;
    /**
     * 【接口废弃】获取用户的管理的目录列表
     * 罗列当前用户有权限的目录列表
     * @param userId userId
     */
    userGetUserManageFoldersGet(params: {
        userId: string;
    }): Promise<number[]>;
    /**
     * 删除用户
     * 删除用户
     * @param id 用户ID
     */
    userIdDelete(params: {
        id: string;
    }): Promise<any>;
    /**
     * 查询用户信息
     * 根据用户ID获取用户信息
     * @param id 用户ID
     */
    userIdGet(params: {
        id: string;
    }): Promise<User>;
    /**
     * 用户加入群组
     * 将多个用户批量加入到某个群组中
     * @param userIds 用户id列表
     * @param workgroupId  群组ID
     */
    userJoinWorkgroupPost(params: {
        userIds: string;
        workgroupId: number;
    }): Promise<any>;
    /**
     * 登录接口
     * 用户登录接口，登录成功返回TGT信息
     * @param user 可以是用户名或手机号或邮箱，密码
     */
    userLoginPost(params: {
        user: User;
    }): Promise<any>;
    /**
     * 登出接口
     * 用户登出接口
     * @param TGT 客户端存储的TGT
     */
    userLogoutGet(params: {
        TGT?: string;
    }): Promise<any>;
    /**
     * 用户列表分页查询
     * 包括所有用户
     * @param pageNum 查询第N页用户列表
     * @param pageSize 每页显示用户数
     */
    userPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * 用户注册
     * 手机号，密码，邀请码不能为空，会默认把手机号填充到用户名
     * @param user user
     */
    userRegisterPost(params: {
        user: User;
    }): Promise<User>;
    /**
     * 已登录用户修改接口
     * 重置密码接口，无需任何验证
     * @param user 根据用户名或手机号或邮箱,修改密码
     */
    userResetPwdPost(params: {
        user: User;
    }): Promise<any>;
    /**
     * 搜索用户
     * 仅提供根据关键字userName匹配用户user_name， mobile， email，根据workgroupId查询某群组内的用户
     * @param user 仅提供userName, workgroupId参数即可，两者都是可选的
     * @param pageNum 查询第N页用户列表
     * @param pageSize 每页显示用户数
     */
    userSearchPost(params: {
        user?: User;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * 分页查询用户简单信息
     * 用户简单信息包括：user_id,nick_name,real_name,user_name,mobile,email,address,company,gender,reg_time,status,weixin,qq
     * @param pageNum 查询第N页用户列表
     * @param pageSize 每页显示用户数
     * @param userIds userIds
     */
    userSimpleInfoPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
        userIds?: Array<string>;
    }): Promise<any>;
    /**
     * 未分组用户列表查询
     * 所有未被分配进任何组的用户
     * @param pageNum 查询第N页用户列表
     * @param pageSize 每页显示用户数
     */
    userUngroupedUsersPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * 更新用户信息
     * 更新用户信息，数据中要有userId
     * @param user user
     */
    userUpdatePut(params: {
        user: User;
    }): Promise<any>;
    /**
     * 获取指定用户指定目录的 目录访问权限列表
     * 目前一个用户属于一个群组，但一个群组可以有多个用户角色，任何一个角色含有编审权限，则获取全部目录；否则根据群组目录权限获取目录
     * @param userId 用户id
     * @param folderId 目录 id，不传时获取所有目录
     */
    userUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): Promise<{
        [key: string]: string[];
    }>;
    /**
     * 仅仅获取系统权限列表,不包括目录权限
     * 目前一个用户属于一个群组，但一个群组可以有多个角色，仅仅获取系统权限列表,不包括目录权限
     * @param userId 用户id
     */
    userUserPermissionListGet(params: {
        userId: string;
    }): Promise<string[]>;
}
/**
 * UsercontrollerApi - factory interface
 */
export declare const UsercontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    userAuthGet(params: {
        userId: string;
        code: string;
    }): Promise<boolean>;
    userCreatePost(params: {
        user: User;
    }): Promise<any>;
    userFindPwdPost(params: {
        user: User;
    }): Promise<any>;
    userFolderauthGet(params: {
        userId: string;
        folderId: number;
        code: string;
    }): Promise<boolean>;
    userGetUserByTGTGet(params: {
        TGT?: string;
    }): Promise<any>;
    userGetUserManageFoldersGet(params: {
        userId: string;
    }): Promise<number[]>;
    userIdDelete(params: {
        id: string;
    }): Promise<any>;
    userIdGet(params: {
        id: string;
    }): Promise<User>;
    userJoinWorkgroupPost(params: {
        userIds: string;
        workgroupId: number;
    }): Promise<any>;
    userLoginPost(params: {
        user: User;
    }): Promise<any>;
    userLogoutGet(params: {
        TGT?: string;
    }): Promise<any>;
    userPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    userRegisterPost(params: {
        user: User;
    }): Promise<User>;
    userResetPwdPost(params: {
        user: User;
    }): Promise<any>;
    userSearchPost(params: {
        user?: User;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    userSimpleInfoPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
        userIds?: string[];
    }): Promise<any>;
    userUngroupedUsersPageListGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    userUpdatePut(params: {
        user: User;
    }): Promise<any>;
    userUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): Promise<{
        [key: string]: string[];
    }>;
    userUserPermissionListGet(params: {
        userId: string;
    }): Promise<string[]>;
};
/**
 * WorkgroupcontrollerApi - fetch parameter creator
 */
export declare const WorkgroupcontrollerApiFetchParamCreactor: {
    workgroupsCreatePost(params: {
        workgroup: Workgroup;
    }): FetchArgs;
    workgroupsGet(params: {
        tag?: string;
    }): FetchArgs;
    workgroupsIdDelete(params: {
        id: number;
    }): FetchArgs;
    workgroupsIdGet(params: {
        id: number;
    }): FetchArgs;
    workgroupsIdPut(params: {
        id: number;
        workgroup: Workgroup;
    }): FetchArgs;
};
/**
 * WorkgroupcontrollerApi - functional programming interface
 */
export declare const WorkgroupcontrollerApiFp: {
    workgroupsCreatePost(params: {
        workgroup: Workgroup;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    workgroupsGet(params: {
        tag?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<Workgroup[]>;
    workgroupsIdDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<Workgroup[]>;
    workgroupsIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<Workgroup>;
    workgroupsIdPut(params: {
        id: number;
        workgroup: Workgroup;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * WorkgroupcontrollerApi - object-oriented interface
 */
export declare class WorkgroupcontrollerApi extends BaseAPI {
    /**
     * 添加群组
     * 添加群组
     * @param workgroup workgroup
     */
    workgroupsCreatePost(params: {
        workgroup: Workgroup;
    }): Promise<any>;
    /**
     * 获取群组列表
     * 根据tag，获取相关群组；没有tag则获取所有群组
     * @param tag 群组tag关键词
     */
    workgroupsGet(params: {
        tag?: string;
    }): Promise<Workgroup[]>;
    /**
     * 删除群组
     * 删除目录，包括子节点的所有群组。同时解散当期群组下的所有用户
     * @param id id
     */
    workgroupsIdDelete(params: {
        id: number;
    }): Promise<Workgroup[]>;
    /**
     * 查看详细
     * 获取讨论组详细信息，不包括子组信息
     * @param id id
     */
    workgroupsIdGet(params: {
        id: number;
    }): Promise<Workgroup>;
    /**
     * 更新群组
     * 更新群组的名称和角色设置
     * @param id 群组ID
     * @param workgroup workgroup
     */
    workgroupsIdPut(params: {
        id: number;
        workgroup: Workgroup;
    }): Promise<any>;
}
/**
 * WorkgroupcontrollerApi - factory interface
 */
export declare const WorkgroupcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    workgroupsCreatePost(params: {
        workgroup: Workgroup;
    }): Promise<any>;
    workgroupsGet(params: {
        tag?: string;
    }): Promise<Workgroup[]>;
    workgroupsIdDelete(params: {
        id: number;
    }): Promise<Workgroup[]>;
    workgroupsIdGet(params: {
        id: number;
    }): Promise<Workgroup>;
    workgroupsIdPut(params: {
        id: number;
        workgroup: Workgroup;
    }): Promise<any>;
};
/**
 * WorkgroupfolderpermissioncontrollerApi - fetch parameter creator
 */
export declare const WorkgroupfolderpermissioncontrollerApiFetchParamCreactor: {
    workgroupFolderPermissionDeleteByFolderIdsPost(params: {
        folderIds?: number[];
    }): FetchArgs;
    workgroupFolderPermissionGetByFolderIdGet(params: {
        folderId: number;
    }): FetchArgs;
    workgroupFolderPermissionSetByFolderIdPost(params: {
        folderId?: number;
        map?: any;
    }): FetchArgs;
};
/**
 * WorkgroupfolderpermissioncontrollerApi - functional programming interface
 */
export declare const WorkgroupfolderpermissioncontrollerApiFp: {
    workgroupFolderPermissionDeleteByFolderIdsPost(params: {
        folderIds?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    workgroupFolderPermissionGetByFolderIdGet(params: {
        folderId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<WorkgroupWithFolderPermission[]>;
    workgroupFolderPermissionSetByFolderIdPost(params: {
        folderId?: number;
        map?: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
};
/**
 * WorkgroupfolderpermissioncontrollerApi - object-oriented interface
 */
export declare class WorkgroupfolderpermissioncontrollerApi extends BaseAPI {
    /**
     * 删除目录上的权限
     * 根据目录id删除设置的权限
     * @param folderIds 目录ID
     */
    workgroupFolderPermissionDeleteByFolderIdsPost(params: {
        folderIds?: Array<number>;
    }): Promise<any>;
    /**
     * /getByFolderId
     * 根据目录id 获取所有相关群组的权限项设置
     * @param folderId folderId
     */
    workgroupFolderPermissionGetByFolderIdGet(params: {
        folderId: number;
    }): Promise<WorkgroupWithFolderPermission[]>;
    /**
     * 跟新指定目录权限
     * 更新特定目录的群组权限项
     * @param folderId 当前被创建授权的目录ID
     * @param map {   workgroupId : permissionid[ ],   workgroupId : permissionid[ ],  }
     */
    workgroupFolderPermissionSetByFolderIdPost(params: {
        folderId?: number;
        map?: any;
    }): Promise<boolean>;
}
/**
 * WorkgroupfolderpermissioncontrollerApi - factory interface
 */
export declare const WorkgroupfolderpermissioncontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    workgroupFolderPermissionDeleteByFolderIdsPost(params: {
        folderIds?: number[];
    }): Promise<any>;
    workgroupFolderPermissionGetByFolderIdGet(params: {
        folderId: number;
    }): Promise<WorkgroupWithFolderPermission[]>;
    workgroupFolderPermissionSetByFolderIdPost(params: {
        folderId?: number;
        map?: any;
    }): Promise<boolean>;
};
