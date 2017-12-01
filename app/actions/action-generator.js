export const genAsyncActions = (actionsArray) => {
  let actions = {};
  actionsArray.forEach((action) => {
    actions[action + '_SUCCESS'] = action + '_SUCCESS';
    actions[action + '_FAILURE'] = action + '_FAILURE';
    actions[action + '_REQUEST'] = action + '_REQUEST';
  });
  return actions;
};