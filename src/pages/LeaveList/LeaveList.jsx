import React, { useEffect, useState } from "react";
import { getLeaves } from "../../api";
import LeavesTable from "./LeavesTable";

function UserList(props) {
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    const init = async () => {
      const { data } = await getLeaves({});
      setLeaves(data.results);
    };

    init();
  }, []);

  return (
    <div>
      <h1>Leave List</h1>
      <LeavesTable leaves={leaves} setLeaves={setLeaves} />
      {/* <pre>{JSON.stringify(leaves, null, 2)}</pre> */}
    </div>
  );
}

export default UserList;
