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
/**
 * 鉴权失败
 */
export interface FailingAuth401 {
    "errorDescription": string;
    "error": string;
}
/**
 * 请求失败
 */
export interface FailingResponses400 {
    "errorDescription": string;
    "error": string;
}
/**
 * 请求失败
 */
export interface FailingResponses404 {
    "errorDescription": string;
    "error": string;
}
export interface InlineResponse200 {
    "data"?: any;
}
export interface InlineResponse2001 {
    /**
     * 是否允许当前用户下载资源
     */
    "allow"?: boolean;
}
export interface InlineResponse2002 {
    "accessToken"?: string;
    "tokenType"?: string;
    "refreshToken"?: string;
    "expiresIn"?: number;
}
export interface InlineResponse2003 {
    "refreshToken"?: string;
    "tokenType"?: string;
    "accessToken"?: string;
    "expiresIn"?: number;
}
export interface InlineResponse403 {
    "error"?: string;
    "errorDescription"?: string;
}
/**
 * 资源不可用
 */
export interface NotPermitted403 {
    "errorDescription": string;
    "error": string;
}
export interface Oauth {
    "username"?: string;
    "description"?: string;
}
export interface OauthClient {
    /**
     * 数据库ID
     */
    "id"?: string;
    /**
     * 授权ID
     */
    "clientId"?: string;
    /**
     * 授权密码
     */
    "clientSecret"?: string;
    /**
     * 授权的组ID（当前不支持直接对用户授权）
     */
    "groupId"?: number;
}
export interface PermissionModel {
    /**
     * 权限项名称
     */
    "name"?: string;
    /**
     * 权限项描述
     */
    "description"?: string;
    /**
     * 权限项类别
     */
    "type"?: string;
}
export interface UserInfoModel {
    "realName": string;
    "userName": string;
    "mobile": string;
    "password": string;
    "description"?: string;
    /**
     * 群组邀请码，可选参数，若指定该参数，则注册到邀请码相应的群组中，否则注册到当前用户的同组用户中
     */
    "invitationCode"?: string;
    /**
     * 是否是该所在群组的管理员
     */
    "isWorkgroupAdmin"?: boolean;
    /**
     * 是否向该用户发送群组邀请码
     */
    "isMsg"?: boolean;
}
export interface UserLoginModel {
    /**
     * 用户登陆名称
     */
    "username": string;
    /**
     * 用户登陆密码
     */
    "password": string;
    /**
     * 是否记住密码
     */
    "remember": boolean;
    /**
     * 验证码
     */
    "captcha": string;
}
export interface UserModel {
    /**
     * 用户登陆名称
     */
    "username"?: string;
    "permissions"?: Array<PermissionModel>;
}
/**
 * DownloadApi - fetch parameter creator
 */
export declare const DownloadApiFetchParamCreactor: {
    downloadProxyFileGet(params: {
        file: string;
    }): FetchArgs;
    downloadVerifyPost(params: {
        ids?: number[];
    }): FetchArgs;
};
/**
 * DownloadApi - functional programming interface
 */
