export const groupTasks = (tasks, groupBy) => {
  return tasks.reduce((groups, task) => {
    let groupKey;

    if (groupBy === "users") {
      groupKey = task.userId;
    } else if (groupBy === "priority") {
      groupKey = task.priority;
    } else if (groupBy === "status") {
      groupKey = task.status;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(task);
    return groups;
  }, {});
};

export const getGroupLabel = (groupBy, group, users) => {
  if (groupBy === "priority") {
    const priorityLabels = {
      4: "Urgent",
      3: "High",
      2: "Medium",
      1: "Low",
      0: "No Priority",
    };
    return priorityLabels[parseInt(group)] || "Unknown";
  } else if (groupBy === "users") {
    const user = users.find((user) => user.id === group);
    return user ? user.name : "Unknown User";
  }
  return group;
};
