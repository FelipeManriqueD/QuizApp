export default (state = null, action) => {
    switch (action.type) {
      case "AUTH_STATUS":
        return action.payload;
      default:
        return state;
    }
  };