import React from "react";
import TaskColumn from "./TaskColumn";
import "./TaskBoard.css";
import { groupTasks, getGroupLabel } from "./taskHelper";

function TaskBoard({ tasks, groupBy, users }) {
  const groupedTasks = groupTasks(tasks, groupBy);

  return (
    <div className="task-board">
      {Object.entries(groupedTasks).map(([group, tasks]) => (
        <TaskColumn
          key={group}
          groupBy={groupBy}
          group={getGroupLabel(groupBy, group, users)}
          tasks={tasks}
          users={users}
        />
      ))}
    </div>
  );
}

export default TaskBoard;
