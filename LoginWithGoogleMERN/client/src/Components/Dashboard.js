import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./EventManagement.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // Authentication check
  const getUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });
      console.log("User authenticated:", response.data);
    } catch (error) {
      console.error("Authentication error:", error);
      navigate("*"); // Redirect to an error page
    }
  }, [navigate]);

  // States for events
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });
  const [editEventId, setEditEventId] = useState(null);

  // Load events from localStorage on initial render
  useEffect(() => {
    getUser();
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents.sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, [getUser]);

  // Save events to localStorage
  const saveEventsToStorage = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Handle adding or editing an event
  const handleAddOrEditEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.time && newEvent.location) {
      if (editEventId) {
        // Update existing event
        const updatedEvents = events.map((event) =>
          event.id === editEventId ? { ...newEvent, id: editEventId } : event
        );
        saveEventsToStorage(updatedEvents);
        setEditEventId(null);
      } else {
        // Add new event
        const updatedEvents = [
          ...events,
          { ...newEvent, id: Date.now() }, // Unique ID for new event
        ].sort((a, b) => new Date(a.date) - new Date(b.date));
        saveEventsToStorage(updatedEvents);
      }
      setNewEvent({ name: "", date: "", time: "", location: "" }); // Reset form
    } else {
      alert("Please fill in all fields to add or edit an event.");
    }
  };

  // Handle delete event
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEventsToStorage(updatedEvents);
  };

  // Handle edit event
  const handleEditEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setNewEvent(eventToEdit);
    setEditEventId(id);
  };

  // Filter events by selected date
  const filteredEvents = filterDate
    ? events.filter((event) => event.date === filterDate)
    : events;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Schedule Your Events</h1>

      {/* Add/Edit Event Section */}
      <div className="add-event-container">
        <h3>{editEventId ? "Edit Event" : "Add Event"}</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, time: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <button onClick={handleAddOrEditEvent}>
          {editEventId ? "Update Event" : "Add Event"}
        </button>
      </div>

      {/* Filter by Date Section */}
      <div className="filter-container">
        <h3>Filter by Date</h3>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <h1>Your Events</h1>
      {/* Event Table */}
      <div className="event-table-container">
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.location}</td>
                <td >
                  <button
                    className="edit-btn"
                    onClick={() => handleEditEvent(event.id)}
                  >
                    Edit
                  </button>
                  
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
