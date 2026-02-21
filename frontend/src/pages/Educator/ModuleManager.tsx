import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton";

export const ModuleManager: React.FC = () => {

    const { token } = useAuth();
    const navigate = useNavigate();
    const [modules, setModules] = useState<any[]>([]);

    useEffect(() => {
        loadModules();
    }, []);

    async function loadModules() {
        if (!token) return;
        const data = await api.get("/modules", token);
        setModules(data);
    }

    async function deleteModule(id: number) {
        if (!token) return;
        await fetch(`http://localhost:8080/modules/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        loadModules();
    }

    return (
        <div>
            <Navbar />

            <div className="p-10 max-w-5xl mx-auto">

                <BackButton to="/educator" />

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Modules
                    </h1>

                    <Button
                        variant="primary"
                        onClick={() => navigate("/educator/create-module")}
                    >
                        + Add Module
                    </Button>
                </div>

                {modules.map(module => (
                    <div
                        key={module.id}
                        className="p-6 border rounded-xl flex justify-between mb-4 hover:shadow-md"
                    >
                        <div>
                            <h2 className="text-xl font-bold">
                                {module.title}
                            </h2>
                            <p>{module.description}</p>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/educator/edit-module/${module.id}`)}
                        >
                            Edit
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => deleteModule(module.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
