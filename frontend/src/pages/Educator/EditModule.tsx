import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

export const EditModule: React.FC = () => {

    const { id } = useParams();
    const { token } = useAuth();

    const [module, setModule] = useState<any>(null);

    useEffect(() => {
        if (!token) return;
        api.get(`/modules/${id}`, token).then(setModule);
    }, []);

    async function updateModule() {
        if (!token) return;

        await fetch(`http://localhost:8080/modules/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(module)
        });

        alert("Module updated!");
    }

    if (!module) return null;

    return (
        <div>
            <Navbar />
            <div className="p-10 max-w-xl mx-auto space-y-4">

                <h1 className="text-3xl font-bold">Edit Module</h1>

                <input
                    className="border p-3 w-full"
                    value={module.title}
                    onChange={(e) =>
                        setModule({ ...module, title: e.target.value })
                    }
                />

                <textarea
                    className="border p-3 w-full"
                    value={module.description}
                    onChange={(e) =>
                        setModule({ ...module, description: e.target.value })
                    }
                />

                <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={updateModule}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};
