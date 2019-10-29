import API from "./API";

API.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (401 === error.response.status) {
      this.props.userLogout();
      localStorage.clear();
    } else {
      return Promise.reject(error);
    }
  }
);

const mapDispatchToProps = dispatch => ({
  userLogout: () => {
    dispatch(logout());
  }
});

export default connect(mapDispatchToProps);
