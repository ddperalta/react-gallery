import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import xhr from 'xhr';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      filename: '',
      imageData: '',
      title: ''
    };
  }

  handleFileChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const filename = file.name;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result.replace(/image\/jpeg/i, 'image/jpg');
      this.setState({imageData, filename});
    }
    reader.readAsDataURL(file);
  }

  handleChange = event => {
    const field = event.target.id;
    const value = event.target.value;
    this.setState({[field]: value});
  }
  
  save = () => {
    const {description, filename, imageData, title} = this.state;
    const url = "/images/";
    const opt = {}
    const postData = {
      description,
      filename,
      imageData,
      title
    };
    opt.body = JSON.stringify(postData);
    const req = xhr.post(url, opt, (err, resp) => {
      this.props.history.push("/");
    });
  }

  render() {
    const { title, description, filename } = this.state;
    const fileChooserLabel = filename ? filename : "Choose image";
    return (
      <div className="Add">
        <h1>Add Image</h1>
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            type="text" 
            class="form-control" 
            field="title" 
            id="title" 
            value={title}
            onChange={this.handleChange}
            placeholder="Image Title" 
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" 
            class="form-control" 
            field="description" 
            id="description" 
            value={description}
            onChange={this.handleChange}
            placeholder="Image Description" 
          />
        </div>
        <div class="custom-file">
          <input 
            type="file" 
            accept="image/*"
            class="custom-file-input" 
            onChange={this.handleFileChange}/>
          <label class="custom-file-label">{fileChooserLabel}</label>
        </div>
        <button className="btn pull-right save-btn" onClick={this.save}>Save</button>
        <NavLink to="/" className="btn btn-primary cancel-btn">Cancel</NavLink>
      </div>
    );
  }
}

export default withRouter(Add);
