import moment from "moment";
import { approveLeave, denyLeave } from "../../api";

const LeavesTable = ({ leaves, setLeaves }) => {
  const approve = async (leaveId) => {
    const { data } = await approveLeave(leaveId);
    setLeaves((prev) => {
      return prev.map((leave) => {
        if (leave._id === leaveId) {
          return data;
        } else {
          return leave;
        }
      });
    });
  };

  const deny = async (leaveId) => {
    await denyLeave(leaveId);
    setLeaves((prev) => {
      return prev.map((leave) => {
        if (leave._id === leaveId) {
          leave.status = "DENIED";
        }
        return leave;
      });
    });
  };
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
                <td></td>
                <td>{leave.daysCount}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => {
                          approve(leave._id);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          deny(leave._id);
                        }}
                      >
                        Deny
                      </button>
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

export default LeavesTable;
