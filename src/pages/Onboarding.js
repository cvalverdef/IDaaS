import React, { useState, useEffect } from "react";

const Onboarding = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User A", status: "Pending" },
    { id: 2, name: "User B", status: "Approved" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://lab.tagroot.io/ClientEventsWS");

    socket.onopen = () => console.log("WebSocket connected.");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "KYC_UPDATE") {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === data.userId ? { ...user, status: data.status } : user
          )
        );
      }
    };
    socket.onclose = () => console.log("WebSocket disconnected.");

    return () => socket.close();
  }, []);

  return (
    <div>
      <h1>Onboarding</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name} - Status: {user.status}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h2>Selected User Details</h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Status:</strong> {selectedUser.status}</p>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
