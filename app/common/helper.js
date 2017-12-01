const helper = {
  Pagination: {
    // 分页辅助工具
    // allItems 所有分页项的列表
    // current 当前页面(从１开始)
    // pageSize 每页大小
    // return 当前分页所包含的项目列表
    getPageItems: (allItems, current, pageSize) => {
      return allItems.slice((current-1) * pageSize, current * pageSize);
    },

    // 分页辅助工具
    // allItems 所有分页项的列表
    // pageSize 每页大小
    // 分页数量
    getPageCount: (allItems, pageSize) => {
      const total = allItems.length;
      return Math.ceil(total/pageSize) || 0;
    },
  },

  ASSET_TYPE: {
    IMG: 1,
    VIDEO: 2,
    AUDIO: 3,
    DOC: 4,
    ALBUM: 5,
  },

  ASSET_TYPE_STR: {
    1: 'IMG',
    2: 'VIDEO',
    3: 'AUDIO',
    4: 'DOC',
    5: 'ALBUM',
  },

  getAssetTypeByMime: (mime) => {
    // console.log('Try to upload a file, mime:', mime);
    let resType;
    switch(mime) {
    case 'video/mp4':
      resType = helper.ASSET_TYPE.VIDEO;
      break;
    case 'image/png':
      resType = helper.ASSET_TYPE.IMG;
      break;
    case 'image/jpeg':
      resType = helper.ASSET_TYPE.IMG;
      break;
    case 'audio/mp3':
      resType = helper.ASSET_TYPE.AUDIO;
      break;
    default:
      resType = helper.ASSET_TYPE.DOC;
      break;
    }
    // console.log('asset Type:', resType);
    return resType;
  },

  getAssetChineseType: (type) => {
    return {1: '图片', 2: '视频', 3: '音频', 4: '其他'}[type] || '未知类型';
  },

  formatURL: (rawUrl) => {
    if (!rawUrl) return '';
    if (rawUrl.startsWith('https:') || rawUrl.startsWith('http:'))
      return rawUrl;
    return '//' + rawUrl;
  },

  //对于不同类型的文件对象，格式化数据模型
  // 由于获取File对象列表的接口有两个，返回的数据格式不同，
  // 再次做数据的格式化
  formatFile: (file) => {
    if (!file) return null;
    // console.debug('before format', file);
    const badges = file.badges; //
    const shadeItems = file.shadeItems;//
    if (file.basic || file.detail) {
      // console.debug('Format File from FolderItem');
      file = Object.assign(file.detail, file.basic);
      switch(file.assetType) {
      case helper.ASSET_TYPE.IMG:
        file.ossImgPath = helper.formatURL(file.oss400);
        break;
      case helper.ASSET_TYPE.VIDEO:
        file.ossImgPath = helper.formatURL(file.coverageOssid);
        file.ossVideoPath = helper.formatURL(file.previewOssid);
        break;
      default:
        file.ossImgPath = helper.formatURL(file.oss400); //Shound not be here.
      }
    } else { // File Info from batchUpload
      // console.debug('Format File from batchUpload');
      switch(file.assetType) {
      case helper.ASSET_TYPE.IMG:
        if (file.imgUploads) {
          file.ossImgPath = helper.formatURL(file.imgUploads.oss1024);
          file = Object.assign(file.imgUploads, file);
        }
        break;
      case helper.ASSET_TYPE.VIDEO:
        if (file.videoUpload) {
          file.ossImgPath = helper.formatURL(file.videoUpload.coverageOssid);
          file.ossVideoPath = helper.formatURL(file.videoUpload.previewOssid);
          file = Object.assign(file.videoUpload, file);
        }
        // uploadState == 6 正在转码 uploadState == 1 && file.coverageOssid 上传成功且没有生成海报图片， 认为都是
        // 正在转码的状态
        if (file.uploadState == 6 || file.uploadState == 1 && !file.coverageOssid) {
          file.isVideoTranscoding = true;
          delete file.isUploading;
        }
        break;
      case helper.ASSET_TYPE.AUDIO:
        if (file.audioUpload) {
          file.ossImgPath = helper.formatURL(file.audioUpload.coverageOssid);
          file.ossVideoPath = helper.formatURL(file.audioUpload.ossId);
          file = Object.assign(file.audioUpload, file);
        }
        break;
      default:
        break;
      }
    }
    file.badges = badges;
    file.shadeItems = shadeItems;
    // console.debug('after format', file);
    return file;
  },

  getFolderPaths: (folders, permissions) => {
    if (!folders || !folders.length) return new Set();
    let paths = new Set();

    for (let key in permissions) {
      let hasPermissions = folders.find(folder => folder.id == key && permissions[key].includes('view_assets'));
      if(hasPermissions) {
        hasPermissions.seq
        .split(',')
        .reduce((paths, item) => paths.add(item), paths);
      }
    }

    return paths;
  },
};

export default helper;
