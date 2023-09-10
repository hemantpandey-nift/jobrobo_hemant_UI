import React, { ReactNode, useState } from "react";
import styles from "./Login.module.css";
import { TextField } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { userLogin } from "../../store/authSlice";
import { authState, useAppDispatch } from "../../store";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";

interface loginData {
  children?: ReactNode;
  addDialog?: any;
  setAddDialog?: any;
  setToggle?: any;
}

const LoginDialog: React.FC<loginData> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const authData = useSelector(authState);

  const loginHandler = (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();
    setLoading(true);
    const data: any = { loginId: email, loginPassword: password };
    if (!email) {
      setError("Login Id is Required");
    }
    if (!password) {
      setError("Login Password is Required");
    }
    dispatch(userLogin(data))
      .then((res: any) => {
        setLoading(false);
        if (!res.error) {
          setTimeout(() => props.setAddDialog(false), 0.1);
          props.setToggle((prev: boolean) => !prev);
        } else {
          setError(res.payload.message);
        }
      })
      .catch((error: any) => {
                setError(authData.error.message);
      });
  };

  return (
    <Dialog open={props.addDialog} disableEnforceFocus>
      {loading && <Loader />}
      <DialogContent className={styles.mainDialog}>
        <form onSubmit={loginHandler}>
          <div className={styles.dialogContent}>
            <div>
              <div className={styles.loginText}>Login/Sign up</div>
              <div className={styles.otpText}>Using OTP</div>
            </div>

            <div className={styles.inputsDiv}>
              <TextField
                variant="outlined"
                value={email}
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="Enter Phone number/Email Id"
                sx={{
                  height: 55,
                  width: 300,
                  border: "1px solid gray",
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                }}
              />
              <TextField
                value={password}
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Enter Your Password"
                sx={{
                  height: 55,
                  width: 300,
                  border: "1px solid gray",
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                }}
              />
            </div>
            <div>{error && <p className={styles.error}>{error}!!!</p>}</div>
            <div className={styles.loginActionsDiv}>
              <button type="submit" className={styles.loginActions}>
                Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setAddDialog(false);
                  setError("");
                }}
                className={styles.loginActions}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
