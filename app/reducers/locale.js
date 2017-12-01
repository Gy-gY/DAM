import { combineReducers } from 'redux';
function changeLocale(state = {
  language: 'zh',
}, action) {
  switch (action.type) {
  case 'CHANGE_LOCALE':
    return {language:action.locale};
  default:
    return state;
  }
}

const locale = combineReducers({
  changeLocale,
});

export default locale;
