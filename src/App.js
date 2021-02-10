import React, { useEffect, useState } from "react";
import database from "./firebase";
import firebase from 'firebase';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [List, setList] = useState([]);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const name = window.prompt("Enter a username ");
    setUsername(name);
  }, []);

  useEffect(() => {
    database
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //DO NOT REFRESH

    const chatMessage = {
      name: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //Adds server or Google timestamp
    };

    database.collection("messages").add(chatMessage);

    //setList([...List, input]);
    setInput("");
  };

  return (
    <div className="App">
      <div className="header"><p>Chat app</p></div>
      <div className="AppBody">
      {List.map(({ id, data: { message, timestamp, name } }) => (
        <div key={id} className="chat">
          <h3 className="chatName">{name}</h3>
          <p className="chatMessage">{message}</p>
        </div>
      ))}
      </div>
      <div className="AppFooter">
      <form>
        <input
          placeholder = "Type a message"
          type="text"
          value={input}
          className="mb-4"
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
    </div>
  );
}

export default App;
