import React, { Component } from "react";
import Task from "./Task";

export class TaskList extends Component {
  constructor(props) {
    super(props);

    this.handleTask = this.handleTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.createSubTask = this.createSubTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }

  handleTask = task => {
    this.props.handleTask(task);
  };

  deleteTask = taskId => {
    this.props.deleteTask(taskId);
  };

  createSubTask = (taskId, subTask) => {
    this.props.createSubTask(taskId, subTask);
  };

  deleteSubTask = subTaskId => {
    this.props.deleteSubtask(subTaskId);
  };

  render() {
    let tasklistdiv =
      this.props.tasks.length > 0
        ? this.props.tasks.map(tsk => {
            return (
              <Task
                key={tsk.id}
                task={tsk}
                handleTask={this.handleTask}
                deleteTask={this.deleteTask}
                createSubTask={this.createSubTask}
                deleteSubTask={this.deleteSubTask}
              />
            );
          })
        : null;

    return <ul className="col-6 list-task">{tasklistdiv}</ul>;
  }
}

export default TaskList;
