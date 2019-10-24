import React from "react"
import { withRouter } from "react-router";
class EditButton extends React.Component {
  editItem = id => {
    const link = "/item/edit/" + id;
    this.props.history.push(link);
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={() => this.editItem(this.props.id)}
      >
        Edit
      </button>
    );
  }
}

export default withRouter(EditButton);
