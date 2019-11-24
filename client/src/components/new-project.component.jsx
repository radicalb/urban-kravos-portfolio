//TODO
//Preveri edit, ko ni tokna

import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tittle: '',
      postBody: '',
      img1: '',
      img2: '',
      img3: '',
      gitUrl: 'https://github.com/radicalb/',
      img1thumbnail: '',
      img2thumbnail: '',
      img3thumbnail: '',
      img1fileKey: 'rKey1' + Date.now(),
      img2fileKey: 'rKey2' + Date.now(),
      img3fileKey: 'rKey3' + Date.now()
    };
  }

  componentDidMount() {
    //console.log(this.props.match);
    //console.log(this.props.match.params);
    if (this.props.match.params.id) {
      fetch('/api/project/' + this.props.match.params.id)
        .then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              //console.log(data);
              const { _id } = data;
              //console.log(_id);

              this.setState({
                tittle: data.tittle,
                postBody: data.postBody,
                img1: data.img1,
                img2: data.img2,
                img3: data.img3,
                gitUrl: data.gitUrl,
                img1thumbnail: data.img3thumbnail,
                img2thumbnail: data.img3thumbnail,
                img3thumbnail: data.img3thumbnail
              });
            });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  getNewProjectButton() {
    return (
      <button
        type="button"
        className="btn btn-success"
        onClick={this.handleAddProject}
      >
        Dodaj projekt
      </button>
    );
  }

  getEditProjectButton() {
    return (
      <button
        type="button"
        className="btn btn-success"
        onClick={this.handleEditProject}
      >
        Shrani spremembe
      </button>
    );
  }

  getCorrectButton() {
    if (this.props.match.params.id) {
      return this.getEditProjectButton();
    } else {
      return this.getNewProjectButton();
    }
  }

  handleImgChange = event => {
    const { files, name } = event.target;

    //za load bar, če bom rabil
    this.setState({
      loaded: 0
    });

    const formData = new FormData();
    formData.append('pFile', files[0]);

    const options = {
      method: 'POST',
      body: formData
    };

    //fetch('/api/project/upload', options)
    fetch('/api/resources/upload', options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(`Data from file upload:: ${data}`);

        const theData = JSON.parse(data);
        //console.log(theData);

        const inputsName = name.slice(0, 4);
        const InputsNameThumbnail = inputsName + 'thumbnail';
        this.setState({
          [inputsName]: theData.webContentLink,
          [InputsNameThumbnail]: theData.thumbnailLink
        });
      });
  };

  handleTextChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAddProject = () => {
    const {
      tittle,
      postBody,
      img1,
      img2,
      img3,
      gitUrl,
      img1thumbnail,
      img2thumbnail,
      img3thumbnail
    } = this.state;

    const options = {
      method: 'POST',
      body: JSON.stringify({
        tittle,
        postBody,
        img1,
        img2,
        img3,
        gitUrl,
        img1thumbnail,
        img2thumbnail,
        img3thumbnail
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/project/add', options)
      .then(res => {
        //console.log('RESPONSE FROM SERVER:');
        if (res.status === 200) {
          this.setState({
            tittle: '',
            postBody: '',
            img1: '',
            img2: '',
            img3: '',
            gitUrl: 'https://github.com/radicalb/',
            img1fileKey: 'rKey1' + Date.now(),
            img2fileKey: 'rKey2' + Date.now(),
            img3fileKey: 'rKey3' + Date.now(),
            img1thumbnail: '',
            img2thumbnail: '',
            img3thumbnail: ''
          });
          alert('Projekt uspešno dodan.');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error adding project please try again');
      });
  };

  handleEditProject = () => {
    const {
      tittle,
      postBody,
      img1,
      img2,
      img3,
      gitUrl,
      img1thumbnail,
      img2thumbnail,
      img3thumbnail
    } = this.state;

    const options = {
      method: 'POST',
      body: JSON.stringify({
        tittle,
        postBody,
        img1,
        img2,
        img3,
        gitUrl,
        img1thumbnail,
        img2thumbnail,
        img3thumbnail
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/project/update/' + this.props.match.params.id, options)
      .then(res => {
        //console.log('RESPONSE FROM SERVER:');
        if (res.status === 200) {
          alert('Projekt uspešno posodobljen.');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error updating project please try again');
      });
  };

  render() {
    return (
      <section className="page-section portfolio" id="newProject">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Dodaj projekt
          </h2>

          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-md-offset-2 text-left">
              <form action="" method="POST">
                <div className="form-group">
                  <label for="tittle">
                    Title <span className="require">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tittle"
                    value={this.state.tittle}
                    onChange={this.handleTextChange}
                  />
                </div>

                <div className="form-group">
                  <label for="postBody">Description</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    name="postBody"
                    value={this.state.postBody}
                    onChange={this.handleTextChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label for="img1">
                    Image1: <span className="require">*</span>
                  </label>
                  <input
                    type="file"
                    name="img1file"
                    key={this.state.img1fileKey}
                    onChange={this.handleImgChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img1"
                    value={this.state.img1}
                    onChange={this.handleTextChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img1thumbnail"
                    value={this.state.img1thumbnail}
                    onChange={this.handleTextChange}
                  />
                </div>

                <div className="form-group">
                  <label for="img2">
                    Image2: <span className="require">*</span>
                  </label>
                  <input
                    type="file"
                    name="img2file"
                    key={this.state.img2fileKey}
                    onChange={this.handleImgChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img2"
                    value={this.state.img2}
                    onChange={this.handleTextChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img2thumbnail"
                    value={this.state.img2thumbnail}
                    onChange={this.handleTextChange}
                  />
                </div>

                <div className="form-group">
                  <label for="img3">
                    Image3: <span className="require">* </span>
                  </label>
                  <input
                    type="file"
                    name="img3file"
                    key={this.state.img3fileKey}
                    onChange={this.handleImgChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img3"
                    value={this.state.img3}
                    onChange={this.handleTextChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="img3thumbnail"
                    value={this.state.img3thumbnail}
                    onChange={this.handleTextChange}
                  />
                </div>

                <div className="form-group">
                  <label for="gitUrl">
                    GitHub Url <span className="require">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="gitUrl"
                    value={this.state.gitUrl}
                    onChange={this.handleTextChange}
                  />
                </div>

                <div className="form-group">
                  <p>
                    <span className="require">*</span> - required fields
                  </p>
                </div>

                <div className="form-group">
                  {this.getCorrectButton()}
                  <a
                    href="/admin"
                    role="button"
                    className="btn btn-warning pull-right"
                  >
                    Nazaj
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NewProject;
