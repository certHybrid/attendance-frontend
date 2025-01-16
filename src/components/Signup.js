import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
            <main className="signupForm">
                <div className="crt">
                    Create New Account
                </div>
                <p className="welc">
                    Welcome to SQI Attendance app
                </p>
                <form className="signForm" onSubmit={handleSubmit}>
                    <div className="inpbox">
                        <label htmlFor="firstname" className="lab">First Name</label>
                        <input
                            type="text"
                            className="inp"
                            placeholder="abeni"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="inpbox">
                        <label htmlFor="lastname" className="lab">Last Name</label>
                        <input
                            type="text"
                            className="inp"
                            placeholder="agbon"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="inpbox">
                        <label htmlFor="email" className="lab">Email</label>
                        <input
                            type="email"
                            className="inp"
                            placeholder="@aagbon.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                        <label htmlFor="department" className="lab">Department</label>
                        <input
                            type="text"
                            className="inp"
                            placeholder="Data Science"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Signup;
