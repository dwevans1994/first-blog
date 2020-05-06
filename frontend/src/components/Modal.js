import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    console.log(e.target)
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Blog Post Item </ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                value={this.state.activeItem.author}
                onChange={this.handleChange}
                placeholder="Enter Author Name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Post Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="text">Text</Label>
              <Input
                type="text"
                name="text"
                value={this.state.activeItem.text}
                onChange={this.handleChange}
                placeholder="Enter Post text"
              />
            </FormGroup>

            <FormGroup>
              <Label for="createdDate">Created Date</Label>
              <Input
                type="date"
                name="createdDate"
                value={this.state.activeItem.createdDate}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Published
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
            {console.log("save")}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}