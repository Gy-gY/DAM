import {API, baseAPI, customFetch} from '../apis';
const {OauthClientApiFp} = API.nodeAPI;

export const CREATE_API_CLIENT_REQUEST = 'CREATE_API_CLIENT_REQUEST';
export const CREATE_API_CLIENT_SUCCESS = 'CREATE_API_CLIENT_SUCCESS';
export const CREATE_API_CLIENT_FAILURE = 'CREATE_API_CLIENT_FAILURE';

export const DELETE_API_CLIENT_REQUEST = 'DELETE_API_CLIENT_REQUEST';
export const DELETE_API_CLIENT_SUCCESS = 'DELETE_API_CLIENT_SUCCESS';
export const DELETE_API_CLIENT_FAILURE = 'DELETE_API_CLIENT_FAILURE';

export const EDIT_API_CLIENT_REQUEST = 'EDIT_API_CLIENT_REQUEST';
export const EDIT_API_CLIENT_SUCCESS = 'EDIT_API_CLIENT_SUCCESS';
export const EDIT_API_CLIENT_FAILURE = 'EDIT_API_CLIENT_FAILURE';

export const LIST_API_CLIENT_REQUEST = 'LIST_API_CLIENT_REQUEST';
export const LIST_API_CLIENT_SUCCESS = 'LIST_API_CLIENT_SUCCESS';
export const LIST_API_CLIENT_FAILURE = 'LIST_API_CLIENT_FAILURE';

export const USERGROUP_LIST_SUCCESS = 'USERGROUP_LIST_SUCCESS';

export const createAPIClient = (params) => {
  return dispatch => {
    dispatch({
      type: CREATE_API_CLIENT_REQUEST,
    });
    OauthClientApiFp.oauthclientsPost({ oauth: params})(customFetch, baseAPI)
    .then(res => {
      dispatch({
        type: CREATE_API_CLIENT_SUCCESS,
        payload: {newClient: res},
      });
    });
  };
};

export const deleteAPIClient = (id) => {
  return dispatch => {
    OauthClientApiFp.oauthclientsIdDelete({id})(customFetch, baseAPI)
    .then(() => {
      dispatch({
        type: DELETE_API_CLIENT_SUCCESS,
        payload: {client: id},
      });
    });
  };
};

export const editAPIClient = () => {
};

export const listAPIClient = () => {
  return dispatch => {
    dispatch({
      type: LIST_API_CLIENT_REQUEST,
    });
    OauthClientApiFp.oauthclientsGet()(customFetch, baseAPI)
    .then(res => {
      dispatch({
        type: LIST_API_CLIENT_SUCCESS,
        payload: {
          clients: res,
        },
      });
    }).catch(err => {
      dispatch({
        type: LIST_API_CLIENT_FAILURE,
        payload: {},
        error: err,
      });
    });
  };
};
