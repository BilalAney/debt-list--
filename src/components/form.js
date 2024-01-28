/** @format */

function Form({ title, buttonLabel, handleSubmit, children }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <input
        type="submit"
        name="submit"
        id="submitButton"
        value={buttonLabel}
      />
    </form>
  );
}

function FormInput({
  id,
  name,
  value,
  handleChange,
  children,
  type,
  disabled,
}) {
  return (
    <div className="input-ctn">
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export { Form, FormInput };
