import React from "react";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

import backlogIcon from "./assets/Backlog.svg";
import todoIcon from "./assets/To-do.svg";
import inProgressIcon from "./assets/in-progress.svg";
import noPriority from "./assets/No-priority.svg";
import urgent from "./assets/SVG - Urgent Priority colour.svg";
import High from "./assets/Img - High Priority.svg";
import Medium from "./assets/Img - Medium Priority.svg";
import Low from "./assets/Img - Low Priority.svg";
import greyUrgent from "./assets/SVG - Urgent Priority grey.svg";
import doneIcon from "./assets/Done.svg";
import cancellationIcon from "./assets/Cancelled.svg";

import dots from "./assets/3 dot menu.svg";
import add from "./assets/add.svg";

const statusIcons = {
  "No Priority": noPriority,
  Urgent: urgent,
  Low: Low,
  High: High,
  Medium: Medium,
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Cancellation: cancellationIcon,
};

const priorityIcons = {
  "No Priority": noPriority,
  Urgent: greyUrgent,
  Low: Low,
  High: High,
  Medium: Medium,
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
};

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

const colors = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#F1C40F", // Yellow
  "#8E44AD", // Purple
  "#2ECC71", // Emerald
  "#3498DB", // Peter River
  "#9B59B6", // Amethyst
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getUserInitials = (userName) => {
  if (!userName) return "";
  const names = userName.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  console.log(initials, "initials");
  return initials;
};

const TaskColumn = ({ group, tasks, groupBy, users }) => {
  const isAvailable =
    groupBy === "users"
      ? users.find((user) => user.name === group)?.available
      : false;

  const renderColumn = (columnGroup, columnTasks) => (
    <div className="task-column">
      <div className="task-column-header">
        {groupBy === "users" ? (
          <div className="user-initials-container">
            <div
              className="user-initials"
              style={{ backgroundColor: getRandomColor() }}
            >
              {getUserInitials(columnGroup)}
            </div>
            <div
              className={`availability-indicator ${
                isAvailable ? "available" : "unavailable"
              }`}
            ></div>
          </div>
        ) : (
          <img
            src={statusIcons[columnGroup] || ""}
            alt={`${columnGroup} icon`}
            className="status-icon"
          />
        )}
        <h3 className="groupName">{columnGroup}</h3>
        <span className="count">{columnTasks.length}</span>
        <div className="right-icons">
          <img src={add} alt={`${columnGroup} icon`} className="add-icon" />
          <img src={dots} alt={`${columnGroup} icon`} className="dot-icon" />
        </div>
      </div>
      <div className="task-list">
        {columnTasks.map((task) => {
          const taskValue =
            groupBy === "status" ? priorityLabels[task.priority] : task.status;

          const taskAnotherValue = priorityLabels[task.priority];

          return (
            <TaskCard
              key={task.id}
              task={task}
              statusIcons={statusIcons[taskValue]}
              priorityIcons={priorityIcons[taskAnotherValue]}
              users={users}
              groupBy={groupBy}
            />
          );
        })}
      </div>
    </div>
  );

  if (groupBy === "status") {
    return (
      <>
        {renderColumn(group, tasks)}
        {group === "Backlog" && (
          <>
            {renderColumn("Done", [])}
            {renderColumn("Cancellation", [])}
          </>
        )}
      </>
    );
  }

  return renderColumn(group, tasks);
};

export default TaskColumn;
