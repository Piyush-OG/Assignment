import axios from "axios";
import { useCallback } from "react";

export const useFetchData = () => {
  return useCallback(async (setTickets, setUsers) => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, []);
};

export const useSortTickets = () => {
  return useCallback((tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, []);
};
