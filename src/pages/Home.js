import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ImageList from '../components/ImageList';
import xhr from 'xhr';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  componentDidMount = () => {
    console.log("loading images...");
    this.getImages();
  }

  getImages = () => {
    const url = "/images/";
    const req = xhr.get(url, {}, (err, resp) => {
      const images = JSON.parse(resp.body);
      this.setState({images});
    });
  }

  render() {
    const { images } = this.state;
    return (
      <div className="Home">
        <h1>Album</h1>
        <ImageList images={images} />
        <NavLink to="/add" className="btn btn-primary">Add image</NavLink>
      </div>
    );
  }
}

export default Home;
