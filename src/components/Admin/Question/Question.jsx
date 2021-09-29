import React from "react";
import { connect } from "react-redux";
import { fetchQuestionsFields, postQuestions } from "../../../actions";

import TextArea from "../../shared/Inputs/TextArea";

const Question = (props) => {
  const [id, setId] = React.useState(0);
  const [formData, setFormData] = React.useState({
    id: 0,
    category: "",
    question: "",
    answer: "",
    level: "",
  });
  const { question, category, answer, level } = formData;
  const {
    fetchQuestionsFields,
    postQuestions,
    questionsFields,
    postStatus,
  } = props;

  React.useEffect(() => {
    fetchQuestionsFields();
    if (postStatus === 201) {
      setFormData({
        category: "",
        question: "",
        answer: "",
        level: "",
      });
    }
  }, [fetchQuestionsFields, postStatus]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.persist();
    setId(id + 1);
    postQuestions(formData);
  };

  const onHandleChange = (event) => {
    setFormData({
      ...formData,
      id: id,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form className="form" onSubmit={onSubmitHandler}>
        {questionsFields
          ? questionsFields.map(({ name, type, id, options }) => {
              const renderInputs = () => {
                switch (type) {
                  case "text":
                    return (
                      <TextInput
                        onHandleChange={onHandleChange}
                        inputValue={question}
                      />
                    );
                  case "select_category":
                    return (
                      <SelectInput
                        onHandleChange={onHandleChange}
                        selectOptions={options}
                        label={name}
                        inputType={category}
                      />
                    );
                  case "select_level":
                    return (
                      <SelectInput
                        onHandleChange={onHandleChange}
                        selectOptions={options}
                        label={name}
                        inputType={level}
                      />
                    );
                  case "textArea":
                    return (
                      <TextArea
                        onHandleChange={onHandleChange}
                        inputValue={answer}
                      />
                    );
                  default:
                    break;
                }
              };
              return (
                <div className="form__field" key={id}>
                  <label htmlFor="" className="form__label">
                    {name}
                  </label>
                  {renderInputs()}
                </div>
              );
            })
          : null}
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

const TextInput = ({ onHandleChange, inputValue }) => {
  return (
    <input
      type="text"
      name="question"
      className="form__input"
      onChange={onHandleChange}
      value={inputValue}
    />
  );
};

const SelectInput = ({ onHandleChange, selectOptions, label, inputType }) => {
  return (
    <select
      value={inputType}
      onChange={onHandleChange}
      className="form__select"
      name={label.toLowerCase()}
    >
      <option disabled="disabled" value={""} hidden="hidden">
        {` -- Select ${label}--`}
      </option>
      {selectOptions.map(({ name, value }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

const mapStateToProps = (state) => {
  return {
    questionsFields: state.questionsFields,
    postStatus: state.postStatus,
  };
};

export default connect(mapStateToProps, {
  fetchQuestionsFields,
  postQuestions,
})(Question);
