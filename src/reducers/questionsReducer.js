export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_FIELDS":
      return action.payload;
    default:
      return state;
  }
};
