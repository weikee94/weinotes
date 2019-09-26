import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

// Goal Add -1 and reset button to component
// 1. Allow initial count to be configured using a count prop (default to 0)
// 2. Add -1 button to reduce count by 1
// 3. Add reset button to reset
// 4. Test

// const App = props => {
//   // first is value second is function
//   const [count, setCount] = useState(props.initialCount);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     console.log("This should only run once");
//   }, []);

//   useEffect(() => {
//     console.log("useEffect ran");
//     document.title = count;
//   }, [count]);

//   const increment = () => {
//     setCount(count + 1);
//   };
//   const descrement = () => {
//     setCount(count - 1);
//   };
//   const reset = () => {
//     setCount(0);
//   };
//   const inputUpdate = e => {
//     setText(e.target.value);
//   };
//   return (
//     <div>
//       <p>
//         The current {text || "count"} is {count}
//       </p>
//       <button onClick={increment}>+1</button>
//       <button onClick={descrement}>-1</button>
//       <button onClick={reset}>reset</button>
//       <input type="text" value={text} onChange={inputUpdate} />
//     </div>
//   );
// };

// Goal: Add body for each note
//
// 1. Allow users to add body to each notes
// 2. Render the body alongside the note title
// 3. Test your work

// Goal: Synchronize notes data with localStorage
//
// 1. Read notes data from localstorage
//   - no data stored? Default to empty array
// 2. Call useEffect to update localstorage when notes array changes
// 3. Test your work

// Goal: Continue working with useEffect
//
// 1. Add deps to existing useEffect call
// 2. Call useEffect again to have it only run once
//   - use this to load the data from localStorage
// 3. Test your work

const NoteApp = () => {
  //   const notesData = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const inputHandler = e => {
    setTitle(e.target.value);
  };
  const bodyHandler = e => {
    setBody(e.target.value);
  };
  const addNoteHandler = e => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body
      }
    ]);
    setTitle("");
    setBody("");
  };
  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title));
  };

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) {
      setNotes(notesData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNoteHandler}>
        <input type="text" value={title} onChange={inputHandler} />
        <input type="text" value={body} onChange={bodyHandler} />
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {});
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  );
};

// ReactDOM.render(<App initialCount={0} />, document.getElementById("root"));
ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
