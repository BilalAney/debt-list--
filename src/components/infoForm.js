/** @format */

import { useId, useState } from "react";
import { Form, FormInput } from "./form";

export default function InfoForm(props) {
  const id = useId();
  const [formData, setFormData] = useState({
    bill: "",
    your: "",
    who: "you",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "your") {
      if (+value > +formData.bill) return;
    }

    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  return (
    <div className="right-se">
      {!props.owe ? (
        <Form
          title={`SPLIT BILL WITH ${props.name.toUpperCase()}`}
          buttonLabel="Split Bill"
          handleSubmit={(e) => props.handleSubmit(e, formData)}
        >
          <FormInput
            id={`${id}-bill`}
            type="number"
            name="bill"
            value={formData.bill}
            handleChange={handleChange}
            disabled={false}
          >
            💰Bill
          </FormInput>

          <FormInput
            type="number"
            name="your"
            id={`${id}-your`}
            value={formData.your}
            handleChange={handleChange}
            disabled={false}
          >
            🫵Your expense
          </FormInput>

          <FormInput
            type="number"
            name="friend"
            id={`${id}-friend`}
            value={+formData.bill - +formData.your}
            disabled={true}
          >
            🤝{`${props.name}'s expense`}
          </FormInput>

          <div className="input-ctn">
            <label htmlFor={`${id}-who`}>🤔Who is paying?</label>
            <select
              name="who"
              id={`${id}-who`}
              value={formData.who}
              onChange={handleChange}
            >
              <option value="you">you</option>
              <option value="friend">{props.name}</option>
            </select>
          </div>
        </Form>
      ) : (
        <div className="resetWin">
          <h3>
            {props.owe < 0
              ? `${props.name.toUpperCase()} owes you ${props.owe * -1}`
              : `You owe ${props.name.toUpperCase()} ${props.owe}`}
          </h3>
          <button onClick={props.handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}
