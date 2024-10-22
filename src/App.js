import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import TaskBoard from "./TaskBoard";
import Header from "./Header";
import useLocalStorage from "./useLocalStorage";
import { useFetchData, useSortTickets } from "./dataHelper";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useLocalStorage("kanbanGroupBy", "status");
  const [sortBy, setSortBy] = useLocalStorage("kanbanSortBy", "priority");

  const fetchDataCallback = useFetchData();
  const sortTicketsCallback = useSortTickets();

  useEffect(() => {
    fetchDataCallback(setTickets, setUsers);
  }, [fetchDataCallback]);

  const sortedTickets = useMemo(
    () => sortTicketsCallback(tickets, sortBy),
    [tickets, sortBy, sortTicketsCallback]
  );

  const handleGroupByChange = useCallback(
    (newGroupBy) => {
      setGroupBy(newGroupBy);
    },
    [setGroupBy]
  );

  const handleSortByChange = useCallback(
    (newSortBy) => {
      setSortBy(newSortBy);
    },
    [setSortBy]
  );

  return (
    <div className="kanban-container">
      <Header
        groupBy={groupBy}
        setGroupBy={handleGroupByChange}
        sortBy={sortBy}
        setSortBy={handleSortByChange}
      />
      <TaskBoard tasks={sortedTickets} groupBy={groupBy} users={users} />
    </div>
  );
}

export default React.memo(App);
