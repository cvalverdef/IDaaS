import React, { useState, useEffect } from "react";

const Onboarding = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  // const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (window.WebSocket) {
      const socket = new WebSocket("wss://lab.tagroot.io/ClientEventsWS");

      socket.onopen = () => console.log("WebSocket connected.");
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);

        // Handle KYC updates
        if (data.type === "KYC_UPDATE") {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === data.userId ? { ...user, status: data.status } : user
            )
          );
        }
      };

      socket.onerror = (error) => console.error("WebSocket error:", error);
      socket.onclose = () => console.log("WebSocket disconnected.");

      return () => socket.close(); // Clean up on component unmount
    } else {
      console.error("WebSocket is not supported in this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Onboarding</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              {user.name} - Status: {user.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
