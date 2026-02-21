import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Dashboard} from './pages/Dashboard';
import {Challenges} from './pages/Challenges';
import {Lessons} from './pages/Lessons';
import {Leaderboard} from './pages/Leaderboard';
import {Profile} from './pages/Profile';
import {LessonView} from "./pages/LessonView.tsx";

import {EducatorDashboard} from "./pages/Educator/EducatorDashboard.tsx";
import {ModuleManager} from "./pages/Educator/ModuleManager.tsx";
import {LessonManager} from "./pages/Educator/LessonManager.tsx";
import {CreateLesson} from "./pages/Educator/CreateLesson.tsx";
import {CreateModule} from "./pages/Educator/CreateModule.tsx";

// Protected Route Component
interface ProtectedRouteProps {
    children: React.ReactNode,
    allowedRoles?: string[],
    roles?: [string, string]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, allowedRoles}) => {
    const {isAuthenticated, role} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
        // user not authorized for this route
        return <Navigate to="/"/>;
    }

    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                    <Route path="/challenges" element={<ProtectedRoute><Challenges/></ProtectedRoute>}/>
                    <Route path="/lessons" element={<ProtectedRoute><Lessons/></ProtectedRoute>}/>
                    <Route path="/lesson/:id" element={<LessonView/>}/>
                    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route
                        path="/educator/*"
                        element={
                            <ProtectedRoute allowedRoles={["EDUCATOR", "ADMIN"]}>
                                <EducatorDashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/educator/create-module" element={<CreateModule />} />
                    <Route path="/educator/edit-module/:id" element={<CreateModule />} />

                    <Route path="/educator/create-lesson" element={<CreateLesson />} />
                    <Route path="/educator/edit-lesson/:id" element={<CreateLesson />} />


                    <Route path="/educator/modules" element={<ModuleManager/>}/>
                    <Route path="/educator/lessons" element={<LessonManager/>}/>


                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
