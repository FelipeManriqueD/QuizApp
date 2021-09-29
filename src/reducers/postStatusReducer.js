export default (state = null, action) => {
  switch (action.type) {
    case "POST_STATUS":
      return action.payload;
    default:
      return state;
  }
};
