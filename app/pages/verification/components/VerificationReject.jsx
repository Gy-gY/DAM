import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button} from 'antd';
import {editUserInfo} from '../../../actions';
const FormItem = Form.Item;
const createForm 					= Form.create;
class VerificationReject extends React.Component {
  constructor(props) {
    super(props);

  }
  static propTypes = {
    form: React.PropTypes.object,
    selectedImges: React.PropTypes.array,
    handlerSubmitReject: React.PropTypes.func,
    close: React.PropTypes.func,
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
          <Form>
            <Row gutter={16}>
              <Col md={26}>
                    <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 30 }}
                            hasFeedback
                            >
                            {getFieldDecorator('rejectReason', {
                              rules:[{required: false, width:'100px', message:'请输入驳回理由'}],
                            })(
                              <Input type='textarea' rows={8} placeholder='请输入驳回理由'/>
                            )}
                    </FormItem>
              </Col>
            </Row>
            <br/><br/>
              <FormItem wrapperCol={{ span: 18, offset: 9 }}>
                  <Button type="primary" htmlType="submit" onClick={this.saveRejctState.bind(this)}>确定</Button>&nbsp;&nbsp;
                  <Button onClick={this.close.bind(this)}>取消</Button>
              </FormItem>
          </Form>
      </div>
    );
  }

  close() {
    this.props.close();
  }

  saveRejctState() {
    let {selectedImges, handlerSubmitReject} = this.props;
    this.props.form.validateFields((error, values) => {
      if(error) {
        return false;
      }
      let params = {};
      Object.assign(params, {ids:selectedImges}, values);
      handlerSubmitReject(params);
    });
  }
}
function mapDispatchToProps(dispatch) {
  return {
    editUserInfo : (params) => editUserInfo(dispatch, params),
  };
}
const WrappedVerificationReject = createForm()(VerificationReject);
export default connect( mapDispatchToProps)(WrappedVerificationReject);
