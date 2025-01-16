import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [studentid, setStudentid] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //data validation
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentid) {
            toast.error("please enter your student id");
            return;
        }
        if (!password) {
            toast.error("please enter your password");
            return;
        }

        logstudent();
    };
    const logstudent = () => {
        setLoading(true);
          //connection to backend here
          axios.post("http://localhost/attendanceBackend/userlogin.php", {
            studentid,
            password
        })
            .then((res) => {
                console.log(res);
                setLoading(false);
                if (res.status===200) {
                    toast.success("Login successful!");
                   //this will reset the login field
                    setStudentid('');
                    setPassword('');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Login details incorrect");
            });

    };
    return (
        <>
            <div className="signupBg">
                <main className="signupForm">
                    <div className="crt">
                        Login
                    </div>
                    <p className="welclog">
                        Welcome to SQI Attendance app
                    </p>
                    <form className="loginForm" onSubmit={handleSubmit}>


                        <div className="inpbox">
                            <label htmlFor="studentid" className="lab">Student ID</label>
                            <input
                                type="text"
                                className="inp"
                                placeholder="123459"
                                value={studentid}
                                onChange={(e) => setStudentid(e.target.value)}
                            />
                        </div>

                        <div className="inpbox">
                            <label htmlFor="password" className="lab">Password</label>
                            <input
                                type="password"
                                className="inp"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="formbut" disabled={loading}>
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </form>
                </main>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signin;