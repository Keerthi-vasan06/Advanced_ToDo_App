// import React, { useState } from "react";
// import { addReminderToTask } from "../api";

// export default function ReminderForm({ taskId, onReminderAdded }) {
//   const [reminderDate, setReminderDate] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addReminderToTask(taskId, {
//         reminder_date: reminderDate,
//         status: "PENDING",
//         message : message,  
//       });
//       onReminderAdded(); 
//       setReminderDate("");
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add reminder");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
//       <input
//         type="datetime-local"
//         value={reminderDate}
//         onChange={(e) => setReminderDate(e.target.value)}
//         required
//         style={{ marginRight: "0.5rem" }}
//       />
//       <input
//         type="text"
//         placeholder="Reminder title"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         required
//         style={{ marginRight: "0.5rem" }}
//       />
//       <button
//         type="submit"
//         style={{
//           backgroundColor: "#3D5AFE",
//           color: "#fff",
//           padding: "0.3rem 0.6rem",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Add Reminder
//       </button>
//     </form>
//   );
// }

import React, { useState } from "react";

const ReminderForm = ({ taskId, fetchReminders }) => {
  const [newReminderDate, setNewReminderDate] = useState("");
  const [newReminderTitle, setNewReminderTitle] = useState("");

  const handleAddReminder = async (e) => {
    e.preventDefault();

    const newReminder = {
      reminder_date: newReminderDate, // ✅ matches backend field
      message: newReminderTitle,      // ✅ backend expects message
      status: "PENDING",              // ✅ backend requires status
    };

    try {
      const response = await fetch(`http://localhost:8081/api/tasks/${taskId}/reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReminder),
      });

      if (response.ok) {
        alert("Reminder added successfully!");
        setNewReminderDate("");
        setNewReminderTitle("");
        fetchReminders(taskId); // refresh list after adding
      } else {
        alert("Failed to add reminder");
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
      alert("Error adding reminder");
    }
  };

  return (
    <form onSubmit={handleAddReminder} className="reminder-form">
      <input
        type="text"
        placeholder="Reminder message"
        value={newReminderTitle}
        onChange={(e) => setNewReminderTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={newReminderDate}
        onChange={(e) => setNewReminderDate(e.target.value)}
        required
      />
      <button type="submit">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
