/** @format */
import dataSet from "./data";
import { useState, useId, useEffect } from "react";
import "./App.css";
import InfoForm from "./components/infoForm";
import List from "./components/list";

function App() {
  //---- The states

  //this one is used to determine the current data items
  const lastData = JSON.parse(localStorage?.getItem("data"));

  //state to hold the data
  const [data, setData] = useState(() => (lastData ? lastData : []));

  //state to determine the current open person
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  //----Derived values.
  //this one derived from data, it calculates all the positive values
  const youOwe = data.reduce(
    (acc, cur) => acc + (cur.owe > 0 ? cur.owe : 0),
    0
  );

  //this one derived from data, it calculates the negative values
  const otherOwe = data.reduce(
    (acc, cur) => acc + (cur.owe < 0 ? cur.owe : 0),
    0
  );

  const id = useId();

  //A function that opens a person's form, in order to split a bill
  function handleOpen(id) {
    /**
     * the procedure:
     * **iterate over the persons (objecs in data array)
     * *** when we reach the person who has the id that is equal to given id
     * **** we store that person (object) in the current state (to be selected now)
     */
    data.forEach((ele) => {
      if (ele.id === id) {
        //if the current one is same as the clicked one, then return null, so that we close it
        setCurrent((pre) => (pre?.id !== ele.id ? ele : null));
      }
    });
  }

  //this function handles the submittion of the 'add a new friend' form
  function addFormSubmit(e, formData) {
    e.preventDefault();

    //Stop the function if there is an empty field
    if (!formData.img || !formData.name) return;

    setData((pre) => {
      return [
        ...pre,
        {
          id: `${formData.name.charAt(0)}-${id}`,
          name: formData.name,
          owe: 0,
          gender: formData.gender,
          img: formData.img,
        },
      ];
    });
  }

  //this function handles the submission of the 'split the bill with the friend' form
  function infoFormSubmit(e, formData) {
    e.preventDefault();

    //Stop the function immediately if there are empty fields
    if (!formData.your || !formData.bill) return;

    //here i will calculate the friend's expense, since its input field is disabled,
    //it will never ever fire any event(no change no load no anything).
    //we can not track its changes and reflect 'em to the state
    const friend = +formData.bill - +formData.your;
    setData((pre) => {
      return pre.map((ele) => {
        return ele.id === current.id
          ? {
              ...ele,
              owe: formData.who !== "you" ? -formData.your : friend,
            }
          : ele;
      });
    });
    //we call this one again to close the open one
    handleOpen(current.id);
  }

  //this one will reset the owe property of the desired person to zero
  function handleReset(id) {
    setData((pre) =>
      pre.map((ele) => (ele.id === id ? { ...ele, owe: 0 } : ele))
    );
    //we call this one again to close the open one
    handleOpen(id);
  }

  //this function handles the deletion process of a person
  function deletePerson(id) {
    setData((pre) => pre.filter((ele) => ele.id !== id));
  }

  return (
    <>
      <header>
        <h1>🧍🧍PEOPLE LIST💸💳</h1>
      </header>
      <div className="App">
        <List
          handleClick={handleOpen}
          data={data}
          current={current}
          handleSubmit={addFormSubmit}
          handleDelete={deletePerson}
        />
        {current && (
          <InfoForm
            key={`${current.id}-${Math.random()}-${current.name}`}
            id={current.id}
            name={current.name}
            owe={current.owe}
            handleReset={() => handleReset(current.id)}
            handleSubmit={infoFormSubmit}
          />
        )}
        <div className="totals">
          <span>🟢you owe: {youOwe}</span>
          <span>🔴your friends owe you: {otherOwe * -1}</span>
          <span>💲total: {youOwe + otherOwe}</span>
        </div>
      </div>
    </>
  );
}

export default App;
