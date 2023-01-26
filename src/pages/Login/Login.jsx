import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { TOKEN_KEY } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

function Login(props) {
  const [_, setTokens] = useLocalStorage(TOKEN_KEY, null);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "Password1!",
    },
    onSubmit: async (values) => {
      const response = await login(values.email, values.password);
      if (response.data) {
        setTokens(response.data.tokens);

        navigate("/", { replace: true });
      }
      console.log({ response });
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
