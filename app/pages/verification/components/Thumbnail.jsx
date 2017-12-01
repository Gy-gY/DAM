import React from 'react';
import {Card, Icon} from 'antd';
const styles = {
  card: {
    width: '220px',
    margin: '8px',
  },
  image: {
    width: '100%',
    minHeight: '220px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
  },
  shade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
    fontSize: '16px',
    padding: '4px 16px',
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  body: {
    textAlign: 'center',
    padding: '10px 16px',
    wordWrap: 'break-word',
    borderTop: '1px solid #e9e9e9',
  },
};

export default class Thumbnial extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    fileUrl: React.PropTypes.string.isRequired,
    file : React.PropTypes.object,
    toggleFileSelection: React.PropTypes.func.isRequired,
    selectedImgs: React.PropTypes.array,
    toggleDetailModal: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
      showShade:false,
    };
  }

  render() {

    let imageStyle = Object.assign({}, styles.image, {
      backgroundImage: `url(${this.props.fileUrl})`,
    });

    // let frameStyle = styles.frame;
    let {selectedImgs, file} = this.props;
    let {basic} = file;
    let ids = selectedImgs.ids || [];
    let cardStyle= {width: '220px', margin: '8px'};
    if (ids.includes(basic.id)) {
      Object.assign(cardStyle, {backgroundColor: 'rgba(16, 142, 233, 0.5)'});
    }
    return (

      <Card
        style={cardStyle}
        bodyStyle={{ padding: 0 }}
        onClick={this.props.toggleFileSelection}
        onMouseEnter={this.toggleShade}
        onMouseLeave={this.toggleShade}>

        <div style={imageStyle}>
          {(() => {
            if (this.state.showShade)
              return (
                <div style={styles.shade}>
                  <Icon
                    type="eye-o"
                    style={{marginRight: '8px'}}
                    onClick={e => {
                      e.stopPropagation();
                      this.props.toggleDetailModal();
                    }} />
                </div>
              );
          })()}
        </div>
        <div style={styles.body}>
          <h3>{basic.title}</h3>
        </div>
      </Card>
    );
  }

  toggleShade = () => {
    this.setState({
      showShade: !this.state.showShade,
    });
  }
}
