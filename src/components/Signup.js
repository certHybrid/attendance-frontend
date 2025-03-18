import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../signup.css'
import sqiLogo from '../Images/sqi.png'

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [studentid, setStudentid] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //data validation
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !email || !studentid || !department || !password) {
            toast.error("Please fill in all the fields.");
            return;
        }
        console.log(firstname, lastname, department, email, password, studentid);


        savedata();
    };

    const savedata = () => {
        setLoading(true);

        //connection to backend here
        axios.post("http://localhost/attendanceBackend/usersignup.php", {
            firstname,
            lastname,
            email,
            studentid,
            department,
            password
        })
            .then((res) => {
                console.log(res.data.status);

                setLoading(false);
                if (res.status === 200) {
                    toast.success("Signup successful!");
                    //this will reset the signup field
                    setFirstname('');
                    setLastname('');
                    setEmail('');
                    setStudentid('');
                    setDepartment('');
                    setPassword('');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);

                } else {
                    toast.error(res.data.message || "Signup failed!");
                }

            })
            .catch((err) => {
                setLoading(false);
                toast.error("Email already taken.");
            });
    };

    return (
        <div className="signupBg">
            <div className='SignUPsqiLogo'>
                <img src={sqiLogo} alt="picture" width="100px" />
            </div>
            <main className="signupForm">

                <form className="signForm" onSubmit={handleSubmit}>
                    <div className="SignUPcrt">
                        Create New Account
                    </div>
                    <p className="SignUPwelc">
                        Welcome to SQI Attendance app
                    </p>
                    <div className="SignUPinpbox">
                        <label htmlFor="firstname" className="lab">First Name</label>
                        <input
                            type="text"
                            className="SignUPinp"
                            placeholder="abeni"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="SignUPinpbox">
                        <label htmlFor="lastname" className="lab">Last Name</label>
                        <input
                            type="text"
                            className="SignUPinp"
                            placeholder="agbon"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="SignUPinpbox">
                        <label htmlFor="email" className="lab">Email</label>
                        <input
                            type="email"
                            className="SignUPinp"
                            placeholder="@aagbon.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="SignUPinpbox">
                        <label htmlFor="studentid" className="lab">Student ID</label>
                        <input
                            type="text"
                            className="SignUPinp"
                            placeholder="123459"
                            value={studentid}
                            onChange={(e) => setStudentid(e.target.value)}
                        />
                    </div>
                    <div className="SignUPinpbox">
                        <label htmlFor="department" className="lab">Department</label>
                        <input
                            type="text"
                            className="SignUPinp"
                            placeholder="Data Science"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className="SignUPinpbox">
                        <label htmlFor="password" className="lab">Password</label>
                        <input
                            type="password"
                            className="SignUPinp"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="formbut" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Signup;
