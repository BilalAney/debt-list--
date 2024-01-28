/** @format */
import { useId, useState } from "react";
import { Form, FormInput } from "./form";

export default function AddForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    gender: "male",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((pre) => ({ ...pre, [name]: value }));
  }
  const id = useId();
  return (
    <Form
      title="Add a friend to your list!"
      buttonLabel="Add"
      handleSubmit={(e) => props.handleSubmit(e, formData)}
    >
      <FormInput
        type="text"
        name="name"
        id={`${id}-name`}
        value={formData.name}
        handleChange={handleChange}
        disabled={false}
      >
        🙎Friend's name
      </FormInput>
      <FormInput
        type="text"
        name="img"
        id={`${id}-img`}
        value={formData.img}
        handleChange={handleChange}
        disabled={false}
      >
        📷 Image URL
      </FormInput>
      <fieldset>
        <legend> Gender </legend>
        <div className="male-ctn">
          <input
            type="radio"
            id={`${id}-male`}
            value="male"
            name="gender"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor={`${id}-male`}>Male</label>
        </div>
        <div className="female-ctn">
          <input
            type="radio"
            id={`${id}-female`}
            value="female"
            name="gender"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor={`${id}-female`}>Female</label>
        </div>
      </fieldset>
    </Form>
  );
}
