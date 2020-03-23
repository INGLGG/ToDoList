import React, { useState } from "react";

export default props => {
  const [inp, setInp] = useState("");

  const inputHandler = e => setInp(e.target.value);

  const createTaskfromParent = e => {
    e.preventDefault();
    props.createTask(inp);
    setInp("");
  };

  return (
    <React.Fragment>
      <h2 className="main-title">What do you want to do today??</h2>
      <form onSubmit={createTaskfromParent} className="mt-3">
        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder="Write your task..."
            value={inp}
            type="text"
            onChange={inputHandler}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-success">Add Task</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
