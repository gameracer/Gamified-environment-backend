import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

export const CreateModule: React.FC = () => {

    const { id } = useParams(); // if exists → edit mode
    const navigate = useNavigate();
    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");

    const isEdit = !!id;

    useEffect(() => {
        if (!token || !id) return;

        api.get(`/modules/${id}`, token).then((data) => {
            setTitle(data.title);
            setDescription(data.description);
            setDifficulty(data.difficulty);
        });

    }, [id, token]);

    async function handleSubmit() {

        if (!token) return;

        if (isEdit) {
            await fetch(`http://localhost:8080/modules/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    difficulty
                })
            });
        } else {
            await api.post("/modules", {
                title,
                description,
                difficulty,
                orderIndex: 1
            }, token);
        }

        navigate("/educator/modules");
    }

    return (
        <div>
            <Navbar />
            <div className="p-10 max-w-xl mx-auto space-y-4">

                <h1 className="text-3xl font-bold">
                    {isEdit ? "Edit Module" : "Create Module"}
                </h1>

                <input
                    className="border p-3 w-full"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-3 w-full"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="border p-3 w-full"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>

                <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    {isEdit ? "Update" : "Create"}
                </button>

            </div>
        </div>
    );
};
