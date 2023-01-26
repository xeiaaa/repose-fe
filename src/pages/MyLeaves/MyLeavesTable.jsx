import moment from "moment";
import { approveLeave, cancelLeave, denyLeave } from "../../api";

const MyLeavesTable = ({ leaves, setLeaves }) => {
  const cancel = async (leaveId) => {
    await cancelLeave(leaveId);
    setLeaves((prev) => {
      return prev.map((leave) => {
        if (leave._id === leaveId) {
          leave.status = "CANCELLED";
        }
        return leave;
      });
    });
  };

  // const update = async (leaveId) => {};

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Leave Balance</th>
          <th>Date</th>
          <th># of Days</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(leaves) &&
          leaves.map((leave) => {
            return (
              <tr key={leave._id}>
                <td>{leave.user.name}</td>
                <td>{leave.user.leaveBalance}</td>
                <td>
                  {moment(leave.startDate).format("MMM DD, YYYY")} -{" "}
                  {moment(leave.endDate).format("MMM DD, YYYY")}
                </td>
                <td>{leave.daysCount}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => {
                          cancel(leave._id);
                        }}
                      >
                        Cancel
                      </button>
                      {/* <button
                        onClick={() => {
                          update(leave._id);
                        }}
                      >
                        Update
                      </button> */}
                    </>
                  ) : null}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default MyLeavesTable;
