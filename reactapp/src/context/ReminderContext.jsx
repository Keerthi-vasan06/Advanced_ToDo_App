// import React, { createContext, useContext, useState, useEffect } from "react";

// const ReminderContext = createContext();

// export const ReminderProvider = ({ children }) => {
//   // const [reminders, setReminders] = useState(() => {
    
//   //   const stored = localStorage.getItem("reminders");
//   //   return stored ? JSON.parse(stored) : [];
//   // });


//   // useEffect(() => {
//   //   localStorage.setItem("reminders", JSON.stringify(reminders));
//   // }, [reminders]);

//   const addReminder = (taskId, reminder) => {
//     const newReminder = {
//       id: Date.now(), 
//       taskId,
//       ...reminder,
//     };
//     setReminders((prev) => [...prev, newReminder]);
//   };

//   const updateReminder = (id, updated) => {
//     setReminders((prev) =>
//       prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
//     );
//   };

//   const deleteReminder = (id) => {
//     setReminders((prev) => prev.filter((r) => r.id !== id));
//   };

//   const getRemindersByTask = (taskId) => {
//     return reminders.filter((r) => r.taskId === taskId);
//   };

//   return (
//     <ReminderContext.Provider
//       value={{ reminders, addReminder, updateReminder, deleteReminder, getRemindersByTask }}
//     >
//       {children}
//     </ReminderContext.Provider>
//   );
// };

// export const useReminder = () => useContext(ReminderContext);

import React, { createContext, useContext } from "react";
import * as api from "../api"; // make sure your API functions are imported

const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  // No local reminders state needed

  const addReminder = async (taskId, reminder) => {
    const res = await api.addReminder(taskId, reminder);
    return res.data; // return newly created reminder
  };

  const getRemindersByTask = async (taskId) => {
    const res = await api.getReminders(taskId);
    return res.data; // returns array of reminders
  };

  const updateReminder = async (id, reminder) => {
    const res = await api.updateReminder(id, reminder);
    return res.data;
  };

  const deleteReminder = async (id) => {
    await api.deleteReminder(id);
  };

  return (
    <ReminderContext.Provider
      value={{ addReminder, getRemindersByTask, updateReminder, deleteReminder }}
    >
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminder = () => useContext(ReminderContext);
