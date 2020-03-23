import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash,
  faUndoAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

export default props => {
  // ----A D D---------------------------------

  // Toggle addSubTask form
  const [add, setAdd] = useState(false);

  // Save adding input
  const [addInput, setAddInput] = useState("");

  const addSubTask = e => {
    setAdd(prevState => !prevState);
  };

  const addHandler = e => {
    setAddInput(e.target.value);
  };

  const createSubTask = e => {
    e.preventDefault();
    props.createSubTask(props.task.id, addInput);
    setAdd(false);
    setAddInput("");
  };
  // ----E D I T---------------------------------

  // Toggle editing form...
  const [edit, setEdit] = useState(false);

  // Save editing input...
  const [editInput, setEditInput] = useState(addInput);

  const editTask = e => {
    setEdit(prevState => !prevState);
    setEditInput(props.task.name);
  };

  const editHandler = e => {
    setEditInput(e.target.value);
  };

  const cancelEdit = e => {
    setEditInput("");
    setEdit(prevState => !prevState);
  };

  const updateTask = e => {
    e.preventDefault();
    const updTsk = { ...props.task, name: editInput };
    props.handleTask(updTsk);
    setEdit(false);
    setEditInput("");
  };

  // ----D E L E T E ----------------------------
  const deleteSubtask = e => {
    props.deleteSubTask(e.target.id);
  };

  return (
    <li className="list-item">
      {edit ? (
        <form onSubmit={updateTask}>
          <input
            className="form-control"
            type="text"
            value={editInput}
            onChange={editHandler}
          />
          <div className="btn-group list-item-actions" role="group">
            <button className="btn btn-outline-success" type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={cancelEdit}
            >
              <FontAwesomeIcon icon={faUndoAlt} />
            </button>
          </div>
        </form>
      ) : (
        <React.Fragment>
          <p className="list-item-name">{props.task.name}</p>
          <div className="btn-group list-item-actions" role="group">
            <button
              className="btn btn-outline-success"
              onClick={addSubTask}
              disabled={add}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className="btn btn-outline-info"
              onClick={editTask}
              disabled={add}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => props.deleteTask(props.task.id)}
              disabled={add}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </React.Fragment>
      )}

      {add ? (
        <React.Fragment>
          <form onSubmit={createSubTask} className="sublist-item-form">
            <div className="input-group mb-3">
              <input
                type="text"
                value={addInput}
                placeholder={"Enter your subtask..."}
                onChange={addHandler}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-success">
                  Add
                </button>
              </div>
            </div>
          </form>
          <ul className="list-subtask col-8 mx-auto">
            {props.task.subTasks.length > 0
              ? props.task.subTasks.map(sbTsk => {
                  return (
                    <React.Fragment key={sbTsk.id}>
                      <li className="sublist-item">
                        <p className="sublist-item-name">{sbTsk.name}</p>
                        <button
                          className="btn btn-outline-danger"
                          onClick={deleteSubtask}
                          id={sbTsk.id}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </li>
                    </React.Fragment>
                  );
                })
              : null}
          </ul>
        </React.Fragment>
      ) : props.task.subTasks.length > 0 ? (
        <ul className="list-subtask col-8 mx-auto">
          {props.task.subTasks.map(sbTsk => {
            return (
              <React.Fragment key={sbTsk.id}>
                <li className="sublist-item">
                  <p className="sublist-item-name">{sbTsk.name}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteSubtask}
                    id={sbTsk.id}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};
