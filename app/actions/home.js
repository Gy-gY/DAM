import {baseAPI, customFetch} from '../apis';
export const actionTypes = {
  'QUERY_INSTOCK_SUCCESS':'QUERY_INSTOCK_SUCCESS',
  'QUERY_MONTH_SUCCESS':'QUERY_MONTH_SUCCESS',
  'QUERY_PENDING_SUCCESS':'QUERY_PENDING_SUCCESS',
};

//查询入库数据
export function queryInstockMaterial(params) {
  let uploadStateType = params.uploadStateType;
  let reviewStateType = params.reviewStateType;
  let userId = params.userId;
  return (dispatch) => {
    customFetch(`${baseAPI}/statistics/countAssetsByFilter?providerId=${userId}&uploadStateType=${uploadStateType}&reviewStateType=${reviewStateType}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取权限失败！');
      }).then(data => dispatch(getInstockListSuccess(data)));
  };
}

function getInstockListSuccess(data) {
  return {
    type:actionTypes.QUERY_INSTOCK_SUCCESS,
    data:data,
  };
}

//查询入库数据
export function queryMonthMaterial(params) {
  let onlineDate = params.onlineDate;
  let uploadStateType = params.uploadStateType;
  let reviewStateType = params.reviewStateType;
  let userId = params.userId;
  return (dispatch) => {
    customFetch(`${baseAPI}/statistics/countAssetsByFilter?providerId=${userId}&onlineDate=${onlineDate}&uploadStateType=${uploadStateType}&reviewStateType=${reviewStateType}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取权限失败！');
      }).then(data => dispatch(getMonthMaterialListSuccess(data)));
  };
}

function getMonthMaterialListSuccess(data) {
  return {
    type:actionTypes.QUERY_MONTH_SUCCESS,
    data:data,
  };
}

//查询入库数据
export function queryPendingMaterial(params) {
  let uploadStateType = params.uploadStateType;
  let reviewStateType = params.reviewStateType;
  let userId = params.userId;
  return (dispatch) => {
    customFetch(`${baseAPI}/statistics/countAssetsByFilter?providerId=${userId}&uploadStateType=${uploadStateType}&reviewStateType=${reviewStateType}`, {
      credentials: 'include',
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        if (response.ok)
          return response.json();
        else
          throw new Error('获取权限失败！');
      }).then(data => dispatch(getPendingMaterialSuccess(data)));
  };
}

function getPendingMaterialSuccess(data) {
  return {
    type:actionTypes.QUERY_PENDING_SUCCESS,
    data:data,
  };
}
