import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44326/api/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
});

// window.axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   if (401 === error.response.status) {
//       swal({
//           title: "Session Expired",
//           text: "Your session has expired. Would you like to be redirected to the login page?",
//           type: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#DD6B55",
//           confirmButtonText: "Yes",
//           closeOnConfirm: false
//       }, function(){
//           window.location = '/login';
//       });
//   } else {
//       return Promise.reject(error);
//   }
// });