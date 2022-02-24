import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    //디비에서 값가져옴
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHnadler = (event) => {
    setValue(event.currentTarget.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("/api/value", { value: value }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("디비넣기 실퓨ㅐ");
      }
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     
      </header>
      <br>
        </br>
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력헤주세요.."
              onChange={changeHnadler}
              value={value}
            ></input>
            <button type="submit">확인</button>
          </form>
        </div>
    </div>
  );
}

export default App;
