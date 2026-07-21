import "./student.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Students() {

    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [editId, setEditId] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };

    // LOGOUT

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    }

    // GET

    async function loadStudents() {

        const response = await fetch("http://localhost:5000/students", {

            headers: authHeaders

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        setStudents(data);

    }

    // POST

    async function addStudent() {

        const response = await fetch("http://localhost:5000/students", {

            method: "POST",

            headers: authHeaders,

            body: JSON.stringify({

                name,

                age: Number(age),

                class: studentClass

            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Cannot Add Student");

            return;

        }

        setName("");
        setAge("");
        setStudentClass("");

        loadStudents();

    }

    // PUT

    async function updateStudent() {

        const response = await fetch(

            `http://localhost:5000/students/${editId}`,

            {

                method: "PUT",

                headers: authHeaders,

                body: JSON.stringify({

                    name,

                    age: Number(age),

                    class: studentClass

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            alert(data.message || "Cannot Update Student");

            return;

        }

        setName("");
        setAge("");
        setStudentClass("");
        setEditId("");

        loadStudents();

    }

    // DELETE

    async function deleteStudent(id) {

        const response = await fetch(

            `http://localhost:5000/students/${id}`,

            {

                method: "DELETE",

                headers: authHeaders

            }

        );

        const data = await response.text();

        if (!response.ok) {

            alert(data);

            return;

        }

        loadStudents();

    }

    return (

        <div className="students-container">

            <button

                style={{
                    float: "right",
                    background: "crimson",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}

                onClick={logout}

            >

                Logout

            </button>

            <h1>Student Management</h1>

            {/* Only Admin can see the form */}

            {role === "admin" && (

                <>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter Class"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                    />

                    <button
                        className="add-btn"
                        onClick={addStudent}
                    >
                        Add Student
                    </button>

                    <button
                        className="update-btn"
                        onClick={updateStudent}
                    >
                        Update Student
                    </button>

                </>

            )}

            <button
                className="load-btn"
                onClick={loadStudents}
            >
                Load Students
            </button>

            <hr />

            {students.map((student) => (

                <div
                    className="student-card"
                    key={student._id}
                >

                    <h3>{student.name}</h3>

                    <p>
                        <strong>Age:</strong> {student.age}
                    </p>

                    <p>
                        <strong>Class:</strong> {student.class}
                    </p>

                    {role === "admin" && (

                        <>

                            <button

                                style={{
                                    background: "green",
                                    color: "white",
                                    padding: "10px"
                                }}

                                onClick={() => {

                                    setEditId(student._id);
                                    setName(student.name);
                                    setAge(student.age);
                                    setStudentClass(student.class);

                                }}

                            >

                                EDIT

                            </button>

                            <button

                                className="delete-btn"

                                onClick={() => deleteStudent(student._id)}

                            >

                                Delete

                            </button>

                        </>

                    )}

                </div>

            ))}

        </div>

    );

}

export default Students;