import React from "react";
import TextArea from "../shared/Inputs/TextArea";

const Answer = ({ questions, categories }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [completeQuiz, setCompleteQuiz] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [categoriesSelected, setCategoriesSelected] = React.useState([]);
  const [answer, setAnswer] = React.useState("");

  React.useEffect(() => {
    const questionsFilteredByCategories = questions.filter(
      (question) =>
        question.category ===
        categories.map((category) => category.toLowerCase())[0]
    );
    setCategoriesSelected(questionsFilteredByCategories);
  }, [categories, questions]);
  const questionsSortedByLevel = categoriesSelected.sort((a, b) =>
    a.level.split("_")[1] > b.level.split("_")[1]
      ? 1
      : a.level.split("_")[1] === b.level.split("_")[1]
      ? a.id > b.id
        ? 1
        : -1
      : -1
  );

  const onClickNext = (index) => {
    if (index >= questionsSortedByLevel.length - 1) {
      setCompleteQuiz(true);
      return;
    }
    setCurrentIndex(index + 1);
  };

  const question = questionsSortedByLevel.length
    ? showOneQuestion(questionsSortedByLevel, currentIndex)
    : {};

  const onHandleChange = (e) => {
    setAnswer(e.target.value);
  };

  const onToggle = () => {
    setShowAnswer(true);
  };

  return (
    <>
      {!completeQuiz ? (
        <AnswerQuiz
          onClickNext={onClickNext}
          questionItems={question}
          currentIndex={currentIndex}
          userAnswer={answer}
          onHandleChange={onHandleChange}
          toggleShow={onToggle}
          showAnswer={showAnswer}
        />
      ) : (
        <FinishQuiz />
      )}
    </>
  );
};

const showOneQuestion = (questions, id) => questions[id];

const AnswerQuiz = ({
  questionItems,
  onClickNext,
  currentIndex,
  userAnswer,
  onHandleChange,
  toggleShow,
  showAnswer,
}) => {
  const { category, question, answer } = questionItems;

  return (
    <div className="quiz">
      <div className="quiz__title">{`Category ${category}`}</div>
      <div className="quiz__group">
        <div className="quiz__label">
          Question: <span className="quiz__label--normal">{question}</span>
        </div>
        <a href="/#" onClick={toggleShow}>
          Show Answer
        </a>
        {showAnswer && <div className="quiz__answer">{answer}</div>}
      </div>
      <div className="quiz__group">
        <div className={`quiz__label`}>Type answer: </div>
        <TextArea onHandleChange={onHandleChange} inputValue={userAnswer} />
      </div>
      <button onClick={() => onClickNext(currentIndex)} className="btn">Next</button>
    </div>
  );
};
const FinishQuiz = () => <div>Finish</div>;

export default Answer;
