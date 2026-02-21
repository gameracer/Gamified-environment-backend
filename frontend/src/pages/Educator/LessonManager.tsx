import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton";

export const LessonManager: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [modules, setModules] = useState<any[]>([]);
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        loadModules();
    }, [token]); // Added token as dependency

    async function loadModules() {
        if (!token) return;
        try {
            const data = await api.get("/modules", token);
            setModules(data);
        } catch (err) {
            console.error("Failed to load modules", err);
        }
    }

    async function loadLessons(moduleId: number) {
        if (!token) return;
        try {
            const data = await api.get(`/lessons/module/${moduleId}`, token);
            setLessons(data);
        } catch (err) {
            console.error("Failed to load lessons", err);
        }
    }
    async function togglePublish(id: number) {

        if (!token) return;

        await fetch(
            `http://localhost:8080/lessons/${id}/publish`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        loadLessons(selectedModule!);
    }


    async function deleteLesson(id: number) {
        if (!token || !selectedModule) return;
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;

        try {
            await fetch(`http://localhost:8080/lessons/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            loadLessons(selectedModule);
        } catch (err) {
            console.error("Delete failed", err);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="p-10 max-w-5xl mx-auto">
                <BackButton to="/educator" />

                <div className="flex justify-between items-center mb-6 mt-4">
                    <h1 className="text-3xl font-bold">Lessons</h1>

                    {/* 1. Disable button if no module is selected */}
                    {/* 2. Pass the selectedModule ID to the next page */}
                    <Button
                        variant="primary"
                        disabled={!selectedModule}
                        onClick={() => navigate("/educator/create-lesson", {
                            state: { initialModuleId: selectedModule }
                        })}
                    >
                        + Add Lesson
                    </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-8 border">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Module
                    </label>
                    <select
                        className="border p-3 rounded w-full bg-white"
                        value={selectedModule || ""}
                        onChange={(e) => {
                            const id = e.target.value ? Number(e.target.value) : null;
                            setSelectedModule(id);
                            if (id) loadLessons(id);
                            else setLessons([]);
                        }}
                    >
                        <option value="">-- Choose a Module --</option>
                        {modules.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.title}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedModule ? (
                    lessons.length > 0 ? (
                        lessons.map(lesson => (
                            <div
                                key={lesson.id}
                                className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 p-6 mb-6"
                            >
                                {/* Top Section */}
                                <div className="flex justify-between items-start gap-6">

                                    {/* Left Content */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {lesson.title}
                                            </h2>

                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-bold 
                                ${lesson.published
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-gray-200 text-gray-500"}`}
                                            >
                                {lesson.published ? "Published" : "Draft"}
                            </span>
                                        </div>

                                        <div
                                            className="text-gray-600 text-sm line-clamp-2"
                                            dangerouslySetInnerHTML={{
                                                __html: lesson.description
                                            }}
                                        />

                                        <div className="text-xs text-gray-400 font-medium">
                                            XP Reward: {lesson.xpReward}
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex flex-col items-end gap-3">

                                        {/* Publish Toggle */}
                                        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="accent-primary w-4 h-4"
                                                checked={lesson.published}
                                                onChange={() => togglePublish(lesson.id)}
                                            />
                                            Publish
                                        </label>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">

                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(`/educator/edit-lesson/${lesson.id}`)
                                                }
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteLesson(lesson.id)}
                                            >
                                                Delete
                                            </Button>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 text-gray-500 border rounded-2xl bg-gray-50">
                            No lessons found for this module.
                        </div>
                    )
                ) : (
                    <div className="text-center py-20 border-2 border-dashed rounded-2xl text-gray-400 bg-gray-50">
                        Please select a module to view and manage lessons.
                    </div>
                )}

            </div>
        </div>
    );
};