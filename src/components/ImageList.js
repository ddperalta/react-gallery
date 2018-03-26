import React, { Component } from 'react';
import JwModal from 'jw-react-modal';

class ImageList extends Component {
  static defaultProps = {
    images: []
  };

  render() {
    const {images} = this.props;
    const imageList = images.map((i, n) => {
      return (
        <div id={`img-element-${n}`} className="img-item">
          <div onClick={JwModal.open(`img-modal-${n}`)} className="img-element">
            <img src={i.url} alt={i.title} height="42" width="42" className="img-thumbnail"></img>
            <span className="img-title">{i.title}</span>
          </div>
          <JwModal id={`img-modal-${n}`}>
            <img src={i.url} alt={i.title}></img>
            <h1>{i.title}</h1>
            <p>{i.description}</p>
            <button className="btn pull-right" onClick={JwModal.close(`img-modal-${n}`)}>Close</button>
          </JwModal>
        </div>
      );
    });
    return (
      <div className="ImageList">
        {imageList}
      </div>
    );
  }
}

export default ImageList;
