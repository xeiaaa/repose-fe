import React from "react";

function UserDashboard({ currentUser }) {
  return (
    <div>
      <h2>User Dashboard</h2>

      <p>
        <strong>Used Leave: </strong> {currentUser.usedLeave || 0}
      </p>
      <p>
        <strong>Leave Balance: </strong> {currentUser.leaveBalance || 0}
      </p>
    </div>
  );
}

export default UserDashboard;
