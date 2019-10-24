import React from "react"
import axios from "axios";
import { errorToast, successToast } from "../../Components/Toasts/Toast";

class DeleteButton extends React.Component {
  deleteItem = id => {
    axios
      .delete("https://localhost:44326/api/item/delete", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: id
      })
      .then(res => {
        successToast("User delete!");
        this.getItem();
      })
      .catch(error => {
        errorToast(error.response.data.message);
      });
  };
  render() {
    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => this.deleteItem(this.props.id)}
      >
        Delete
      </button>
    );
  }
}
export default DeleteButton