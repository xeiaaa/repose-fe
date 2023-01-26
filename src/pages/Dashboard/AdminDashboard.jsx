import React, { useEffect, useState } from "react";
import { getLeaves } from "../../api";

function AdminDashboard(props) {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  useEffect(() => {
    const init = async () => {
      const { data } = await getLeaves({
        filter: {
          status: "PENDING",
        },
      });

      setPendingLeaves(data.results.length);
    };

    init();
  }, []);
  return (
    <div>
      <h2>AdminDashboard</h2>

      <p>
        <strong>Pending Leaves: </strong> {pendingLeaves}
      </p>
    </div>
  );
}

export default AdminDashboard;
