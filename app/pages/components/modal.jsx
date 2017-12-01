import React					from 'react';
import {Modal}				from 'antd';
const confirm = Modal.confirm;
export function modal(alert) {
  const {type} = alert;
  if(type=='success') {
    Modal.success(alert);
  }else if(type=='form' || type=='table') {
    return (
			<Modal {...alert}>
				{alert.body}
			</Modal>);
  }else if(type=='confirm') {
    confirm(alert);
  }else if(type=='error') {
    Modal.error(alert);
  }else if(type=='warn') {
    Modal.warning({
      title: '警告',
      content: alert.content,
    });
  }

}
