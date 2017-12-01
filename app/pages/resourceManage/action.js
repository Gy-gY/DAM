import { notification } from 'antd';
import { API, baseAPI, customFetch } from '../../apis';
const { FoldersApiFp } = API.resourceAPI;
import update from 'immutability-helper';
const FoldersApi = API.resourceAPI.FoldersApiFp;

export const FETCH_FOLDERS_REQUEST = 'FETCH_FOLDERS_REQUEST';
export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE';


export function fetchFolders(parentId = 1) {
  return (dispatch, getState) => {
    let coutItems = () => Promise.resolve({});
    let param; 
    param = {id: parentId};
    coutItems = FoldersApi.foldersIdSubFoldersPost(param);
    dispatch({type: FETCH_FOLDERS_REQUEST});
    (coutItems)(customFetch, baseAPI)
    .then(dirs => {
      if(parentId!=1) {
        let oldDir = getState().resourceManage.folders;
        let newDir = update(oldDir, {$push: dirs});   
        dispatch({
          type: FETCH_FOLDERS_SUCCESS,
          folders:newDir,
        });
      }else {
        let dd = dirs;
        customFetch(`${baseAPI}/folders/viewVcgFolder`, {
          credentials: 'include',
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        }).then(resp=>resp.json().then(customDirs=>{
          customDirs.permissions = dirs[0].permissions;
          dd = update(dirs, {$push: [customDirs]});
          dispatch({
            type: FETCH_FOLDERS_SUCCESS,
            folders:dd,
          });
        })
      );
      }
    }).catch(err => dispatch({
      type: FETCH_FOLDERS_FAILURE,
      error: err,
    }));
  };
}