import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { me } from "../../api";
import { TOKEN_KEY } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

function Home(props) {
  const [_, setTokens] = useLocalStorage(TOKEN_KEY, null);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await me();
        console.log({ data });
        setCurrentUser(data);
      } catch (err) {
        // No Store related to account (deleted)
        if (err.response && err.response.status === 404) {
          setTokens(null);
          setCurrentUser({});
          navigate("/signin", { replace: true, state: { noStore: true } });
        }
      }
    };
    init();
  }, []);

  const handleLogout = () => {
    setTokens(null);
    navigate("/login", { replace: true });
  };

  if (!currentUser._id) {
    return null;
  }

  return (
    <div>
      <h1>Home</h1>
      {/* sidebar */}
      <aside>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
            {currentUser.role === "admin" ? (
              <>
                <Link to="/leaves">Leaves</Link>
                <Link to="/users">Users</Link>
              </>
            ) : (
              <>
                <Link to="/apply-leave">Apply Leave</Link>
                <Link to="/my-leaves">My Leaves</Link>
              </>
            )}
          </li>
        </ul>
      </aside>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
      <Outlet context={{ currentUser, setCurrentUser }} />
    </div>
  );
}

export default Home;
