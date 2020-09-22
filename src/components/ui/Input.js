import React from "react";

export default function Input({
  place = "popup",
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
        className={`${place}__input ${
          !isInputValid && `${place}__input_display_error`
        }`         }
        pattern={pattern}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={changeHandler}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
      />
      <span className={`${place}__input-error`}>{validationMessage}</span>
    </>
  );
}
