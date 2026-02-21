import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import QuillEditor from "../../components/QuillEditor";

export const CreateLesson: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useAuth();

    const isEdit = !!id;

    const [modules, setModules] = useState<any[]>([]);
    const [moduleId, setModuleId] = useState<number | null>(
        location.state?.initialModuleId || null
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [xpReward, setXpReward] = useState(25);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // 1. Find the current module object to get its title
    const currentModule = modules.find(m => m.id === moduleId);

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        if (!token) return;

        // Load all modules so we can show titles in the dropdown/header
        const fetchModules = api.get("/modules", token);

        // Load lesson if editing
        const fetchLesson = isEdit ? api.get(`/lessons/${id}/complete`, token) : Promise.resolve(null);

        Promise.all([fetchModules, fetchLesson])
            .then(([modulesData, lessonData]) => {
                setModules(modulesData);
                if (lessonData) {
                    setTitle(lessonData.title);
                    setDescription(lessonData.content || "");
                    setXpReward(lessonData.xpReward);
                    setModuleId(lessonData.module?.id || null);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id, token, isEdit]);

    async function handleSubmit() {
        if (!token) return;
        setSubmitting(true);
        try {
            if (isEdit) {
                await fetch(`http://localhost:8080/lessons/${id}/complete`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, content: description, xpReward })
                });
            } else {
                if (!moduleId) {
                    alert("Please select a module.");
                    setSubmitting(false);
                    return;
                }
                await api.post(`/lessons/module/${moduleId}`, {
                    title, description, orderIndex: 1, xpReward
                }, token);
            }
            navigate("/educator/lessons");
        } catch (err) {
            console.error(err);
            setSubmitting(false);
        }
    }

    function handleCancel() {
        if (!window.confirm("Are you sure you want to cancel?")) return;
        navigate("/educator/lessons");
    }

    if (loading) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-gray-800">
            <Navbar />
            <div className="p-10 max-w-4xl mx-auto space-y-6">
                <BackButton to="/educator/lessons" />

                <div className="border-b pb-4">
                    <h1 className="text-3xl font-bold">
                        {isEdit ? "Edit Lesson" : "Create Lesson"}
                    </h1>
                    {/* 2. Show the Module Title prominently */}
                    {currentModule && (
                        <p className="text-primary font-medium mt-1">
                            Target Module: <span className="text-gray-600 underline">{currentModule.title}</span>
                        </p>
                    )}
                </div>

                {/* MODULE SELECTOR */}
                <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase text-gray-500 tracking-wider">
                            Module Selection
                        </label>
                        <select
                            className={`border p-3 w-full rounded-xl transition-all ${
                                (isEdit || moduleId) ? 'bg-gray-50 border-gray-200' : 'bg-white border-primary'
                            }`}
                            value={moduleId || ""}
                            disabled={isEdit || submitting}
                            onChange={(e) => setModuleId(Number(e.target.value))}
                        >
                            <option value="">-- Choose Module --</option>
                            {modules.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase text-gray-500 tracking-wider">
                            Lesson Title
                        </label>
                        <input
                            className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Introduction to React Hooks"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase text-gray-500 tracking-wider">
                            XP Reward
                        </label>
                        <input
                            type="number"
                            className="border p-3 w-full rounded-xl"
                            value={xpReward}
                            onChange={(e) => setXpReward(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Lesson Content</h2>
                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <QuillEditor value={description} onChange={setDescription} />
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={submitting || !title || !moduleId}
                        className="px-8"
                    >
                        {submitting ? "Processing..." : isEdit ? "Update Changes" : "Save Lesson"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};