import React from "react";
import "./TaskCard.css";

const getUserInitials = (userName) => {
  if (!userName) return "";
  const names = userName.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  return initials;
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

const TaskCard = ({ task, statusIcons, users, groupBy, priorityIcons }) => {
  const userName = users.find((user) => user.id === task.userId)?.name;
  const userInitials = getUserInitials(userName);
  const isAvailable = users.find((user) => user.id === task.userId)?.available;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-id-initials">
          <span className="task-id">{task.id}</span>
          {groupBy !== "users" && (
            <div className="user-initials-container">
              <span
                className="user-initials"
                style={{ backgroundColor: getRandomColor() }}
              >
                {userInitials}
              </span>
              <div
                className={`availability-indicator ${
                  isAvailable ? "available" : "unavailable"
                }`}
              ></div>
            </div>
          )}
        </div>
        <div className="task-title-status">
          {groupBy !== "status" ? (
            <img
              src={statusIcons || ""}
              alt={`${statusIcons}`}
              className="status-icon"
            />
          ) : null}
          <h3 className="task-title">{task.title}</h3>
        </div>
      </div>
      {task.tag ? (
        <div className="priority-feature-container">
          {console.log(priorityIcons, "priorityIcons")}
          {groupBy !== "priority" ? (
            <img
              src={priorityIcons || ""}
              alt={`${priorityIcons}`}
              className="priority-Icon"
            />
          ) : null}
          <div className="feature-tag">
            <div className="circle"></div>
            <span className="feature">{task.tag[0]}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskCard;
