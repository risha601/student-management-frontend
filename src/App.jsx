import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Students from "./Pages/Students";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route

                path="/students"

                element={

                    <ProtectedRoute>

                        <Students />

                    </ProtectedRoute>

                }

            />

        </Routes>

    );

}

export default App;