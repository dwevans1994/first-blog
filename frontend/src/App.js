import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Button from "./components/LoginButton";

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            id: "",
            author: "",
            title: "",
            text: "",
            createdDate: "",
            completed: false
          },
          postList: [],
          loggedIn: false
        };
      }
      componentDidMount() {
        this.refreshList();
      }


      refreshList = () => {
        axios
          .get("http://127.0.0.1:8000/api/posts/")
          .then(res => this.setState({ postList: res.data }))
          .catch(err => console.log(err));
      };

    //   async refreshList(){
    //     const response =
    //       await axios.get('http://localhost:8000/api/posts/')
    //       console.log(response.data)
    //       const change = JSON.stringify(response.data)
    //       console.log(change)
    //     this.setState({
    //       postList: change
    //     }, function () {
    //       console.log(this.state.postList);
    //   });
    // }


      displayCompleted = status => {
        if (status) {
          return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
      };
      renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              Complete
            </span>
            <span
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incomplete
            </span>
          </div>
        );
      };
      renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.postList.filter( item => item.completed === viewCompleted );
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`post-title mr-2 ${
                this.state.viewCompleted ? "completed-post" : ""
              }`}
              title={item.text}
            >
              {item.title}
            </span>

            <span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                {" "}
                Edit{" "}
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete{" "}
              </button>
            </span>
          </li>
        ));
      };
      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://127.0.0.1:8000/api/posts/${item.id}/`, item)
            .then(res => this.refreshList())
            .catch(err => console.log(err));
          return;
        }
        axios
          .post("http://127.0.0.1:8000/api/posts/", item)
          .then(res => this.refreshList())
          .then(err => console.log(err))
      };
      handleDelete = item => {
        axios
          .delete(`http://127.0.0.1:8000/api/posts/${item.id}`)
          .then(res => this.refreshList());
      };
      createItem = () => {
        const item = { 
          author: "",
          title: "",
          text: "",
          createdDate: "",
          completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">Blog</h1>
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add post
                    </button>
                    {!this.state.loggedIn ? (
              <Button/>
            ) : null}
                  </div>
                  {this.renderTabList()}
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }
    export default App;