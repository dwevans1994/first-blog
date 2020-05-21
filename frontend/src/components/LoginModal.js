export default class LoginModal extends Component {
    
constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loading: false,
      error: null
    };

  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }
}