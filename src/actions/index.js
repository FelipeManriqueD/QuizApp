import mockApi from "../API/mockApi";

export const fetchQuestionsFields = () => async (dispatch) => {
  const response = await mockApi.get("/question_fields");

  dispatch({ type: "FETCH_QUESTIONS_FIELDS", payload: response.data });
};

export const postQuestions = (questions) => async (dispatch) => {
  const response = await mockApi.post("/questions", questions);

  dispatch(postQuestionStatus(response));
};

export const postQuestionStatus = (response) => (dispatch) => {
  if (response.status === 201) {
    dispatch({ type: "POST_STATUS", payload: response.status });
  }
};

export const authStatus = (response) => (dispatch) => {
  dispatch({ type: "AUTH_STATUS", payload: response });
};
