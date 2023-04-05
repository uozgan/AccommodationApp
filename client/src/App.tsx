import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Here you go with Zoover</h1>
      <em>
        Note: This is a placeholder for the accommodation page that you need to
        create, so don't keep it, and do all the changes you see important
      </em>
      <h2>Check the end points on server:</h2>
      <ul>
        <li>
          <a href="http://localhost:8080/reviews">
            http://localhost:8080/reviews
          </a>
        </li>
        <li>
          <a href="http://localhost:8080/reviews/average">
            http://localhost:8080/reviews/average
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
