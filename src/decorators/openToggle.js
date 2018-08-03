import React, {Component} from "react";

export default (Origin) =>
class openToggleDecorator extends Component {

  state = {
    isOpen: false
  }

  render() {
    return(
      <Origin toggleOpen={this.changeOpenState} {...this.props} {...this.state}/>
    )
  }

  changeOpenState = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}