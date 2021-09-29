import React from "react";
import axios from "axios";
import Answer from "./Answer";

const Guest = () => {
  const [categories, setCategories] = React.useState([]);
  const [checkCategory, setCheckCategory] = React.useState(true);
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [startQuiz, setStartQuiz] = React.useState(false);

  React.useEffect(() => {
    const fetchQuizCategoriesData = async () => {
      const categories = await axios(
        "https://5ed6808dc2ca2300162c6683.mockapi.io/option_fields"
      );

      setCategories(categories.data);
    };

    fetchQuizCategoriesData();
  }, []);

  React.useEffect(() => {
    const fetchQuizQuestionsData = async () => {
      const questions = await axios(
        "https://5ed6808dc2ca2300162c6683.mockapi.io/questions"
      );

      setQuestions(questions.data);
    };

    fetchQuizQuestionsData();
  }, [startQuiz]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setCheckCategory({ [name]: value });

    setCategoriesSelected([...categoriesSelected, name]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setStartQuiz(true);
  };

  const selectCategories = (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2>Select Categories</h2>
      <CategoriesChecked
        categories={categories}
        checkCategory={checkCategory}
        handleInputChange={handleInputChange}
      />
      <button type="submit">Start</button>
    </form>
  );

  return (
    <>
      {!startQuiz ? (
        selectCategories
      ) : (
        <Answer questions={questions} categories={categoriesSelected} />
      )}
    </>
  );
};

const CategoriesChecked = ({
  categories,
  checkCategory,
  handleInputChange,
}) => {
  return categories
    .filter(({ inputType }) => inputType === "category")
    .map(({ options, id }) =>
      options.map(({ name }) => (
        <div key={id + name} className="form__field--small">
          <label htmlFor={name} className="form__group-title">
            {name}
          </label>
          <div className="form__controls">
            <input
              name={name}
              type="checkbox"
              checked={checkCategory.category}
              onChange={handleInputChange}
            />
          </div>
        </div>
      ))
    );
};

export default Guest;
