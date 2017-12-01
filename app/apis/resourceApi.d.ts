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
export interface Assets {
    /**
     * 资产类型 01图片 02视频 03音频 04文件
     */
    "assetType"?: string;
    "audioUpload"?: ResAudioUpload;
    /**
     * 版权声明
     */
    "copyright"?: string;
    /**
     * 上传时间
     */
    "createdTime"?: Date;
    /**
     * 摄影师名字或者品牌名
     */
    "creditLine"?: string;
    /**
     * 图说
     */
    "description"?: string;
    /**
     * 下载计数
     */
    "downloadCount"?: number;
    /**
     * 编审编辑id
     */
    "editorUserId"?: string;
    /**
     * 资产id
     */
    "id"?: number;
    "imgUploads"?: ResImageUpload;
    /**
     * 入库时间
     */
    "instockTime"?: Date;
    /**
     * 是否有版权 0没有 1有
     */
    "isCopyright"?: boolean;
    "keywordIds"?: string;
    /**
     * 关键词
     */
    "keywords"?: string;
    /**
     * 授权人
     */
    "licenseAuthorizer"?: string;
    /**
     * 授权描述
     */
    "licenseDescription"?: string;
    /**
     * 该资源版权过期时间
     */
    "licenseExpireTime"?: any;
    /**
     * 该资源版权授权开始时间
     */
    "licenseStartTime"?: any;
    /**
     * 授权类型 1RM 2RF 3RR
     */
    "licenseType"?: number;
    /**
     * 具体地点
     */
    "location"?: string;
    "minPrice"?: number;
    /**
     * 下线原因
     */
    "offlineReason"?: string;
    /**
     * 下线时间
     */
    "offlineTime"?: number;
    /**
     * 资产上线状态 1已上线 2未上线 3已下线
     */
    "onlineState"?: string;
    /**
     * 上线时间
     */
    "onlineTime"?: Date;
    /**
     * 上线类型 1人工审核 2系统免审
     */
    "onlineType"?: string;
    "price"?: string;
    /**
     * 资产上传用户
     */
    "providerId"?: string;
    /**
     * 审核未通过原因
     */
    "reviewRejectReason"?: string;
    /**
     * 资产审核状态 1未编审 2已编审 3不通过 4审核通过 5关键词不通过
     */
    "reviewState"?: string;
    /**
     * 编审时间
     */
    "reviewTime"?: Date;
    /**
     * 资源标题
     */
    "title"?: string;
    /**
     * 资源最后更新时间
     */
    "updatedTime"?: Date;
    /**
     * 资产上传状态 1未提交 2入库中 3已入库 4入库失败
     */
    "uploadState"?: string;
    /**
     * 资产用途id
     */
    "usageId"?: number;
    "videoUpload"?: ResVideoUpload;
}
export interface Download {
    /**
     * 资产id
     */
    "assetId"?: number;
    /**
     * 资产类型 01图片 02视频 03音频 04文件
     */
    "assetType"?: string;
    "createdTime"?: Date;
    "id"?: number;
    /**
     * 更新时间
     */
    "updateTime"?: Date;
    /**
     * 用户id
     */
    "userId"?: string;
}
export interface DownloadURL {
    "success"?: boolean;
    "url"?: string;
}
export interface ExifEntity {
    "colorSpace"?: string;
    "dateModified"?: string;
    "dateTimeOriginal"?: string;
    "exposureBias"?: string;
    "exposureMode"?: string;
    "exposureTime"?: string;
    "fNumber"?: string;
    "fileSize"?: string;
    "flash"?: string;
    "focalLength"?: string;
    "heightSize"?: string;
    "iso"?: string;
    "lens"?: string;
    "make"?: string;
    "meteringMode"?: string;
    "model"?: string;
    "modifiedSoftware"?: string;
    "resolution"?: string;
    "size"?: string;
    "whiteBalance"?: string;
    "widthSize"?: string;
    "xResolution"?: string;
    "yResolution"?: string;
}
export interface ImageDetail {
    /**
     * 资产基本信息
     */
    "basic"?: Assets;
    /**
     * 资产详细信息
     */
    "detail"?: ResImage;
}
export interface InstockSingleRet {
    "id"?: number;
    "msg"?: string;
    "success"?: boolean;
}
export interface OnlineState {
    "offlineReason"?: string;
    "state"?: OnlineStateStateEnum;
}
export declare type OnlineStateStateEnum = "ONLINE" | "PENDING" | "OFFLINE";
export interface PageInfoImageDetail {
    "endRow"?: number;
    "firstPage"?: number;
    "hasNextPage"?: boolean;
    "hasPreviousPage"?: boolean;
    "isFirstPage"?: boolean;
    "isLastPage"?: boolean;
    "lastPage"?: number;
    "list"?: Array<ImageDetail>;
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
export interface PageInfoResFolderItemsView {
    "endRow"?: number;
    "firstPage"?: number;
    "hasNextPage"?: boolean;
    "hasPreviousPage"?: boolean;
    "isFirstPage"?: boolean;
    "isLastPage"?: boolean;
    "lastPage"?: number;
    "list"?: Array<ResFolderItemsView>;
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
export interface PageInfoobject {
    "endRow"?: number;
    "firstPage"?: number;
    "hasNextPage"?: boolean;
    "hasPreviousPage"?: boolean;
    "isFirstPage"?: boolean;
    "isLastPage"?: boolean;
    "lastPage"?: number;
    "list"?: Array<any>;
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
export interface ResAudioUpload {
    "album"?: string;
    "alterOssid"?: string;
    "artist"?: string;
    "assetId"?: number;
    "audioTitle"?: string;
    "audioType"?: string;
    "author"?: string;
    "bps"?: number;
    "caption"?: string;
    "conType"?: string;
    "copyrights"?: string;
    "coverageOssid"?: string;
    "director"?: string;
    "editStatus"?: string;
    "fileFormat"?: string;
    "fileSize"?: number;
    "instrument"?: string;
    "keywords"?: string;
    "language"?: string;
    "licenseType"?: string;
    "mood"?: string;
    "onlineStatus"?: string;
    "orginDate"?: Date;
    "ossBucketName"?: string;
    "ossEndpoint"?: string;
    "ossId"?: string;
    "previewOssid"?: string;
    "providerId"?: number;
    "publisher"?: string;
    "speed"?: string;
    "styles"?: string;
    "tags"?: string;
    "timeRemain"?: number;
    "tmpPath"?: string;
    "uploadTime"?: Date;
    "userId"?: number;
    "vcgId"?: string;
    "vocal"?: string;
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
export interface ResFolderItemsView {
    /**
     * 资产类型 01图片 02视频 03音频 04文件
     */
    "assetType"?: string;
    /**
     * 版权声明
     */
    "copyright"?: string;
    /**
     * 上传时间
     */
    "createdTime"?: Date;
    /**
     * 下载计数
     */
    "downloadCount"?: number;
    /**
     * 编审编辑id
     */
    "editorUserId"?: string;
    /**
     * 资源目录id
     */
    "folderId"?: number;
    /**
     * 资产id
     */
    "id"?: number;
    /**
     * 入库时间
     */
    "instockTime"?: Date;
    /**
     * 是否有版权 0没有 1有
     */
    "isCopyright"?: boolean;
    /**
     * 关键词
     */
    "keywords"?: string;
    "minPrice"?: number;
    /**
     * 下线原因
     */
    "offlineReason"?: string;
    /**
     * 下线时间
     */
    "offlineTime"?: number;
    /**
     * 资产上线状态 1已上线 2未上线 3已下线
     */
    "onlineState"?: string;
    /**
     * 上线时间
     */
    "onlineTime"?: Date;
    /**
     * 上线类型 1人工审核 2系统免审
     */
    "onlineType"?: string;
    "price"?: string;
    /**
     * 资产上传用户
     */
    "providerId"?: string;
    /**
     * 审核未通过原因
     */
    "reviewRejectReason"?: string;
    /**
     * 资产审核状态 1未编审 2已编审 3不通过 4审核通过 5关键词不通过
     */
    "reviewState"?: string;
    /**
     * 编审时间
     */
    "reviewTime"?: Date;
    /**
     * 标题
     */
    "title"?: string;
    /**
     * 资产上传状态 1未提交 2入库中 3已入库 4入库失败
     */
    "uploadState"?: string;
    /**
     * 资产用途id
     */
    "usageId"?: number;
}
export interface ResImage {
    /**
     * 媒资分类1编辑类2创意类
     */
    "assetFamily"?: number;
    /**
     * 媒资格式JPG, JPEG, GIF等
     */
    "assetFormat"?: string;
    /**
     * 资产id
     */
    "assetId"?: number;
    /**
     * 媒资类型1图片2视频3音频
     */
    "assetType"?: number;
    "brandId"?: number;
    /**
     * 图说
     */
    "caption"?: string;
    /**
     * 分类以，分割
     */
    "category"?: string;
    /**
     * cfp、gic资源编号
     */
    "cfpGicId"?: string;
    /**
     * 城市
     */
    "city"?: string;
    /**
     * 原始品牌id
     */
    "collectionId"?: number;
    /**
     * 1黑白2彩色
     */
    "colorType"?: number;
    "country"?: string;
    "createdBy"?: string;
    "createdTime"?: Date;
    /**
     * 拍摄时间
     */
    "dateCameraShot"?: Date;
    /**
     * 图片类型：1摄影图片2 插画 3漫画 4图表 5矢量图
     */
    "graphicalStyle"?: number;
    /**
     * 图片审核不通过原因(rest)
     */
    "imageRejectReason"?: string;
    /**
     * 是否批注1是0没批注
     */
    "isPostil"?: number;
    /**
     * 关键词审核不通过原因
     */
    "keywordsRejectReason"?: string;
    /**
     * 授权类型 1RM 2RF 3RR
     */
    "licenseType"?: number;
    /**
     * 颜色
     */
    "maincolors"?: string;
    /**
     * 备注
     */
    "memo"?: string;
    /**
     * 0:初始状态1:标记下线 2:确认下线
     */
    "offlineMark"?: number;
    /**
     * 一级分类
     */
    "oneCategory"?: number;
    /**
     * 1 人工审核 2系统免审
     */
    "onlineType"?: number;
    /**
     * 横竖图1横图2竖图3方图
     */
    "orientation"?: number;
    /**
     * 176
     */
    "oss176"?: string;
    /**
     * 400图无水印
     */
    "oss400"?: string;
    /**
     * 800图无水印
     */
    "oss800"?: string;
    /**
     * 800图有水印
     */
    "oss800Watermark"?: string;
    "ossEpsJpg"?: string;
    "ossId7"?: string;
    /**
     * 原图
     */
    "ossYuantu"?: string;
    /**
     * 人物名称
     */
    "people"?: string;
    /**
     * 高
     */
    "picHeight"?: number;
    /**
     * 像素数
     */
    "picSize"?: number;
    /**
     * 宽
     */
    "picWidth"?: number;
    /**
     * 批注时间
     */
    "postilTime"?: Date;
    /**
     * 供应商类型1机构2 个人
     */
    "providerAgentType"?: number;
    /**
     * 供应商id
     */
    "providerId"?: number;
    /**
     * 供应原始编号
     */
    "providerResId"?: string;
    /**
     * 省
     */
    "province"?: string;
    /**
     * 图片等级 1A 2B 3C 4D 5E
     */
    "qualityRank"?: number;
    /**
     * 资源编号
     */
    "resId"?: string;
    "updatedBy"?: string;
    "updatedTime"?: Date;
}
export interface ResImageExtendWithBLOBs {
    "createdBy"?: string;
    "createdTime"?: Date;
    "extend1"?: string;
    "extend2"?: string;
    "extend3"?: string;
    "extend4"?: string;
    "extend5"?: string;
    /**
     * 原始关键词
     */
    "privderKeywords"?: string;
    /**
     * 国家,省,市具体地点
     */
    "providerAddress"?: string;
    /**
     * mage creator.
     */
    "providerArtist"?: string;
    "providerCaption"?: string;
    "providerCategory"?: string;
    /**
     * id,名称
     */
    "providerCollection"?: string;
    "providerCreditLine"?: string;
    "providerDateCameraShot"?: string;
    /**
     * 供应商原始组id
     */
    "providerGroupId"?: string;
    "providerPeople"?: string;
    "providerResQualityRank"?: string;
    "providerSource"?: string;
    /**
     * 补充分类
     */
    "providerSupplementCategory"?: string;
    "providerTitle"?: string;
    "providerUsageRestrictions"?: string;
    /**
     * 数据库id
     */
    "resImageId"?: number;
    "updatedBy"?: string;
    "updatedTime"?: Date;
}
export interface ResImageUpload {
    /**
     * 资源id，来自assets
     */
    "assetId"?: number;
    /**
     * 批次id
     */
    "batchId"?: number;
    /**
     * 可以提交 0:否 1:是   方便前台显示,不需要后台维护
     */
    "canSubmit"?: number;
    /**
     * 对应的collection,必须匹配
     */
    "collection"?: string;
    /**
     * 1黑白2彩色
     */
    "colorType"?: number;
    /**
     * 文件名,也是meta表里的master_id,不包含后缀
     */
    "fileName"?: string;
    /**
     * 图片类型：1摄影图片2 插画 3漫画 4图表 5矢量图 9:eps对应的jpg
     */
    "graphicalStyle"?: number;
    /**
     * 有肖像权 1:是 0:否
     */
    "haveModelRelease"?: number;
    /**
     * 有物权 1:是 0:否
     */
    "havePropertyRelease"?: number;
    /**
     * 同编审系统的代码: 1RM 2RF
     */
    "licenseType"?: number;
    /**
     * 模特授权文件,逗号分隔
     */
    "modelRelease"?: string;
    /**
     * 分辨率为1024的预览地址
     */
    "oss1024"?: string;
    /**
     * oss地址,原图
     */
    "ossPath"?: string;
    /**
     * 1:一个人 2: 两个人 3: 3-5人 4:5人以上 5:无人
     */
    "personNumber"?: number;
    /**
     * 物权文件,逗号分隔
     */
    "propertyRelease"?: string;
    /**
     * 供应商id
     */
    "providerId"?: number;
    /**
     * 不能提交的原因
     */
    "reason"?: string;
    /**
     * 1:已上传 2:已匹配  3:入库失败 4: 已入库 5: 上传失败
     */
    "resourceStatus"?: number;
    /**
     * 限制信息
     */
    "restriction"?: string;
    /**
     * 拍摄日期
     */
    "shootDate"?: Date;
    /**
     * 界面填写:1:户外 2:室内 3:影棚 4:都市风光 5:自然风光
     */
    "shootEnvironment"?: number;
    /**
     * 拍摄地点
     */
    "shootPlace"?: string;
    "updatedTime"?: Date;
    /**
     * 小图地址,字段名字勿改
     */
    "url"?: string;
}
export interface ResImageUploadBatch {
    /**
     * 批次名称
     */
    "batchName"?: string;
    /**
     * 批次状态 1:新建 2:已入库
     */
    "batchStatus"?: number;
    /**
     * 创建时间
     */
    "createdTime"?: Date;
    /**
     * 数据库自增
     */
    "id"?: number;
    /**
     * 供应商id
     */
    "providerId"?: number;
    /**
     * 入库情况统计
     */
    "report"?: string;
    /**
     * 提交时间
     */
    "submitTime"?: Date;
}
export interface ResImageUploadMeta {
    /**
     * 批次id
     */
    "batchId"?: number;
    "createdBy"?: string;
    /**
     * 拍摄日期
     */
    "createdTime"?: Date;
    /**
     * 带扩展名的文件名
     */
    "fileName"?: string;
    /**
     * 数据库自增
     */
    "id"?: number;
    /**
     * oss地址
     */
    "ossPath"?: string;
    /**
     * 供应商id
     */
    "providerId"?: number;
    "updatedBy"?: string;
    "updatedTime"?: Date;
}
export interface ResImageUploadRelease {
    /**
     * 批次id
     */
    "batchId"?: number;
    "createdBy"?: string;
    /**
     * 拍摄日期
     */
    "createdTime"?: Date;
    /**
     * 文件名,也是meta表里的master_id
     */
    "fileName"?: string;
    /**
     * 数据库自增
     */
    "id"?: number;
    "ossPath"?: string;
    /**
     * 供应商id
     */
    "providerId"?: number;
    /**
     * 1肖像权2物权
     */
    "releaseType"?: number;
    "updatedBy"?: string;
    "updatedTime"?: Date;
}
export interface ResRootFolders {
    /**
     * 该资源树名称
     */
    "name"?: string;
    /**
     * 该资源树的所有者id
     */
    "ownerId"?: number;
    /**
     * 根节点id
     */
    "resFolderId"?: number;
}
export interface ResVideo {
    "alterOssid"?: string;
    /**
     * 艺术家（作者）
     */
    "artist"?: string;
    "assetId"?: number;
    /**
     * 作者。
     */
    "author"?: string;
    /**
     * 比特率。
     */
    "bps"?: number;
    /**
     * 品牌。
     */
    "brand"?: string;
    /**
     * 说明。
     */
    "caption"?: string;
    /**
     * 彩色或黑白。
     */
    "color"?: string;
    /**
     * 内容类别。电视剧、电影、演唱会、纪录片、片花、缩编
     */
    "conType"?: string;
    "copyrights"?: string;
    "coverageOssid"?: string;
    /**
     * 分辨率
     */
    "definitions"?: string;
    /**
     * 指挥或导演
     */
    "director"?: string;
    /**
     * 编审状态。
     */
    "editStatus"?: string;
    /**
     * 格式。mp4,flv,rm,mpg....
     */
    "fileFormat"?: string;
    /**
     * 文件大小（M）.
     */
    "fileSize"?: number;
    /**
     * 每秒帧数。
     */
    "fps"?: string;
    /**
     * 拍摄者。
     */
    "graphor"?: string;
    /**
     * 关键词。
     */
    "keywords"?: string;
    /**
     * 镜头长度。
     */
    "lensLength"?: string;
    /**
     * 镜头编号。
     */
    "lensNo"?: string;
    /**
     * 许可。RRRFRM
     */
    "license"?: string;
    "licenseType"?: string;
    /**
     * 拍摄国别。
     */
    "locale"?: string;
    /**
     * 母带存储。
     */
    "motherTape"?: string;
    /**
     * 上线状态。
     */
    "onlineStatus"?: string;
    /**
     * 发行日期。
     */
    "orginDate"?: Date;
    "ossBucketName"?: string;
    "ossEndpoint"?: string;
    /**
     * OSS ID
     */
    "ossId"?: string;
    /**
     * 像素比例。4：3 16 ：9 16：10
     */
    "pixPropotion"?: string;
    "previewOssid"?: string;
    /**
     * 组织机构。
     */
    "providerId"?: number;
    /**
     * 发行者。
     */
    "publisher"?: string;
    /**
     * 源片ID。
     */
    "srcId"?: number;
    /**
     * 标签。多个以逗号分隔.
     */
    "tags"?: string;
    /**
     * 拍摄时间。
     */
    "tapeTime"?: Date;
    /**
     * 时长（秒）。
     */
    "timeRemain"?: number;
    /**
     * 音频标题/名称。
     */
    "title"?: string;
    "tmpPath"?: string;
    /**
     * 上传日期。
     */
    "uploadTime"?: Date;
    /**
     * 上传者。
     */
    "userId"?: number;
    /**
     * vcg统一编号,备用
     */
    "vcgId"?: string;
    /**
     * 视频类别。自拍 素材 成片 .....
     */
    "videoType"?: string;
}
export interface ResVideoUpload {
    "alterOssid"?: string;
    "artist"?: string;
    "assetId"?: number;
    "author"?: string;
    "bps"?: number;
    "brand"?: string;
    "caption"?: string;
    "color"?: string;
    "conType"?: string;
    "copyrights"?: string;
    "coverageOssid"?: string;
    "definitions"?: string;
    "director"?: string;
    "editStatus"?: string;
    "fileFormat"?: string;
    "fileSize"?: number;
    "fps"?: string;
    "graphor"?: string;
    "keywords"?: string;
    "lensLength"?: string;
    "lensNo"?: string;
    "license"?: string;
    "licenseType"?: string;
    "locale"?: string;
    "motherTape"?: string;
    "onlineStatus"?: string;
    "orginDate"?: Date;
    "ossBucketName"?: string;
    "ossEndpoint"?: string;
    "ossId"?: string;
    "pixPropotion"?: string;
    "previewOssid"?: string;
    "providerId"?: number;
    "publisher"?: string;
    "srcId"?: number;
    "tags"?: string;
    "tapeTime"?: Date;
    "timeRemain"?: number;
    "title"?: string;
    "tmpPath"?: string;
    "uploadTime"?: Date;
    "userId"?: number;
    "vcgId"?: string;
    "videoType"?: string;
}
export interface ReviewState {
    "ids"?: Array<number>;
    "rejectReason"?: string;
    "reviewerId"?: string;
    "state"?: ReviewStateStateEnum;
}
export declare type ReviewStateStateEnum = "PENDING" | "INPROGRESS" | "REJECTED" | "PASSED" | "KEYWORDREJECTED";
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
export interface SensitiveWord {
    "assetFamily"?: number;
    "content"?: string;
    "content2"?: string;
    "createTime"?: Date;
    "id"?: number;
    "status"?: number;
    /**
     * 1，不能入库 2，可以入库不能自动通过
     */
    "type"?: number;
}
export interface VideoDetail {
    /**
     * 资产基本信息
     */
    "basic"?: Assets;
    /**
     * 资产详细信息
     */
    "detail"?: ResVideo;
}
export interface WaterRule {
    "chineseName"?: string;
    /**
     * 品牌id
     */
    "collectionId"?: number;
    "createdBy"?: string;
    "createdTime"?: Date;
    "id"?: number;
    /**
     * 供应商id
     */
    "providerId"?: number;
    "status"?: number;
    "updatedBy"?: string;
    "updatedTime"?: Date;
    /**
     * 水印内容,文字或者图片地址
     */
    "waterContent"?: string;
    /**
     * 水印类型  1:文字 2:图片
     */
    "waterType"?: number;
}
export interface WorkgroupFolderRole {
    "createdAt"?: Date;
    "folderId"?: number;
    "id"?: number;
    "role"?: Role;
    "roleId"?: number;
    "updatedAt"?: Date;
    "workgroupId"?: number;
}
/**
 * AssestApi - fetch parameter creator
 */
export declare const AssestApiFetchParamCreactor: {
    assetsBatchDelFolderIdDelete(params: {
        folderId: number;
        ids?: number[];
    }): FetchArgs;
    assetsBatchGet(params: {
        ids: number[];
    }): FetchArgs;
    assetsBatchUpdatePost(params: {
        asset: Assets;
        ids?: number[];
    }): FetchArgs;
    assetsDownloadPost(params: {
        ids: number[];
        userId: string;
    }): FetchArgs;
    assetsGetFoldersGet(params: {
        ids: number[];
    }): FetchArgs;
    assetsIdDelete(params: {
        id: number;
    }): FetchArgs;
    assetsIdGet(params: {
        id: number;
    }): FetchArgs;
    assetsIdKeywordsGet(params: {
        id: number;
    }): FetchArgs;
    assetsIdKeywordsPut(params: {
        id: number;
        keywords: string;
    }): FetchArgs;
    assetsIdOnlinePut(params: {
        id: number;
        onlineState: OnlineState;
    }): FetchArgs;
    assetsLoadAssetsFolderIdGet(params: {
        folderId: number;
        userId?: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
    }): FetchArgs;
    assetsPost(params: {
        asset: Assets;
    }): FetchArgs;
    assetsReviewPut(params: {
        reviewState: ReviewState;
    }): FetchArgs;
    assetsSearchGet(params: {
        keyword: string;
        onlineState?: string;
        reviewState?: string;
        uploadState?: string;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    assetsUpdateIdPost(params: {
        id: number;
        asset: Assets;
    }): FetchArgs;
};
/**
 * AssestApi - functional programming interface
 */
export declare const AssestApiFp: {
    assetsBatchDelFolderIdDelete(params: {
        folderId: number;
        ids?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    assetsBatchGet(params: {
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any[]>;
    assetsBatchUpdatePost(params: {
        asset: Assets;
        ids?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    assetsDownloadPost(params: {
        ids: number[];
        userId: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<DownloadURL>;
    assetsGetFoldersGet(params: {
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: any[];
    }>;
    assetsIdDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    assetsIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    assetsIdKeywordsGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    assetsIdKeywordsPut(params: {
        id: number;
        keywords: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    assetsIdOnlinePut(params: {
        id: number;
        onlineState: OnlineState;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    assetsLoadAssetsFolderIdGet(params: {
        folderId: number;
        userId?: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    assetsPost(params: {
        asset: Assets;
    }): (fetch: FetchAPI, basePath?: string) => Promise<Assets>;
    assetsReviewPut(params: {
        reviewState: ReviewState;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    assetsSearchGet(params: {
        keyword: string;
        onlineState?: string;
        reviewState?: string;
        uploadState?: string;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<PageInfoobject>;
    assetsUpdateIdPost(params: {
        id: number;
        asset: Assets;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * AssestApi - object-oriented interface
 */
export declare class AssestApi extends BaseAPI {
    /**
     * /batchDel
     * 批量删除资源
     * @param folderId folderId
     * @param ids ids
     */
    assetsBatchDelFolderIdDelete(params: {
        folderId: number;
        ids?: Array<number>;
    }): Promise<any>;
    /**
     * 根据id获取指定多个资源详细信息
     * 批量获取资源信息，包含基本信息，详细信息
     * @param ids ids
     */
    assetsBatchGet(params: {
        ids: Array<number>;
    }): Promise<any[]>;
    /**
     * /{id}
     * 修改多个资源
     * @param asset asset
     * @param ids ids
     */
    assetsBatchUpdatePost(params: {
        asset: Assets;
        ids?: Array<number>;
    }): Promise<any>;
    /**
     * /download
     * 获取资源的批量下载地址，支持图片和视频的混合批量下载，同时记录下载历史
     * @param ids ids
     * @param userId userId
     */
    assetsDownloadPost(params: {
        ids: Array<number>;
        userId: string;
    }): Promise<DownloadURL>;
    /**
     * /getFolders
     * 获取多个资产所在目录列表
     * @param ids ids
     */
    assetsGetFoldersGet(params: {
        ids: Array<number>;
    }): Promise<{
        [key: string]: any[];
    }>;
    /**
     * /{id}
     * 删除单个资源
     * @param id id
     */
    assetsIdDelete(params: {
        id: number;
    }): Promise<number>;
    /**
     * 获取单个资源详细信息
     * 获取资源信息，包含基本信息，详细信息
     * @param id id
     */
    assetsIdGet(params: {
        id: number;
    }): Promise<any>;
    /**
     * /{id}/keywords
     * 获取单张图片关键字信息
     * @param id id
     */
    assetsIdKeywordsGet(params: {
        id: number;
    }): Promise<string>;
    /**
     * /{id}/keywords
     * 修改单张图片关键字信息
     * @param id id
     * @param keywords keywords
     */
    assetsIdKeywordsPut(params: {
        id: number;
        keywords: string;
    }): Promise<number>;
    /**
     * /{id}/online
     * 修改单张图片在线状态
     * @param id id
     * @param onlineState onlineState
     */
    assetsIdOnlinePut(params: {
        id: number;
        onlineState: OnlineState;
    }): Promise<number>;
    /**
     * 内容上传资源列表接口
     * 内容上传资源列表接口，仅获取未入库状态的资源
     * @param folderId 目标目录id
     * @param userId 当前用户
     * @param pageNum 查询第N页收藏列表
     * @param pageSize 每页显示搜藏数
     * @param assetType 资源类型
     */
    assetsLoadAssetsFolderIdGet(params: {
        folderId: number;
        userId?: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
    }): Promise<any>;
    /**
     * create
     * 创建资源
     * @param asset asset
     */
    assetsPost(params: {
        asset: Assets;
    }): Promise<Assets>;
    /**
     * /review
     * 批量修改图片编审状态
     * @param reviewState reviewState
     */
    assetsReviewPut(params: {
        reviewState: ReviewState;
    }): Promise<number>;
    /**
     * /search
     * 搜索
     * @param keyword keyword
     * @param onlineState onlineState
     * @param reviewState reviewState
     * @param uploadState uploadState
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    assetsSearchGet(params: {
        keyword: string;
        onlineState?: string;
        reviewState?: string;
        uploadState?: string;
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoobject>;
    /**
     * /{id}
     * 修改单个资源
     * @param id id
     * @param asset asset
     */
    assetsUpdateIdPost(params: {
        id: number;
        asset: Assets;
    }): Promise<any>;
}
/**
 * AssestApi - factory interface
 */
export declare const AssestApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    assetsBatchDelFolderIdDelete(params: {
        folderId: number;
        ids?: number[];
    }): Promise<any>;
    assetsBatchGet(params: {
        ids: number[];
    }): Promise<any[]>;
    assetsBatchUpdatePost(params: {
        asset: Assets;
        ids?: number[];
    }): Promise<any>;
    assetsDownloadPost(params: {
        ids: number[];
        userId: string;
    }): Promise<DownloadURL>;
    assetsGetFoldersGet(params: {
        ids: number[];
    }): Promise<{
        [key: string]: any[];
    }>;
    assetsIdDelete(params: {
        id: number;
    }): Promise<number>;
    assetsIdGet(params: {
        id: number;
    }): Promise<any>;
    assetsIdKeywordsGet(params: {
        id: number;
    }): Promise<string>;
    assetsIdKeywordsPut(params: {
        id: number;
        keywords: string;
    }): Promise<number>;
    assetsIdOnlinePut(params: {
        id: number;
        onlineState: OnlineState;
    }): Promise<number>;
    assetsLoadAssetsFolderIdGet(params: {
        folderId: number;
        userId?: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
    }): Promise<any>;
    assetsPost(params: {
        asset: Assets;
    }): Promise<Assets>;
    assetsReviewPut(params: {
        reviewState: ReviewState;
    }): Promise<number>;
    assetsSearchGet(params: {
        keyword: string;
        onlineState?: string;
        reviewState?: string;
        uploadState?: string;
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoobject>;
    assetsUpdateIdPost(params: {
        id: number;
        asset: Assets;
    }): Promise<any>;
};
/**
 * DEMOApi - fetch parameter creator
 */
export declare const DEMOApiFetchParamCreactor: {
    demoUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): FetchArgs;
    demoWorkgroupFolderRoleGet(params: {
        folderId: number;
        workgropId: number;
    }): FetchArgs;
};
/**
 * DEMOApi - functional programming interface
 */
export declare const DEMOApiFp: {
    demoUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: string[];
    }>;
    demoWorkgroupFolderRoleGet(params: {
        folderId: number;
        workgropId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<WorkgroupFolderRole[]>;
};
/**
 * DEMOApi - object-oriented interface
 */
export declare class DEMOApi extends BaseAPI {
    /**
     * /userFolderPermissionList
     * 获取用户的目录权限设置列表
     * @param userId userId
     * @param folderId folderId
     */
    demoUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): Promise<{
        [key: string]: string[];
    }>;
    /**
     * /workgroupFolderRole
     * 获取某群组某目录的设置的角色
     * @param folderId folderId
     * @param workgropId workgropId
     */
    demoWorkgroupFolderRoleGet(params: {
        folderId: number;
        workgropId: number;
    }): Promise<WorkgroupFolderRole[]>;
}
/**
 * DEMOApi - factory interface
 */
export declare const DEMOApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    demoUserFolderPermissionListGet(params: {
        userId: string;
        folderId?: number;
    }): Promise<{
        [key: string]: string[];
    }>;
    demoWorkgroupFolderRoleGet(params: {
        folderId: number;
        workgropId: number;
    }): Promise<WorkgroupFolderRole[]>;
};
/**
 * DownloadcontrollerApi - fetch parameter creator
 */
export declare const DownloadcontrollerApiFetchParamCreactor: {
    downloadBatchDelete(params: {
        userId: string;
        ids: number[];
    }): FetchArgs;
    downloadIdGet(params: {
        id: number;
    }): FetchArgs;
    downloadPageListGet(params: {
        userId: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
        orderBy?: string;
    }): FetchArgs;
};
/**
 * DownloadcontrollerApi - functional programming interface
 */
export declare const DownloadcontrollerApiFp: {
    downloadBatchDelete(params: {
        userId: string;
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    downloadIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<Download>;
    downloadPageListGet(params: {
        userId: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
        orderBy?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<PageInfoobject>;
};
/**
 * DownloadcontrollerApi - object-oriented interface
 */
export declare class DownloadcontrollerApi extends BaseAPI {
    /**
     * 删除
     * 删除下载信息
     * @param userId userId
     * @param ids ids
     */
    downloadBatchDelete(params: {
        userId: string;
        ids: Array<number>;
    }): Promise<boolean>;
    /**
     * 查看
     * 查看下载信息
     * @param id id
     */
    downloadIdGet(params: {
        id: number;
    }): Promise<Download>;
    /**
     * list
     * 列表信息
     * @param userId userId
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param assetType assetType
     * @param orderBy orderBy
     */
    downloadPageListGet(params: {
        userId: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
        orderBy?: string;
    }): Promise<PageInfoobject>;
}
/**
 * DownloadcontrollerApi - factory interface
 */
export declare const DownloadcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    downloadBatchDelete(params: {
        userId: string;
        ids: number[];
    }): Promise<boolean>;
    downloadIdGet(params: {
        id: number;
    }): Promise<Download>;
    downloadPageListGet(params: {
        userId: string;
        pageNum?: number;
        pageSize?: number;
        assetType?: string;
        orderBy?: string;
    }): Promise<PageInfoobject>;
};
/**
 * FavoritecontrollerApi - fetch parameter creator
 */
export declare const FavoritecontrollerApiFetchParamCreactor: {
    favoriteCreatePost(params: {
        userId: string;
        assetIds: number[];
    }): FetchArgs;
    favoriteDeleteDelete(params: {
        userId: string;
        assetIds: number[];
    }): FetchArgs;
    favoritePageListGet(params: {
        userId: string;
        assetType?: string;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
};
/**
 * FavoritecontrollerApi - functional programming interface
 */
export declare const FavoritecontrollerApiFp: {
    favoriteCreatePost(params: {
        userId: string;
        assetIds: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    favoriteDeleteDelete(params: {
        userId: string;
        assetIds: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    favoritePageListGet(params: {
        userId: string;
        assetType?: string;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * FavoritecontrollerApi - object-oriented interface
 */
export declare class FavoritecontrollerApi extends BaseAPI {
    /**
     * 批量添加多个资源到用户收藏
     * 批量添加多个资源到用户收藏，自动过滤了资源的重复收藏
     * @param userId 当前用户ID
     * @param assetIds 资源ID数组
     */
    favoriteCreatePost(params: {
        userId: string;
        assetIds: Array<number>;
    }): Promise<boolean>;
    /**
     * 删除用户的部分收藏记录
     * 删除用户的部分收藏记录
     * @param userId 当前用户ID
     * @param assetIds 被取消收藏的资源id
     */
    favoriteDeleteDelete(params: {
        userId: string;
        assetIds: Array<number>;
    }): Promise<any>;
    /**
     * 根据资源类型，分页查询收藏记录
     * 收藏资源分页查询，按收藏时间最新的在最前面，按收藏时间最新的在最前面，具体资源信息在调用资源对应查看接口
     * @param userId 用户ID
     * @param assetType 收藏资源文件类型,资源类型 1图片 2视频 3音频 4文件
     * @param pageNum 查询第N页收藏列表
     * @param pageSize 每页显示搜藏数
     */
    favoritePageListGet(params: {
        userId: string;
        assetType?: string;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
}
/**
 * FavoritecontrollerApi - factory interface
 */
export declare const FavoritecontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    favoriteCreatePost(params: {
        userId: string;
        assetIds: number[];
    }): Promise<boolean>;
    favoriteDeleteDelete(params: {
        userId: string;
        assetIds: number[];
    }): Promise<any>;
    favoritePageListGet(params: {
        userId: string;
        assetType?: string;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
};
/**
 * FolderItemsApi - fetch parameter creator
 */
export declare const FolderItemsApiFetchParamCreactor: {
    folderitemsCountGet(params: {
        folderId?: number;
        provider?: string;
        assetType?: string;
        reviewState?: string;
        onlineState?: string;
    }): FetchArgs;
    folderitemsFolderIdDelete(params: {
        folderId: number;
        assetIDs: number[];
    }): FetchArgs;
    folderitemsFolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
    }): FetchArgs;
    folderitemsFolderIdPost(params: {
        folderId: number;
        assetId: number;
    }): FetchArgs;
    folderitemsUnInstockAssetsCountGet(params: {
        folderId?: number;
        userId?: string;
        assetType?: string;
    }): FetchArgs;
    folderitemsV2FolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
        level?: number;
    }): FetchArgs;
};
/**
 * FolderItemsApi - functional programming interface
 */
export declare const FolderItemsApiFp: {
    folderitemsCountGet(params: {
        folderId?: number;
        provider?: string;
        assetType?: string;
        reviewState?: string;
        onlineState?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    folderitemsFolderIdDelete(params: {
        folderId: number;
        assetIDs: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    folderitemsFolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<PageInfoResFolderItemsView>;
    folderitemsFolderIdPost(params: {
        folderId: number;
        assetId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    folderitemsUnInstockAssetsCountGet(params: {
        folderId?: number;
        userId?: string;
        assetType?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    folderitemsV2FolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
        level?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * FolderItemsApi - object-oriented interface
 */
export declare class FolderItemsApi extends BaseAPI {
    /**
     * /count
     * 对于已经提交的资产，获取各个目录下的资产的个数
     * @param folderId folderId
     * @param provider provider
     * @param assetType assetType
     * @param reviewState reviewState
     * @param onlineState onlineState
     */
    folderitemsCountGet(params: {
        folderId?: number;
        provider?: string;
        assetType?: string;
        reviewState?: string;
        onlineState?: string;
    }): Promise<any>;
    /**
     * /{folderId}
     * 在目录下删除资源
     * @param folderId folderId
     * @param assetIDs assetIDs
     */
    folderitemsFolderIdDelete(params: {
        folderId: number;
        assetIDs: Array<number>;
    }): Promise<number>;
    /**
     * /{folderId}
     * 获取目录下的资源
     * @param folderId folderId
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param folderId2 folderId2
     * @param provider provider
     * @param assetType assetType
     * @param uploadState uploadState
     * @param reviewState reviewState
     * @param onlineState onlineState
     * @param orderBy orderBy
     */
    folderitemsFolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
    }): Promise<PageInfoResFolderItemsView>;
    /**
     * /{folderId}
     * 在目录下添加资源
     * @param folderId folderId
     * @param assetId assetId
     */
    folderitemsFolderIdPost(params: {
        folderId: number;
        assetId: number;
    }): Promise<number>;
    /**
     * /unInstockAssetsCount
     * 对于未入库的资产，获取各个目录下的资产的个数
     * @param folderId folderId
     * @param userId userId
     * @param assetType assetType
     */
    folderitemsUnInstockAssetsCountGet(params: {
        folderId?: number;
        userId?: string;
        assetType?: string;
    }): Promise<any>;
    /**
     * 根据目录id获取目录的资源
     * 用户用图，内容审核功能资源列表接口
     * @param folderId folderId
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param folderId2 folderId2
     * @param provider provider
     * @param assetType 资源类型
     * @param uploadState 资源上传状态
     * @param reviewState 资源审核状态
     * @param onlineState 资源上线状态
     * @param orderBy 排序方式
     * @param level 查看目录下n级以内的资源，0：只包括根目录资源，1：包括根目录和一级子目录资源，2：包括根目录，一级子目录，二级子目录资源... ...
     */
    folderitemsV2FolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
        level?: number;
    }): Promise<any>;
}
/**
 * FolderItemsApi - factory interface
 */
export declare const FolderItemsApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    folderitemsCountGet(params: {
        folderId?: number;
        provider?: string;
        assetType?: string;
        reviewState?: string;
        onlineState?: string;
    }): Promise<any>;
    folderitemsFolderIdDelete(params: {
        folderId: number;
        assetIDs: number[];
    }): Promise<number>;
    folderitemsFolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
    }): Promise<PageInfoResFolderItemsView>;
    folderitemsFolderIdPost(params: {
        folderId: number;
        assetId: number;
    }): Promise<number>;
    folderitemsUnInstockAssetsCountGet(params: {
        folderId?: number;
        userId?: string;
        assetType?: string;
    }): Promise<any>;
    folderitemsV2FolderIdGet(params: {
        folderId: number;
        pageNum?: number;
        pageSize?: number;
        folderId2?: number;
        provider?: string;
        assetType?: string;
        uploadState?: string;
        reviewState?: string;
        onlineState?: string;
        orderBy?: string;
        level?: number;
    }): Promise<any>;
};
/**
 * FoldersApi - fetch parameter creator
 */
export declare const FoldersApiFetchParamCreactor: {
    foldersCopyPost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): FetchArgs;
    foldersCountPost(params: {
        folderIds?: number[];
        providerId?: string;
        assetType?: string;
        uploadStates?: string[];
        reviewState?: string;
        onlineState?: string;
        permissionUserId?: string;
    }): FetchArgs;
    foldersGet(params: {
        name?: string;
    }): FetchArgs;
    foldersIdDelete(params: {
        id: number;
    }): FetchArgs;
    foldersIdGet(params: {
        id: number;
    }): FetchArgs;
    foldersIdPost(params: {
        id: number;
        resFolderWeb: ResFolder;
    }): FetchArgs;
    foldersIdPut(params: {
        id: number;
        resFolder: ResFolder;
    }): FetchArgs;
    foldersIdSubFoldersPost(params: {
        id: number;
    }): FetchArgs;
    foldersIsBatchExistGet(params: {
        folderIds?: number[];
    }): FetchArgs;
    foldersIsExistGet(params: {
        folderId?: number;
    }): FetchArgs;
    foldersMergePost(params: {
        parentId?: number;
        sourceFolderIds?: number[];
        targetFolderName?: string;
    }): FetchArgs;
    foldersMovePost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): FetchArgs;
};
/**
 * FoldersApi - functional programming interface
 */
export declare const FoldersApiFp: {
    foldersCopyPost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
    foldersCountPost(params: {
        folderIds?: number[];
        providerId?: string;
        assetType?: string;
        uploadStates?: string[];
        reviewState?: string;
        onlineState?: string;
        permissionUserId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
    foldersGet(params: {
        name?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder[]>;
    foldersIdDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder[]>;
    foldersIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
    foldersIdPost(params: {
        id: number;
        resFolderWeb: ResFolder;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
    foldersIdPut(params: {
        id: number;
        resFolder: ResFolder;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
    foldersIdSubFoldersPost(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder[]>;
    foldersIsBatchExistGet(params: {
        folderIds?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: boolean;
    }>;
    foldersIsExistGet(params: {
        folderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<boolean>;
    foldersMergePost(params: {
        parentId?: number;
        sourceFolderIds?: number[];
        targetFolderName?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
    foldersMovePost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResFolder>;
};
/**
 * FoldersApi - object-oriented interface
 */
export declare class FoldersApi extends BaseAPI {
    /**
     * 拷贝目录到另一个目录中
     * 将A目录拷贝到B目录中，A为根节点的整棵子树都拷贝到B目录下。不允许拷贝到自己的子目录下；拷贝后的目录层级不能超过系统的最大层级；目标目录下不能存在和源目录同名的目录。返回结构是生成子树的根目录
     * @param sourceFolderId 被拷贝目录ID
     * @param targetFolderId 目的目录ID
     */
    foldersCopyPost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): Promise<ResFolder>;
    /**
     * 获取指定目录符合条件的资源数，以及各自更下级目录是否还有符合条件的资源
     * 目的在于查询条件变化时，要保持目录树展开状态不变，同时更新目录上的资源数
     * @param folderIds 被统计目录id
     * @param providerId 资源提供人id，在图片上传页面只显示自己的图片所需要
     * @param assetType 资源类型：图片，视频， 音频。。。
     * @param uploadStates 资源上传状态
     * @param reviewState 资源审核状态
     * @param onlineState 资源上线状态
     * @param permissionUserId 当前用户ID，如果有此参数则查询此人权限范围内的目录，否则是全部目录。用户用途页面和内容上传页面需要此参数，内容审核页面不需要
     */
    foldersCountPost(params: {
        folderIds?: Array<number>;
        providerId?: string;
        assetType?: string;
        uploadStates?: Array<string>;
        reviewState?: string;
        onlineState?: string;
        permissionUserId?: string;
    }): Promise<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
    /**
     * 目录列表
     * 获取目录列表，如果没有关键字则查询所有目录
     * @param name 目录关键字
     */
    foldersGet(params: {
        name?: string;
    }): Promise<ResFolder[]>;
    /**
     * /{id}
     * 删除子目录
     * @param id id
     */
    foldersIdDelete(params: {
        id: number;
    }): Promise<ResFolder[]>;
    /**
     * /{id}
     * 获取目录信息
     * @param id id
     */
    foldersIdGet(params: {
        id: number;
    }): Promise<ResFolder>;
    /**
     * /{id}
     * 创建子目录，同一父目录下不准出现同名目录
     * @param id id
     * @param resFolderWeb resFolderWeb
     */
    foldersIdPost(params: {
        id: number;
        resFolderWeb: ResFolder;
    }): Promise<ResFolder>;
    /**
     * /{id}
     * 更新子目录名称
     * @param id id
     * @param resFolder resFolder
     */
    foldersIdPut(params: {
        id: number;
        resFolder: ResFolder;
    }): Promise<ResFolder>;
    /**
     * 获取某目录的子目录列表及孙子目录列表
     * 子目录列表用来树形结构展示，孙子目录用来判断所属子目录是否还有下级，显示下拉图标
     * @param id 当前目录id
     */
    foldersIdSubFoldersPost(params: {
        id: number;
    }): Promise<ResFolder[]>;
    /**
     * 判断目录是否存在
     * 判断多个目录是否存在
     * @param folderIds folderIds
     */
    foldersIsBatchExistGet(params: {
        folderIds?: Array<number>;
    }): Promise<{
        [key: string]: boolean;
    }>;
    /**
     * 判断目录是否存在
     * 判断目录是否存在
     * @param folderId folderId
     */
    foldersIsExistGet(params: {
        folderId?: number;
    }): Promise<boolean>;
    /**
     * 合并多个目录到新目录中
     * 被合并的目录必须是在同一个父目录下，合并后的新目录是在此父目录下新创建的。返回父目录下的全部一级子目录
     * @param parentId 当前合并目录的父目录ID
     * @param sourceFolderIds 被合并的多个目录的ID
     * @param targetFolderName 合并之后的新目录名称
     */
    foldersMergePost(params: {
        parentId?: number;
        sourceFolderIds?: Array<number>;
        targetFolderName?: string;
    }): Promise<ResFolder>;
    /**
     * 移动一个目录到另一个目录下
     * 将源目录移动到目的目录下。不允许移动到自己的子目录下；移动后的目录层级不能超过系统的最大层级；目标目录下下不能存在和源目录同名的目录
     * @param sourceFolderId 被移动目录ID
     * @param targetFolderId 目的目录ID
     */
    foldersMovePost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): Promise<ResFolder>;
}
/**
 * FoldersApi - factory interface
 */
export declare const FoldersApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    foldersCopyPost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): Promise<ResFolder>;
    foldersCountPost(params: {
        folderIds?: number[];
        providerId?: string;
        assetType?: string;
        uploadStates?: string[];
        reviewState?: string;
        onlineState?: string;
        permissionUserId?: string;
    }): Promise<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
    foldersGet(params: {
        name?: string;
    }): Promise<ResFolder[]>;
    foldersIdDelete(params: {
        id: number;
    }): Promise<ResFolder[]>;
    foldersIdGet(params: {
        id: number;
    }): Promise<ResFolder>;
    foldersIdPost(params: {
        id: number;
        resFolderWeb: ResFolder;
    }): Promise<ResFolder>;
    foldersIdPut(params: {
        id: number;
        resFolder: ResFolder;
    }): Promise<ResFolder>;
    foldersIdSubFoldersPost(params: {
        id: number;
    }): Promise<ResFolder[]>;
    foldersIsBatchExistGet(params: {
        folderIds?: number[];
    }): Promise<{
        [key: string]: boolean;
    }>;
    foldersIsExistGet(params: {
        folderId?: number;
    }): Promise<boolean>;
    foldersMergePost(params: {
        parentId?: number;
        sourceFolderIds?: number[];
        targetFolderName?: string;
    }): Promise<ResFolder>;
    foldersMovePost(params: {
        sourceFolderId?: number;
        targetFolderId?: number;
    }): Promise<ResFolder>;
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
 * ImageExtensionsApi - fetch parameter creator
 */
export declare const ImageExtensionsApiFetchParamCreactor: {
    imageIdExtensionDelete(params: {
        id: number;
    }): FetchArgs;
    imageIdExtensionGet(params: {
        id: number;
    }): FetchArgs;
    imageIdExtensionPost(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): FetchArgs;
    imageIdExtensionPut(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): FetchArgs;
};
/**
 * ImageExtensionsApi - functional programming interface
 */
export declare const ImageExtensionsApiFp: {
    imageIdExtensionDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    imageIdExtensionGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ResImageExtendWithBLOBs>;
    imageIdExtensionPost(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    imageIdExtensionPut(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
};
/**
 * ImageExtensionsApi - object-oriented interface
 */
export declare class ImageExtensionsApi extends BaseAPI {
    /**
     * /
     * 修改图片扩展信息
     * @param id id
     */
    imageIdExtensionDelete(params: {
        id: number;
    }): Promise<number>;
    /**
     * /
     * 获取图片扩展信息
     * @param id id
     */
    imageIdExtensionGet(params: {
        id: number;
    }): Promise<ResImageExtendWithBLOBs>;
    /**
     * /
     * 添加图片扩展信息
     * @param id id
     * @param resImageExtend resImageExtend
     */
    imageIdExtensionPost(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): Promise<number>;
    /**
     * /
     * 修改图片扩展信息
     * @param id id
     * @param resImageExtend resImageExtend
     */
    imageIdExtensionPut(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): Promise<number>;
}
/**
 * ImageExtensionsApi - factory interface
 */
export declare const ImageExtensionsApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    imageIdExtensionDelete(params: {
        id: number;
    }): Promise<number>;
    imageIdExtensionGet(params: {
        id: number;
    }): Promise<ResImageExtendWithBLOBs>;
    imageIdExtensionPost(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): Promise<number>;
    imageIdExtensionPut(params: {
        id: number;
        resImageExtend: ResImageExtendWithBLOBs;
    }): Promise<number>;
};
/**
 * ImagesApi - fetch parameter creator
 */
export declare const ImagesApiFetchParamCreactor: {
    imagesBatchPost(params: {
        ids: number[];
    }): FetchArgs;
    imagesDelete(params: {
        ids: number[];
    }): FetchArgs;
    imagesIdDelete(params: {
        id: number;
    }): FetchArgs;
    imagesIdExifGet(params: {
        id: number;
    }): FetchArgs;
    imagesIdFoldersGet(params: {
        id: number;
    }): FetchArgs;
    imagesIdGet(params: {
        id: number;
    }): FetchArgs;
    imagesIdPut(params: {
        id: number;
        resImageWeb: ImageDetail;
    }): FetchArgs;
    imagesIdRotationPut(params: {
        id: number;
        rotation: number;
        keepOrigin?: number;
    }): FetchArgs;
    imagesPageGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    imagesPost(params: {
        resImageWeb: ImageDetail;
    }): FetchArgs;
};
/**
 * ImagesApi - functional programming interface
 */
export declare const ImagesApiFp: {
    imagesBatchPost(params: {
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<ImageDetail[]>;
    imagesDelete(params: {
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    imagesIdDelete(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    imagesIdExifGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ExifEntity>;
    imagesIdFoldersGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number[]>;
    imagesIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ImageDetail>;
    imagesIdPut(params: {
        id: number;
        resImageWeb: ImageDetail;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    imagesIdRotationPut(params: {
        id: number;
        rotation: number;
        keepOrigin?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ImageDetail>;
    imagesPageGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<PageInfoImageDetail>;
    imagesPost(params: {
        resImageWeb: ImageDetail;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ImageDetail>;
};
/**
 * ImagesApi - object-oriented interface
 */
export declare class ImagesApi extends BaseAPI {
    /**
     * /batch
     * 批量获取图片信息
     * @param ids ids
     */
    imagesBatchPost(params: {
        ids: Array<number>;
    }): Promise<ImageDetail[]>;
    /**
     * /
     * 批量删除图片
     * @param ids ids
     */
    imagesDelete(params: {
        ids: Array<number>;
    }): Promise<number>;
    /**
     * /{id}
     * 删除单张图片
     * @param id id
     */
    imagesIdDelete(params: {
        id: number;
    }): Promise<number>;
    /**
     * /{id}/exif
     * 获取单张图片exif信息
     * @param id id
     */
    imagesIdExifGet(params: {
        id: number;
    }): Promise<ExifEntity>;
    /**
     * /{id}/folders
     * 获取单张图片所在目录列表
     * @param id id
     */
    imagesIdFoldersGet(params: {
        id: number;
    }): Promise<number[]>;
    /**
     * /{id}
     * 获取图片信息
     * @param id id
     */
    imagesIdGet(params: {
        id: number;
    }): Promise<ImageDetail>;
    /**
     * /{id}
     * 修改单张图片
     * @param id id
     * @param resImageWeb resImageWeb
     */
    imagesIdPut(params: {
        id: number;
        resImageWeb: ImageDetail;
    }): Promise<number>;
    /**
     * /{id}/rotation
     * 旋转图片
     * @param id id
     * @param rotation rotation
     * @param keepOrigin keepOrigin
     */
    imagesIdRotationPut(params: {
        id: number;
        rotation: number;
        keepOrigin?: number;
    }): Promise<ImageDetail>;
    /**
     * /page
     * 分页获取仓库中所有的图片信息
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    imagesPageGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoImageDetail>;
    /**
     * create
     * 创建图片
     * @param resImageWeb resImageWeb
     */
    imagesPost(params: {
        resImageWeb: ImageDetail;
    }): Promise<ImageDetail>;
}
/**
 * ImagesApi - factory interface
 */
export declare const ImagesApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    imagesBatchPost(params: {
        ids: number[];
    }): Promise<ImageDetail[]>;
    imagesDelete(params: {
        ids: number[];
    }): Promise<number>;
    imagesIdDelete(params: {
        id: number;
    }): Promise<number>;
    imagesIdExifGet(params: {
        id: number;
    }): Promise<ExifEntity>;
    imagesIdFoldersGet(params: {
        id: number;
    }): Promise<number[]>;
    imagesIdGet(params: {
        id: number;
    }): Promise<ImageDetail>;
    imagesIdPut(params: {
        id: number;
        resImageWeb: ImageDetail;
    }): Promise<number>;
    imagesIdRotationPut(params: {
        id: number;
        rotation: number;
        keepOrigin?: number;
    }): Promise<ImageDetail>;
    imagesPageGet(params: {
        pageNum?: number;
        pageSize?: number;
    }): Promise<PageInfoImageDetail>;
    imagesPost(params: {
        resImageWeb: ImageDetail;
    }): Promise<ImageDetail>;
};
/**
 * InApi - fetch parameter creator
 */
export declare const InApiFetchParamCreactor: {
    instocksPost(params: {
        ids: number[];
        autoPass?: number;
    }): FetchArgs;
};
/**
 * InApi - functional programming interface
 */
export declare const InApiFp: {
    instocksPost(params: {
        ids: number[];
        autoPass?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<InstockSingleRet[]>;
};
/**
 * InApi - object-oriented interface
 */
export declare class InApi extends BaseAPI {
    /**
     * /
     * 入库
     * @param ids ids
     * @param autoPass autoPass
     */
    instocksPost(params: {
        ids: Array<number>;
        autoPass?: number;
    }): Promise<InstockSingleRet[]>;
}
/**
 * InApi - factory interface
 */
export declare const InApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    instocksPost(params: {
        ids: number[];
        autoPass?: number;
    }): Promise<InstockSingleRet[]>;
};
/**
 * ResaudiouploadcontrollerApi - fetch parameter creator
 */
export declare const ResaudiouploadcontrollerApiFetchParamCreactor: {
    resAudioUploadCreatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): FetchArgs;
    resAudioUploadDeletePost(params: {
        ids: any;
    }): FetchArgs;
    resAudioUploadListGet(params: {
        resAudioUpload?: ResAudioUpload;
    }): FetchArgs;
    resAudioUploadListPost(params: {
        resAudioUpload?: ResAudioUpload;
    }): FetchArgs;
    resAudioUploadPageListGet(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resAudioUploadPageListPost(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resAudioUploadUpdatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): FetchArgs;
    resAudioUploadViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResaudiouploadcontrollerApi - functional programming interface
 */
export declare const ResaudiouploadcontrollerApiFp: {
    resAudioUploadCreatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadListGet(params: {
        resAudioUpload?: ResAudioUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadListPost(params: {
        resAudioUpload?: ResAudioUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadPageListGet(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadPageListPost(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadUpdatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resAudioUploadViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResaudiouploadcontrollerApi - object-oriented interface
 */
export declare class ResaudiouploadcontrollerApi extends BaseAPI {
    /**
     * create
     * @param resAudioUpload resAudioUpload
     */
    resAudioUploadCreatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    resAudioUploadDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param resAudioUpload resAudioUpload
     */
    resAudioUploadListGet(params: {
        resAudioUpload?: ResAudioUpload;
    }): Promise<any>;
    /**
     * list
     * @param resAudioUpload resAudioUpload
     */
    resAudioUploadListPost(params: {
        resAudioUpload?: ResAudioUpload;
    }): Promise<any>;
    /**
     * pageList
     * @param resAudioUpload resAudioUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resAudioUploadPageListGet(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param resAudioUpload resAudioUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resAudioUploadPageListPost(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param resAudioUpload resAudioUpload
     */
    resAudioUploadUpdatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resAudioUploadViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResaudiouploadcontrollerApi - factory interface
 */
export declare const ResaudiouploadcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resAudioUploadCreatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): Promise<any>;
    resAudioUploadDeletePost(params: {
        ids: any;
    }): Promise<any>;
    resAudioUploadListGet(params: {
        resAudioUpload?: ResAudioUpload;
    }): Promise<any>;
    resAudioUploadListPost(params: {
        resAudioUpload?: ResAudioUpload;
    }): Promise<any>;
    resAudioUploadPageListGet(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resAudioUploadPageListPost(params: {
        resAudioUpload?: ResAudioUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resAudioUploadUpdatePost(params: {
        resAudioUpload: ResAudioUpload;
    }): Promise<any>;
    resAudioUploadViewGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * ResimageuploadbatchcontrollerApi - fetch parameter creator
 */
export declare const ResimageuploadbatchcontrollerApiFetchParamCreactor: {
    resImageUploadBatchCreatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): FetchArgs;
    resImageUploadBatchDeletePost(params: {
        ids: any;
    }): FetchArgs;
    resImageUploadBatchListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): FetchArgs;
    resImageUploadBatchListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): FetchArgs;
    resImageUploadBatchPageListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadBatchPageListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadBatchUpdatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): FetchArgs;
    resImageUploadBatchViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResimageuploadbatchcontrollerApi - functional programming interface
 */
export declare const ResimageuploadbatchcontrollerApiFp: {
    resImageUploadBatchCreatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchPageListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchPageListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchUpdatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResimageuploadbatchcontrollerApi - object-oriented interface
 */
export declare class ResimageuploadbatchcontrollerApi extends BaseAPI {
    /**
     * create
     * @param resImageUploadBatch resImageUploadBatch
     */
    resImageUploadBatchCreatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    resImageUploadBatchDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadBatch resImageUploadBatch
     */
    resImageUploadBatchListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadBatch resImageUploadBatch
     */
    resImageUploadBatchListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadBatch resImageUploadBatch
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadBatchPageListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadBatch resImageUploadBatch
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadBatchPageListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param resImageUploadBatch resImageUploadBatch
     */
    resImageUploadBatchUpdatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resImageUploadBatchViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResimageuploadbatchcontrollerApi - factory interface
 */
export declare const ResimageuploadbatchcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resImageUploadBatchCreatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): Promise<any>;
    resImageUploadBatchDeletePost(params: {
        ids: any;
    }): Promise<any>;
    resImageUploadBatchListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): Promise<any>;
    resImageUploadBatchListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
    }): Promise<any>;
    resImageUploadBatchPageListGet(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadBatchPageListPost(params: {
        resImageUploadBatch?: ResImageUploadBatch;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadBatchUpdatePost(params: {
        resImageUploadBatch: ResImageUploadBatch;
    }): Promise<any>;
    resImageUploadBatchViewGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * ResimageuploadcontrollerApi - fetch parameter creator
 */
export declare const ResimageuploadcontrollerApiFetchParamCreactor: {
    resImageUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): FetchArgs;
    resImageUploadBatchUpdatePost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
        assetsId?: number[];
    }): FetchArgs;
    resImageUploadCreatePost(params: {
        resImageUpload: ResImageUpload;
    }): FetchArgs;
    resImageUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): FetchArgs;
    resImageUploadFolderUploadsIdGet(params: {
        id: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadIdExifGet(params: {
        id: number;
    }): FetchArgs;
    resImageUploadListGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadListPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadMyFolderUploadGet(params: {
        folderId: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): FetchArgs;
    resImageUploadMyUploadGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): FetchArgs;
    resImageUploadMyUploadPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): FetchArgs;
    resImageUploadRotateIdGet(params: {
        id: number;
        angle?: number;
    }): FetchArgs;
    resImageUploadTestResizeIdGet(params: {
        id: number;
        heigth?: number;
        width?: number;
    }): FetchArgs;
    resImageUploadUpdateIdPost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
    }): FetchArgs;
    resImageUploadViewIdGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResimageuploadcontrollerApi - functional programming interface
 */
export declare const ResimageuploadcontrollerApiFp: {
    resImageUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadBatchUpdatePost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
        assetsId?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadCreatePost(params: {
        resImageUpload: ResImageUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadFolderUploadsIdGet(params: {
        id: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadIdExifGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<ExifEntity>;
    resImageUploadListGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadListPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMyFolderUploadGet(params: {
        folderId: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMyUploadGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMyUploadPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadRotateIdGet(params: {
        id: number;
        angle?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadTestResizeIdGet(params: {
        id: number;
        heigth?: number;
        width?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadUpdateIdPost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadViewIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResimageuploadcontrollerApi - object-oriented interface
 */
export declare class ResimageuploadcontrollerApi extends BaseAPI {
    /**
     * delete
     * @param folderId folderId
     * @param ids ids
     */
    resImageUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: Array<number>;
    }): Promise<any>;
    /**
     * batchUpdate
     * @param resImageUpload resImageUpload
     * @param userId userId
     * @param assetsId assetsId
     */
    resImageUploadBatchUpdatePost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
        assetsId?: Array<number>;
    }): Promise<any>;
    /**
     * create
     * @param resImageUpload resImageUpload
     */
    resImageUploadCreatePost(params: {
        resImageUpload: ResImageUpload;
    }): Promise<any>;
    /**
     * del
     * @param id id
     * @param folderId folderId
     */
    resImageUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): Promise<any>;
    /**
     * folderUploads
     * 取得目录已有的上传图片列表,不区分是哪个用户上传的
     * @param id id
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadFolderUploadsIdGet(params: {
        id: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * /{id}/exif
     * 获取单张图片exif信息
     * @param id id
     */
    resImageUploadIdExifGet(params: {
        id: number;
    }): Promise<ExifEntity>;
    /**
     * list
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadListGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * list
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadListPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * myFolderUpload
     * 取得目录已有的且是当前用户上传图片列表
     * @param folderId folderId
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param userId userId
     */
    resImageUploadMyFolderUploadGet(params: {
        folderId: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    /**
     * list
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param userId userId
     */
    resImageUploadMyUploadGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    /**
     * list
     * @param resImageUpload resImageUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param userId userId
     */
    resImageUploadMyUploadPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    /**
     * /rotate
     * 顺时针旋转图片,默认顺时针90°；执行完成后，原图，缩略图，1024图均旋转。
     * @param id id
     * @param angle angle
     */
    resImageUploadRotateIdGet(params: {
        id: number;
        angle?: number;
    }): Promise<any>;
    /**
     * testResize
     * @param id id
     * @param heigth heigth
     * @param width width
     */
    resImageUploadTestResizeIdGet(params: {
        id: number;
        heigth?: number;
        width?: number;
    }): Promise<any>;
    /**
     * update
     * @param resImageUpload resImageUpload
     * @param userId userId
     */
    resImageUploadUpdateIdPost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resImageUploadViewIdGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResimageuploadcontrollerApi - factory interface
 */
export declare const ResimageuploadcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resImageUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): Promise<any>;
    resImageUploadBatchUpdatePost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
        assetsId?: number[];
    }): Promise<any>;
    resImageUploadCreatePost(params: {
        resImageUpload: ResImageUpload;
    }): Promise<any>;
    resImageUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): Promise<any>;
    resImageUploadFolderUploadsIdGet(params: {
        id: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadIdExifGet(params: {
        id: number;
    }): Promise<ExifEntity>;
    resImageUploadListGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadListPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadMyFolderUploadGet(params: {
        folderId: number;
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    resImageUploadMyUploadGet(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    resImageUploadMyUploadPost(params: {
        resImageUpload?: ResImageUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    resImageUploadRotateIdGet(params: {
        id: number;
        angle?: number;
    }): Promise<any>;
    resImageUploadTestResizeIdGet(params: {
        id: number;
        heigth?: number;
        width?: number;
    }): Promise<any>;
    resImageUploadUpdateIdPost(params: {
        resImageUpload: ResImageUpload;
        userId?: string;
    }): Promise<any>;
    resImageUploadViewIdGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * ResimageuploadmetacontrollerApi - fetch parameter creator
 */
export declare const ResimageuploadmetacontrollerApiFetchParamCreactor: {
    resImageUploadMetaCreatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): FetchArgs;
    resImageUploadMetaDeletePost(params: {
        ids: any;
    }): FetchArgs;
    resImageUploadMetaListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): FetchArgs;
    resImageUploadMetaListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): FetchArgs;
    resImageUploadMetaPageListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadMetaPageListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadMetaUpdatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): FetchArgs;
    resImageUploadMetaViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResimageuploadmetacontrollerApi - functional programming interface
 */
export declare const ResimageuploadmetacontrollerApiFp: {
    resImageUploadMetaCreatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaPageListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaPageListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaUpdatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadMetaViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResimageuploadmetacontrollerApi - object-oriented interface
 */
export declare class ResimageuploadmetacontrollerApi extends BaseAPI {
    /**
     * create
     * @param resImageUploadMeta resImageUploadMeta
     */
    resImageUploadMetaCreatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    resImageUploadMetaDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadMeta resImageUploadMeta
     */
    resImageUploadMetaListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadMeta resImageUploadMeta
     */
    resImageUploadMetaListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadMeta resImageUploadMeta
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadMetaPageListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadMeta resImageUploadMeta
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadMetaPageListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param resImageUploadMeta resImageUploadMeta
     */
    resImageUploadMetaUpdatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resImageUploadMetaViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResimageuploadmetacontrollerApi - factory interface
 */
export declare const ResimageuploadmetacontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resImageUploadMetaCreatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): Promise<any>;
    resImageUploadMetaDeletePost(params: {
        ids: any;
    }): Promise<any>;
    resImageUploadMetaListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): Promise<any>;
    resImageUploadMetaListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
    }): Promise<any>;
    resImageUploadMetaPageListGet(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadMetaPageListPost(params: {
        resImageUploadMeta?: ResImageUploadMeta;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadMetaUpdatePost(params: {
        resImageUploadMeta: ResImageUploadMeta;
    }): Promise<any>;
    resImageUploadMetaViewGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * ResimageuploadreleasecontrollerApi - fetch parameter creator
 */
export declare const ResimageuploadreleasecontrollerApiFetchParamCreactor: {
    resImageUploadReleaseCreatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): FetchArgs;
    resImageUploadReleaseDeletePost(params: {
        ids: any;
    }): FetchArgs;
    resImageUploadReleaseListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): FetchArgs;
    resImageUploadReleaseListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): FetchArgs;
    resImageUploadReleasePageListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadReleasePageListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resImageUploadReleaseUpdatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): FetchArgs;
    resImageUploadReleaseViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResimageuploadreleasecontrollerApi - functional programming interface
 */
export declare const ResimageuploadreleasecontrollerApiFp: {
    resImageUploadReleaseCreatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleaseDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleaseListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleaseListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleasePageListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleasePageListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleaseUpdatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resImageUploadReleaseViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResimageuploadreleasecontrollerApi - object-oriented interface
 */
export declare class ResimageuploadreleasecontrollerApi extends BaseAPI {
    /**
     * create
     * @param resImageUploadRelease resImageUploadRelease
     */
    resImageUploadReleaseCreatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    resImageUploadReleaseDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadRelease resImageUploadRelease
     */
    resImageUploadReleaseListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): Promise<any>;
    /**
     * list
     * @param resImageUploadRelease resImageUploadRelease
     */
    resImageUploadReleaseListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadRelease resImageUploadRelease
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadReleasePageListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param resImageUploadRelease resImageUploadRelease
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resImageUploadReleasePageListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param resImageUploadRelease resImageUploadRelease
     */
    resImageUploadReleaseUpdatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resImageUploadReleaseViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResimageuploadreleasecontrollerApi - factory interface
 */
export declare const ResimageuploadreleasecontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resImageUploadReleaseCreatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): Promise<any>;
    resImageUploadReleaseDeletePost(params: {
        ids: any;
    }): Promise<any>;
    resImageUploadReleaseListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): Promise<any>;
    resImageUploadReleaseListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
    }): Promise<any>;
    resImageUploadReleasePageListGet(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadReleasePageListPost(params: {
        resImageUploadRelease?: ResImageUploadRelease;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resImageUploadReleaseUpdatePost(params: {
        resImageUploadRelease: ResImageUploadRelease;
    }): Promise<any>;
    resImageUploadReleaseViewGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * ResrootfolderscontrollerApi - fetch parameter creator
 */
export declare const ResrootfolderscontrollerApiFetchParamCreactor: {
    resRootFoldersCreatePost(params: {
        resRootFolders: ResRootFolders;
    }): FetchArgs;
    resRootFoldersDeletePost(params: {
        ids: any;
    }): FetchArgs;
    resRootFoldersListGet(params: {
        resRootFolders?: ResRootFolders;
    }): FetchArgs;
    resRootFoldersListPost(params: {
        resRootFolders?: ResRootFolders;
    }): FetchArgs;
    resRootFoldersPageListGet(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resRootFoldersPageListPost(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    resRootFoldersUpdatePost(params: {
        resRootFolders: ResRootFolders;
    }): FetchArgs;
    resRootFoldersViewGet(params: {
        id: {
            [key: string]: string;
        };
    }): FetchArgs;
};
/**
 * ResrootfolderscontrollerApi - functional programming interface
 */
export declare const ResrootfolderscontrollerApiFp: {
    resRootFoldersCreatePost(params: {
        resRootFolders: ResRootFolders;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersListGet(params: {
        resRootFolders?: ResRootFolders;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersListPost(params: {
        resRootFolders?: ResRootFolders;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersPageListGet(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersPageListPost(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersUpdatePost(params: {
        resRootFolders: ResRootFolders;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resRootFoldersViewGet(params: {
        id: {
            [key: string]: string;
        };
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResrootfolderscontrollerApi - object-oriented interface
 */
export declare class ResrootfolderscontrollerApi extends BaseAPI {
    /**
     * create
     * @param resRootFolders resRootFolders
     */
    resRootFoldersCreatePost(params: {
        resRootFolders: ResRootFolders;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    resRootFoldersDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param resRootFolders resRootFolders
     */
    resRootFoldersListGet(params: {
        resRootFolders?: ResRootFolders;
    }): Promise<any>;
    /**
     * list
     * @param resRootFolders resRootFolders
     */
    resRootFoldersListPost(params: {
        resRootFolders?: ResRootFolders;
    }): Promise<any>;
    /**
     * pageList
     * @param resRootFolders resRootFolders
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resRootFoldersPageListGet(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param resRootFolders resRootFolders
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    resRootFoldersPageListPost(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param resRootFolders resRootFolders
     */
    resRootFoldersUpdatePost(params: {
        resRootFolders: ResRootFolders;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resRootFoldersViewGet(params: {
        id: {
            [key: string]: string;
        };
    }): Promise<any>;
}
/**
 * ResrootfolderscontrollerApi - factory interface
 */
export declare const ResrootfolderscontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resRootFoldersCreatePost(params: {
        resRootFolders: ResRootFolders;
    }): Promise<any>;
    resRootFoldersDeletePost(params: {
        ids: any;
    }): Promise<any>;
    resRootFoldersListGet(params: {
        resRootFolders?: ResRootFolders;
    }): Promise<any>;
    resRootFoldersListPost(params: {
        resRootFolders?: ResRootFolders;
    }): Promise<any>;
    resRootFoldersPageListGet(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resRootFoldersPageListPost(params: {
        resRootFolders?: ResRootFolders;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    resRootFoldersUpdatePost(params: {
        resRootFolders: ResRootFolders;
    }): Promise<any>;
    resRootFoldersViewGet(params: {
        id: {
            [key: string]: string;
        };
    }): Promise<any>;
};
/**
 * ResvideocontrollerApi - fetch parameter creator
 */
export declare const ResvideocontrollerApiFetchParamCreactor: {
    videosDelete(params: {
        ids: number[];
    }): FetchArgs;
    videosIdGet(params: {
        id: number;
    }): FetchArgs;
    videosIdPut(params: {
        id: number;
        video: VideoDetail;
    }): FetchArgs;
    videosPageListPost(params: {
        resVideo?: ResVideo;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    videosPost(params: {
        videoDetail: VideoDetail;
    }): FetchArgs;
};
/**
 * ResvideocontrollerApi - functional programming interface
 */
export declare const ResvideocontrollerApiFp: {
    videosDelete(params: {
        ids: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    videosIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<VideoDetail>;
    videosIdPut(params: {
        id: number;
        video: VideoDetail;
    }): (fetch: FetchAPI, basePath?: string) => Promise<number>;
    videosPageListPost(params: {
        resVideo?: ResVideo;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    videosPost(params: {
        videoDetail: VideoDetail;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResvideocontrollerApi - object-oriented interface
 */
export declare class ResvideocontrollerApi extends BaseAPI {
    /**
     * /
     * 批量删除视频
     * @param ids ids
     */
    videosDelete(params: {
        ids: Array<number>;
    }): Promise<any>;
    /**
     * /{id}
     * 获取视频信息
     * @param id id
     */
    videosIdGet(params: {
        id: number;
    }): Promise<VideoDetail>;
    /**
     * /{id}
     * 修改单个视频
     * @param id id
     * @param video video
     */
    videosIdPut(params: {
        id: number;
        video: VideoDetail;
    }): Promise<number>;
    /**
     * pageList
     * 列表信息
     * @param resVideo resVideo
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    videosPageListPost(params: {
        resVideo?: ResVideo;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * /
     * 创建对象（内部测试用）
     * @param videoDetail videoDetail
     */
    videosPost(params: {
        videoDetail: VideoDetail;
    }): Promise<any>;
}
/**
 * ResvideocontrollerApi - factory interface
 */
export declare const ResvideocontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    videosDelete(params: {
        ids: number[];
    }): Promise<any>;
    videosIdGet(params: {
        id: number;
    }): Promise<VideoDetail>;
    videosIdPut(params: {
        id: number;
        video: VideoDetail;
    }): Promise<number>;
    videosPageListPost(params: {
        resVideo?: ResVideo;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    videosPost(params: {
        videoDetail: VideoDetail;
    }): Promise<any>;
};
/**
 * ResvideouploadcontrollerApi - fetch parameter creator
 */
export declare const ResvideouploadcontrollerApiFetchParamCreactor: {
    resVideoUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): FetchArgs;
    resVideoUploadCreatePost(params: {
        resVideoUpload: ResVideoUpload;
    }): FetchArgs;
    resVideoUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): FetchArgs;
    resVideoUploadGetOrigURLIdGet(params: {
        id: number;
        userId?: string;
    }): FetchArgs;
    resVideoUploadGetOrigURLIdPost(params: {
        id: number;
        userId?: string;
    }): FetchArgs;
    resVideoUploadMyFolderUploadGet(params: {
        folderId: number;
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): FetchArgs;
    resVideoUploadUnFoldersGet(params: {
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): FetchArgs;
    resVideoUploadUpdateIdPost(params: {
        id: number;
        resVideoUpload: ResVideoUpload;
        userId?: string;
    }): FetchArgs;
    resVideoUploadViewIdGet(params: {
        id: number;
    }): FetchArgs;
    resVideoUploadViewIdPost(params: {
        id: number;
    }): FetchArgs;
};
/**
 * ResvideouploadcontrollerApi - functional programming interface
 */
export declare const ResvideouploadcontrollerApiFp: {
    resVideoUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadCreatePost(params: {
        resVideoUpload: ResVideoUpload;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadGetOrigURLIdGet(params: {
        id: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadGetOrigURLIdPost(params: {
        id: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadMyFolderUploadGet(params: {
        folderId: number;
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadUnFoldersGet(params: {
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadUpdateIdPost(params: {
        id: number;
        resVideoUpload: ResVideoUpload;
        userId?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadViewIdGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    resVideoUploadViewIdPost(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * ResvideouploadcontrollerApi - object-oriented interface
 */
export declare class ResvideouploadcontrollerApi extends BaseAPI {
    /**
     * delete
     * @param folderId folderId
     * @param ids ids
     */
    resVideoUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: Array<number>;
    }): Promise<any>;
    /**
     * create
     * @param resVideoUpload resVideoUpload
     */
    resVideoUploadCreatePost(params: {
        resVideoUpload: ResVideoUpload;
    }): Promise<any>;
    /**
     * del
     * @param id id
     * @param folderId folderId
     */
    resVideoUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): Promise<any>;
    /**
     * genOrigURL
     * @param id id
     * @param userId userId
     */
    resVideoUploadGetOrigURLIdGet(params: {
        id: number;
        userId?: string;
    }): Promise<any>;
    /**
     * genOrigURL
     * @param id id
     * @param userId userId
     */
    resVideoUploadGetOrigURLIdPost(params: {
        id: number;
        userId?: string;
    }): Promise<any>;
    /**
     * myFolderUpload
     * 取得目录已有的且是当前用户上传视频列表
     * @param folderId folderId
     * @param resVideoUpload resVideoUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param userId userId
     */
    resVideoUploadMyFolderUploadGet(params: {
        folderId: number;
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    /**
     * listUnFolder
     * 取得无归属目录且是当前用户上传视频列表(FTP上传的视频)
     * @param resVideoUpload resVideoUpload
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @param userId userId
     */
    resVideoUploadUnFoldersGet(params: {
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    /**
     * update
     * @param id id
     * @param resVideoUpload resVideoUpload
     * @param userId userId
     */
    resVideoUploadUpdateIdPost(params: {
        id: number;
        resVideoUpload: ResVideoUpload;
        userId?: string;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resVideoUploadViewIdGet(params: {
        id: number;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    resVideoUploadViewIdPost(params: {
        id: number;
    }): Promise<any>;
}
/**
 * ResvideouploadcontrollerApi - factory interface
 */
export declare const ResvideouploadcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    resVideoUploadBatchDelByIdsFolderIdGet(params: {
        folderId: number;
        ids?: number[];
    }): Promise<any>;
    resVideoUploadCreatePost(params: {
        resVideoUpload: ResVideoUpload;
    }): Promise<any>;
    resVideoUploadDelByIdFolderIdGet(params: {
        id: number;
        folderId: number;
    }): Promise<any>;
    resVideoUploadGetOrigURLIdGet(params: {
        id: number;
        userId?: string;
    }): Promise<any>;
    resVideoUploadGetOrigURLIdPost(params: {
        id: number;
        userId?: string;
    }): Promise<any>;
    resVideoUploadMyFolderUploadGet(params: {
        folderId: number;
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    resVideoUploadUnFoldersGet(params: {
        resVideoUpload?: ResVideoUpload;
        pageNum?: number;
        pageSize?: number;
        userId?: string;
    }): Promise<any>;
    resVideoUploadUpdateIdPost(params: {
        id: number;
        resVideoUpload: ResVideoUpload;
        userId?: string;
    }): Promise<any>;
    resVideoUploadViewIdGet(params: {
        id: number;
    }): Promise<any>;
    resVideoUploadViewIdPost(params: {
        id: number;
    }): Promise<any>;
};
/**
 * SensitivewordcontrollerApi - fetch parameter creator
 */
export declare const SensitivewordcontrollerApiFetchParamCreactor: {
    sensitiveWordCreatePost(params: {
        sensitiveWord: SensitiveWord;
    }): FetchArgs;
    sensitiveWordDeletePost(params: {
        ids: any;
    }): FetchArgs;
    sensitiveWordListGet(params: {
        sensitiveWord?: SensitiveWord;
    }): FetchArgs;
    sensitiveWordListPost(params: {
        sensitiveWord?: SensitiveWord;
    }): FetchArgs;
    sensitiveWordPageListGet(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    sensitiveWordPageListPost(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    sensitiveWordUpdatePost(params: {
        sensitiveWord: SensitiveWord;
    }): FetchArgs;
    sensitiveWordViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * SensitivewordcontrollerApi - functional programming interface
 */
export declare const SensitivewordcontrollerApiFp: {
    sensitiveWordCreatePost(params: {
        sensitiveWord: SensitiveWord;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordListGet(params: {
        sensitiveWord?: SensitiveWord;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordListPost(params: {
        sensitiveWord?: SensitiveWord;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordPageListGet(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordPageListPost(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordUpdatePost(params: {
        sensitiveWord: SensitiveWord;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    sensitiveWordViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * SensitivewordcontrollerApi - object-oriented interface
 */
export declare class SensitivewordcontrollerApi extends BaseAPI {
    /**
     * create
     * @param sensitiveWord sensitiveWord
     */
    sensitiveWordCreatePost(params: {
        sensitiveWord: SensitiveWord;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    sensitiveWordDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param sensitiveWord sensitiveWord
     */
    sensitiveWordListGet(params: {
        sensitiveWord?: SensitiveWord;
    }): Promise<any>;
    /**
     * list
     * @param sensitiveWord sensitiveWord
     */
    sensitiveWordListPost(params: {
        sensitiveWord?: SensitiveWord;
    }): Promise<any>;
    /**
     * pageList
     * @param sensitiveWord sensitiveWord
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    sensitiveWordPageListGet(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param sensitiveWord sensitiveWord
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    sensitiveWordPageListPost(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param sensitiveWord sensitiveWord
     */
    sensitiveWordUpdatePost(params: {
        sensitiveWord: SensitiveWord;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    sensitiveWordViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * SensitivewordcontrollerApi - factory interface
 */
export declare const SensitivewordcontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    sensitiveWordCreatePost(params: {
        sensitiveWord: SensitiveWord;
    }): Promise<any>;
    sensitiveWordDeletePost(params: {
        ids: any;
    }): Promise<any>;
    sensitiveWordListGet(params: {
        sensitiveWord?: SensitiveWord;
    }): Promise<any>;
    sensitiveWordListPost(params: {
        sensitiveWord?: SensitiveWord;
    }): Promise<any>;
    sensitiveWordPageListGet(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    sensitiveWordPageListPost(params: {
        sensitiveWord?: SensitiveWord;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    sensitiveWordUpdatePost(params: {
        sensitiveWord: SensitiveWord;
    }): Promise<any>;
    sensitiveWordViewGet(params: {
        id: number;
    }): Promise<any>;
};
/**
 * StatisticsApi - fetch parameter creator
 */
export declare const StatisticsApiFetchParamCreactor: {
    statisticsCountAssetsByFilterGet(params: {
        providerId?: string;
        onlineDate?: Date;
        onlineDateEnd?: Date;
        uploadStateType?: string;
        reviewStateType?: string;
        onlineStateType?: string;
    }): FetchArgs;
};
/**
 * StatisticsApi - functional programming interface
 */
export declare const StatisticsApiFp: {
    statisticsCountAssetsByFilterGet(params: {
        providerId?: string;
        onlineDate?: Date;
        onlineDateEnd?: Date;
        uploadStateType?: string;
        reviewStateType?: string;
        onlineStateType?: string;
    }): (fetch: FetchAPI, basePath?: string) => Promise<{
        [key: string]: any;
    }>;
};
/**
 * StatisticsApi - object-oriented interface
 */
export declare class StatisticsApi extends BaseAPI {
    /**
     * /countAssetsByFilter
     * 根据filter 计算个数
     * @param providerId providerId
     * @param onlineDate onlineDate
     * @param onlineDateEnd onlineDateEnd
     * @param uploadStateType uploadStateType
     * @param reviewStateType reviewStateType
     * @param onlineStateType onlineStateType
     */
    statisticsCountAssetsByFilterGet(params: {
        providerId?: string;
        onlineDate?: Date;
        onlineDateEnd?: Date;
        uploadStateType?: string;
        reviewStateType?: string;
        onlineStateType?: string;
    }): Promise<{
        [key: string]: any;
    }>;
}
/**
 * StatisticsApi - factory interface
 */
export declare const StatisticsApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    statisticsCountAssetsByFilterGet(params: {
        providerId?: string;
        onlineDate?: Date;
        onlineDateEnd?: Date;
        uploadStateType?: string;
        reviewStateType?: string;
        onlineStateType?: string;
    }): Promise<{
        [key: string]: any;
    }>;
};
/**
 * UploadhandlercontrollerApi - fetch parameter creator
 */
export declare const UploadhandlercontrollerApiFetchParamCreactor: {
    uploadHandlerBatchUploadPost(params: {
        file: any[];
        resType?: number;
        userId?: string;
        folderId?: number;
    }): FetchArgs;
    uploadHandlerFileDelete(): FetchArgs;
    uploadHandlerFileGet(): FetchArgs;
    uploadHandlerFileHead(): FetchArgs;
    uploadHandlerFileOptions(): FetchArgs;
    uploadHandlerFilePatch(): FetchArgs;
    uploadHandlerFilePost(): FetchArgs;
    uploadHandlerFilePut(): FetchArgs;
    uploadHandlerUploadPost(params: {
        file: any;
        resType?: number;
    }): FetchArgs;
};
/**
 * UploadhandlercontrollerApi - functional programming interface
 */
export declare const UploadhandlercontrollerApiFp: {
    uploadHandlerBatchUploadPost(params: {
        file: any[];
        resType?: number;
        userId?: string;
        folderId?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    uploadHandlerFileDelete(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFileGet(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFileHead(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFileOptions(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFilePatch(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFilePost(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerFilePut(): (fetch: FetchAPI, basePath?: string) => Promise<string>;
    uploadHandlerUploadPost(params: {
        file: any;
        resType?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<string>;
};
/**
 * UploadhandlercontrollerApi - object-oriented interface
 */
export declare class UploadhandlercontrollerApi extends BaseAPI {
    /**
     * 批量上传资源接口
     * @param file file
     * @param resType resType
     * @param userId userId
     * @param folderId folderId
     */
    uploadHandlerBatchUploadPost(params: {
        file: Array<any>;
        resType?: number;
        userId?: string;
        folderId?: number;
    }): Promise<any>;
    /**
     * file
     */
    uploadHandlerFileDelete(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFileGet(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFileHead(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFileOptions(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFilePatch(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFilePost(): Promise<string>;
    /**
     * file
     */
    uploadHandlerFilePut(): Promise<string>;
    /**
     * uploadImgs
     * @param file file
     * @param resType resType
     */
    uploadHandlerUploadPost(params: {
        file: any;
        resType?: number;
    }): Promise<string>;
}
/**
 * UploadhandlercontrollerApi - factory interface
 */
export declare const UploadhandlercontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    uploadHandlerBatchUploadPost(params: {
        file: any[];
        resType?: number;
        userId?: string;
        folderId?: number;
    }): Promise<any>;
    uploadHandlerFileDelete(): Promise<string>;
    uploadHandlerFileGet(): Promise<string>;
    uploadHandlerFileHead(): Promise<string>;
    uploadHandlerFileOptions(): Promise<string>;
    uploadHandlerFilePatch(): Promise<string>;
    uploadHandlerFilePost(): Promise<string>;
    uploadHandlerFilePut(): Promise<string>;
    uploadHandlerUploadPost(params: {
        file: any;
        resType?: number;
    }): Promise<string>;
};
/**
 * WaterrulecontrollerApi - fetch parameter creator
 */
export declare const WaterrulecontrollerApiFetchParamCreactor: {
    waterRuleCreatePost(params: {
        waterRule: WaterRule;
    }): FetchArgs;
    waterRuleDeletePost(params: {
        ids: any;
    }): FetchArgs;
    waterRuleListGet(params: {
        waterRule?: WaterRule;
    }): FetchArgs;
    waterRuleListPost(params: {
        waterRule?: WaterRule;
    }): FetchArgs;
    waterRulePageListGet(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    waterRulePageListPost(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): FetchArgs;
    waterRuleUpdatePost(params: {
        waterRule: WaterRule;
    }): FetchArgs;
    waterRuleViewGet(params: {
        id: number;
    }): FetchArgs;
};
/**
 * WaterrulecontrollerApi - functional programming interface
 */
export declare const WaterrulecontrollerApiFp: {
    waterRuleCreatePost(params: {
        waterRule: WaterRule;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRuleDeletePost(params: {
        ids: any;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRuleListGet(params: {
        waterRule?: WaterRule;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRuleListPost(params: {
        waterRule?: WaterRule;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRulePageListGet(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRulePageListPost(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRuleUpdatePost(params: {
        waterRule: WaterRule;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
    waterRuleViewGet(params: {
        id: number;
    }): (fetch: FetchAPI, basePath?: string) => Promise<any>;
};
/**
 * WaterrulecontrollerApi - object-oriented interface
 */
export declare class WaterrulecontrollerApi extends BaseAPI {
    /**
     * create
     * @param waterRule waterRule
     */
    waterRuleCreatePost(params: {
        waterRule: WaterRule;
    }): Promise<any>;
    /**
     * delete
     * @param ids ids
     */
    waterRuleDeletePost(params: {
        ids: any;
    }): Promise<any>;
    /**
     * list
     * @param waterRule waterRule
     */
    waterRuleListGet(params: {
        waterRule?: WaterRule;
    }): Promise<any>;
    /**
     * list
     * @param waterRule waterRule
     */
    waterRuleListPost(params: {
        waterRule?: WaterRule;
    }): Promise<any>;
    /**
     * pageList
     * @param waterRule waterRule
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    waterRulePageListGet(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * pageList
     * @param waterRule waterRule
     * @param pageNum pageNum
     * @param pageSize pageSize
     */
    waterRulePageListPost(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    /**
     * update
     * @param waterRule waterRule
     */
    waterRuleUpdatePost(params: {
        waterRule: WaterRule;
    }): Promise<any>;
    /**
     * view
     * @param id id
     */
    waterRuleViewGet(params: {
        id: number;
    }): Promise<any>;
}
/**
 * WaterrulecontrollerApi - factory interface
 */
export declare const WaterrulecontrollerApiFactory: (fetch?: FetchAPI, basePath?: string) => {
    waterRuleCreatePost(params: {
        waterRule: WaterRule;
    }): Promise<any>;
    waterRuleDeletePost(params: {
        ids: any;
    }): Promise<any>;
    waterRuleListGet(params: {
        waterRule?: WaterRule;
    }): Promise<any>;
    waterRuleListPost(params: {
        waterRule?: WaterRule;
    }): Promise<any>;
    waterRulePageListGet(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    waterRulePageListPost(params: {
        waterRule?: WaterRule;
        pageNum?: number;
        pageSize?: number;
    }): Promise<any>;
    waterRuleUpdatePost(params: {
        waterRule: WaterRule;
    }): Promise<any>;
    waterRuleViewGet(params: {
        id: number;
    }): Promise<any>;
};
