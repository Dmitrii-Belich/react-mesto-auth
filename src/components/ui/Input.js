import React from "react";

export default function Input({
  name,
  pattern,
  required,
  placeholder,
  value,
  maxLength,
  minLength,
  onChange,
  type,
  update,
}) {
  const [isInputValid, setIsInputValid] = React.useState(true);
  const [validationMessage, setValidationMessage] = React.useState("");

  React.useEffect(() => {
    setIsInputValid(true);
    setValidationMessage("");
  }, [update]);

  const changeHandler = (evt) => {
    onChange(evt.target.value, name, evt.target.validity.valid);
    setIsInputValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  };

  return (
    <>
      <input
        type={type}
        className={`popup__input ${
          !isInputValid && "popup__input_display_error"
        }`}
        pattern={pattern}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={changeHandler}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
      />
      <span className="popup__input-error">{validationMessage}</span>
    </>
  );
}
