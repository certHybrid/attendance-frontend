import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../signin.css';
import sqiLogo from '../Images/sqi.png';



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
    const logstudent = async () => {
        setLoading(true);
        //connection to backend here
        try {
            const res = await axios.post("http://localhost/attendanceBackend/userlogin.php",
                { studentid, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.status === 200) {
                toast.success(res.data.message || "Login successful");

                // Store user info or token in localStorage/sessionStorage if needed
                // localStorage.setItem("user", JSON.stringify(res.data.user));

                // Reset form fields
                setStudentid('');
                setPassword('');
            }
        } catch (error) {
            setLoading(false);

            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Incorrect password");
                } else if (error.response.status === 404) {
                    toast.error("Student ID not found");
                } else {
                    toast.error(error.response.data.message || "Login failed");
                }
            } else {
                toast.error("Network error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="loginBg">
                <div className='sqiLogo'>
                    <img src={sqiLogo} alt="picture" width="100px" />
                </div>
                <main className="signinForm">


                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="crt">
                            Login
                        </div>
                        <p className="welclog">
                            Welcome to SQI Attendance app
                        </p>


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
                        <button type="submit" className="logbut" disabled={loading}>
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