export declare const DownloadApiFp: {
    downloadProxyFileGet(params: {
        file: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    downloadVerifyPost(params: {
        ids?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<InlineResponse2001>;
};
/**
 * DownloadApi - object-oriented interface
 */
export declare class DownloadApi extends BaseAPI {
    /**
     * 通过DAM作为代理的方式下载文件 | 一般情况下客户端直接访问下载地址下载文件，对于外包项目(李鹏)的特殊需求，无法在下载资源地址中 | 添加query参数，所以用post方式，把阿里云的参数放在body中传递
     * @param file 资源地址，对应/assets/downloadurl返回的 proxy.pathname
     */
    downloadProxyFileGet(params: {
        file: string;
    }): Promise<any>;
    /**
     * 验证当前用户是否有权限下载资源
     * @param ids 待验证的资源列表
     */
    downloadVerifyPost(params: {
        ids?: Array<number>;
    }): Promise<InlineResponse2001>;
}
/**
 * DownloadApi - factory interface
 */
export declare const DownloadApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    downloadProxyFileGet(params: {
        file: string;
    }): Promise<any>;
    downloadVerifyPost(params: {
        ids?: number[];
    }): Promise<InlineResponse2001>;
};
/**
 * OAuthTokenApi - fetch parameter creator
 */
export declare const OAuthTokenApiFetchParamCreactor: {
    oauth2AccessTokenPost(params: {
        username: string;
        password: string;
        grantType: string;
    }): FetchArgs;
    oauth2RefreshTokenPost(params: {
        grantType: string;
        refreshToken: string;
    }): FetchArgs;
};
/**
 * OAuthTokenApi - functional programming interface
 */
export declare const OAuthTokenApiFp: {
    oauth2AccessTokenPost(params: {
        username: string;
        password: string;
        grantType: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<InlineResponse2002>;
    oauth2RefreshTokenPost(params: {
        grantType: string;
        refreshToken: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<InlineResponse2003>;
};
/**
 * OAuthTokenApi - object-oriented interface
 */
export declare class OAuthTokenApi extends BaseAPI {
    /**
     * Access token
     * 根据client id,client secret,username,password以及grant type获取鉴权用户的access token和refres token等详情&lt;br/&gt; 采用OAuth2 Passport模式鉴权(参见Oauth2规范, 要求使用basic Auth方式传递client_id， client-sercret)
     * @param username VCG DAM 账号名称
     * @param password VCG DAM 账号密码
     * @param grantType 类型一定为password
     */
    oauth2AccessTokenPost(params: {
        username: string;
        password: string;
        grantType: string;
    }): Promise<InlineResponse2002>;
    /**
     * Refresh token
     * 根据鉴权用户ID和密钥访问refresh_token进行过期token的刷新操作,重新生成token,并恢复token的失效时间.&lt;br/&gt; 采用OAuth2 refresh_token 模式鉴权。(参见Oauth2规范, 要求使用basic Auth方式传递client_id， client-sercret)
     * @param grantType 鉴权请求类型等于refresh_token.
     * @param refreshToken refresh token.
     */
    oauth2RefreshTokenPost(params: {
        grantType: string;
        refreshToken: string;
    }): Promise<InlineResponse2003>;
}
/**
 * OAuthTokenApi - factory interface
 */
export declare const OAuthTokenApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    oauth2AccessTokenPost(params: {
        username: string;
        password: string;
        grantType: string;
    }): Promise<InlineResponse2002>;
    oauth2RefreshTokenPost(params: {
        grantType: string;
        refreshToken: string;
    }): Promise<InlineResponse2003>;
};
/**
 * OauthClientApi - fetch parameter creator
 */
export declare const OauthClientApiFetchParamCreactor: {
    oauthclientsGet(): FetchArgs;
    oauthclientsIdDelete(params: {
        id: number;
    }): FetchArgs;
    oauthclientsPost(params: {
        oauth: Oauth;
    }): FetchArgs;
};
/**
 * OauthClientApi - functional programming interface
 */
export declare const OauthClientApiFp: {
    oauthclientsGet(): (fetch: FetchAPI, basePath?: string) => Promise<OauthClient[]>;
    oauthclientsIdDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    oauthclientsPost(params: {
        oauth: Oauth;
    }): (fetch: FetchAPI, basePath?: string) => Promise<OauthClient>;
};
/**
 * OauthClientApi - object-oriented interface
 */
export declare class OauthClientApi extends BaseAPI {
    /**
     */
    oauthclientsGet(): Promise<OauthClient[]>;
    /**
     * @param id
     */
    oauthclientsIdDelete(params: {
        id: number;
    }): Promise<any>;
    /**
     * @param oauth
     */
    oauthclientsPost(params: {
        oauth: Oauth;
    }): Promise<OauthClient>;
}
/**
 * OauthClientApi - factory interface
 */
export declare const OauthClientApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    oauthclientsGet(): Promise<OauthClient[]>;
    oauthclientsIdDelete(params: {
        id: number;
    }): Promise<any>;
    oauthclientsPost(params: {
        oauth: Oauth;
    }): Promise<OauthClient>;
};
/**
 * SearchApi - fetch parameter creator
 */
export declare const SearchApiFetchParamCreactor: {
    searchGet(params: {
        q?: string;
    }): FetchArgs;
};
/**
 * SearchApi - functional programming interface
 */
export declare const SearchApiFp: {
    searchGet(params: {
        q?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any[]>;
};
/**
 * SearchApi - object-oriented interface
 */
export declare class SearchApi extends BaseAPI {
    /**
     * 通过关键字搜索资源
     * @param q 关键字列表，通过英文逗号分隔
     */
    searchGet(params: {
        q?: string;
    }): Promise<any[]>;
}
/**
 * SearchApi - factory interface
 */
export declare const SearchApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    searchGet(params: {
        q?: string;
    }): Promise<any[]>;
};
/**
 * UserApi - fetch parameter creator
 */
export declare const UserApiFetchParamCreactor: {
    captchaGet(): FetchArgs;
    forgetMePost(): FetchArgs;
    loginPost(params: {
        user: UserLoginModel;
    }): FetchArgs;
    logoutPost(): FetchArgs;
    profileGet(): FetchArgs;
    usersPost(params: {
        user: UserInfoModel;
    }): FetchArgs;
};
/**
 * UserApi - functional programming interface
 */
export declare const UserApiFp: {
    captchaGet(): (fetch: FetchAPI, basePath?: string) => Promise<InlineResponse200>;
    forgetMePost(): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    loginPost(params: {
        user: UserLoginModel;
    }): (fetch: FetchAPI, basePath?: string) => Promise<UserModel>;
    logoutPost(): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    profileGet(): (fetch: FetchAPI, basePath?: string) => Promise<UserInfoModel>;
    usersPost(params: {
        user: UserInfoModel;
    }): (fetch: FetchAPI, basePath?: string) => Promise<UserInfoModel>;
};
/**
 * UserApi - object-oriented interface
 */
export declare class UserApi extends BaseAPI {
    /**
     * 获取验证码
     */
    captchaGet(): Promise<InlineResponse200>;
    /**
     * 清除浏览器cookie，取消免密码登陆
     */
    forgetMePost(): Promise<any>;
    /**
     * 用户登陆
     * @param user 用户名和密码
     */
    loginPost(params: {
        user: UserLoginModel;
    }): Promise<UserModel>;
    /**
     * 用户登出
     */
    logoutPost(): Promise<any>;
    /**
     * 查看当前登录用户的个人信息
     */
    profileGet(): Promise<UserInfoModel>;
    /**
     * @param user 创建群组用户
     */
    usersPost(params: {
        user: UserInfoModel;
    }): Promise<UserInfoModel>;
}
/**
 * UserApi - factory interface
 */
export declare const UserApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    captchaGet(): Promise<InlineResponse200>;
    forgetMePost(): Promise<any>;
    loginPost(params: {
        user: UserLoginModel;
    }): Promise<UserModel>;
    logoutPost(): Promise<any>;
    profileGet(): Promise<UserInfoModel>;
    usersPost(params: {
        user: UserInfoModel;
    }): Promise<UserInfoModel>;
};
