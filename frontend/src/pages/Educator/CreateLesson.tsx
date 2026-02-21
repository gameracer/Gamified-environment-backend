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
        location.state?.initialModuleId ?? null
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // short description
    const [content, setContent] = useState("");         // rich content
    const [xpReward, setXpReward] = useState(25);
    const [orderIndex, setOrderIndex] = useState(1);
    const [published, setPublished] = useState(false); // 🔥 default draft

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    /* ================= LOAD MODULES ================= */

    useEffect(() => {
        if (!token) return;

        api.get("/modules", token)
            .then((data) => {
                setModules(data);

                if (!moduleId && data.length > 0 && !isEdit) {
                    setModuleId(data[0].id);
                }
            })
            .catch(console.error);
    }, [token]);

    /* ================= LOAD LESSON (EDIT) ================= */

    useEffect(() => {
        if (!token) return;

        if (isEdit) {
            api.get(`/lessons/${id}`, token)
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description || "");
                    setContent(data.content || "");
                    setXpReward(data.xpReward);
                    setOrderIndex(data.orderIndex || 1);
                    setPublished(data.published || false);
                    setModuleId(data.moduleId);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, token, isEdit]);

    /* ================= SUBMIT ================= */

    async function handleSubmit() {

        if (!token || !moduleId) {
            alert("Please select module");
            return;
        }

        setSubmitting(true);

        try {

            const payload = {
                title,
                description,
                content,
                xpReward,
                orderIndex,
                published
            };

            let lessonId = id;

            if (isEdit) {
                await api.put(`/lessons/${id}`, payload, token);
            } else {
                const newLesson = await api.post(`/lessons/module/${moduleId}`, payload, token);
                lessonId = newLesson.id;
            }

            // Upload file if exists
            if (file && lessonId) {
                const formData = new FormData();
                formData.append("file", file);

                await fetch(`api/lessons/${lessonId}/upload`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                });
            }

            navigate("/educator/lessons");

        } catch (err) {
            console.error(err);
            alert("Error saving lesson");
        } finally {
            setSubmitting(false);
        }
    }

    /* ================= UI ================= */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="p-10 max-w-4xl mx-auto space-y-8">

                <BackButton to="/educator/lessons" />

                <h1 className="text-3xl font-bold">
                    {isEdit ? "Edit Lesson" : "Create Lesson"}
                </h1>

                {/* MODULE */}
                <div>
                    <label className="block font-semibold mb-2">Module</label>
                    <select
                        className="border p-3 w-full rounded-xl"
                        value={moduleId || ""}
                        disabled={isEdit}
                        onChange={(e) => setModuleId(Number(e.target.value))}
                    >
                        {modules.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                    </select>
                </div>

                {/* TITLE */}
                <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                        className="border p-3 w-full rounded-xl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter lesson title"
                    />
                </div>

                {/* SHORT DESCRIPTION */}
                <div>
                    <label className="block font-semibold mb-2">Short Description</label>
                    <textarea
                        className="border p-3 w-full rounded-xl"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief summary of the lesson"
                    />
                </div>

                {/* CONTENT */}
                <div>
                    <label className="block font-semibold mb-2">Lesson Content</label>
                    <QuillEditor value={content} onChange={setContent} />
                </div>

                {/* ORDER & XP */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-2">XP Reward</label>
                        <input
                            type="number"
                            className="border p-3 w-full rounded-xl"
                            value={xpReward}
                            min={0}
                            onChange={(e) => setXpReward(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Order Index</label>
                        <input
                            type="number"
                            className="border p-3 w-full rounded-xl"
                            value={orderIndex}
                            min={1}
                            onChange={(e) => setOrderIndex(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* PUBLISH SWITCH */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={() => setPublished(!published)}
                        id="publish-checkbox"
                    />
                    <span className="font-semibold">
                        {published ? "Published" : "Draft"}
                    </span>
                </div>

                {/* FILE UPLOAD */}
                <div>
                    <label className="block font-semibold mb-2">
                        Upload Attachment (PDF / DOCX)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file && (
                        <div className="mt-2 text-sm text-gray-600">
                            Selected file: {file.name}
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-6 border-t">

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting
                            ? "Saving..."
                            : isEdit
                                ? "Update Lesson"
                                : "Create Lesson"}
                    </Button>

                    <button
                        onClick={() => navigate("/educator/lessons")}
                        className="px-6 py-2 rounded-xl border"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};
