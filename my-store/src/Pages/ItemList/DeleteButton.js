import React from "react"
import { errorToast, successToast } from "../../Components/Toasts/Toast";
import API from "../../Components/Axios/API";

class DeleteButton extends React.Component {

  deleteItem = item => {
    const deleteItem = {
      id: item.id,
      name: item.name,
      typeName: item.typeName,
      categoryName: item.categoryName,
      cost: item.cost
    } 

    API
      .delete("/item/delete/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: deleteItem
      })
      .then(res => {
        successToast("Item delete!");
      })
      .catch(error => {
        errorToast(error.response);
      });
  };
  render() {
    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => this.deleteItem(this.props.item)}
      >
        Delete
      </button>
    );
  }
}
export default DeleteButton