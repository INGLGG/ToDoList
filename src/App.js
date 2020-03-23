import React, { useState } from "react";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from "uuid";

export default () => {
  const [tasks, setTasks] = useState([]);

  const createTask = taskName => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        name: taskName,
        subTasks: []
      }
    ]);
  };

  const handleTask = newTask => {
    let items = tasks.map(tsk => (tsk.id === newTask.id ? newTask : tsk));
    setTasks(items);
  };

  const deleteTask = taskId => {
    let items = tasks.filter((val, idx) => val.id !== taskId);
    setTasks(items);
  };

  const createSubTask = (taskId, subTask) => {
    let subTsk = {
      id: uuidv4(),
      name: subTask,
      taskId
    };

    let tsk = tasks.filter(val => val.id === taskId);

    tsk[0].subTasks.push(subTsk);

    let items = tasks.map(oldTsk =>
      oldTsk.id === tsk[0].id ? tsk[0] : oldTsk
    );

    setTasks(items);
  };

  const deleteSubtask = subTaskId => {
    let task = tasks.find(task =>
      task.subTasks.find(el => el.id === subTaskId)
    );

    let subTasks = task.subTasks.filter(val => val.id !== subTaskId);

    task.subTasks = subTasks;

    setTasks([...tasks]);
  };

  return (
    <div className="App container">
      <div className="row mt-5">
        <div className="col-8 mx-auto text-center">
          <TaskInput createTask={createTask} />
        </div>
      </div>
      <div className="row justify-content-center">
        <TaskList
          tasks={tasks}
          handleTask={handleTask}
          deleteTask={deleteTask}
          createSubTask={createSubTask}
          deleteSubtask={deleteSubtask}
        />
      </div>
    </div>
  );
};
