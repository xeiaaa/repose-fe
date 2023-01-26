import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getLeaves } from "../../api";
import MyLeavesTable from "./MyLeavesTable";

function MyLeaves(props) {
  const [leaves, setLeaves] = useState([]);
  const context = useOutletContext();
  const { currentUser } = context;
  useEffect(() => {
    const init = async () => {
      if (currentUser) {
        const { data } = await getLeaves({
          filter: {
            user: currentUser._id,
          },
        });
        setLeaves(data.results);
      }
    };

    init();
  }, [currentUser]);

  return (
    <div>
      <h1>My Leaves</h1>
      <MyLeavesTable leaves={leaves} setLeaves={setLeaves} />
      {/* <pre>{JSON.stringify(leaves, null, 2)}</pre> */}
    </div>
  );
}

export default MyLeaves;
