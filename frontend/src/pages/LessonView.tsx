import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const LessonView: React.FC = () => {

    const { id } = useParams();
    const { token } = useAuth();

    const [lesson, setLesson] = useState<any>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isPreview = searchParams.get("preview") === "true";

    useEffect(() => {
        async function loadLesson() {
            if (!token) return;

            const data = await api.get(`/lessons/${id}`, token);
            // If lesson is draft and not preview → block student
            if (!data.published && !isPreview) {
                navigate("/lessons");
                return;
            }
            setLesson(data);

            // If PDF exists, fetch securely
            if (data.fileUrl?.endsWith(".pdf")) {

                const response = await fetch(
                    `http://localhost:8080${data.fileUrl}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);

                setFileUrl(objectUrl);
            }
        }

        loadLesson();
    }, [id, token]);

    if (!lesson) return <div className="p-10">Loading lesson...</div>;

    return (
        <div className="p-10 max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold mb-6">
                {lesson.title}
            </h1>

            {/* DOCX converted to HTML */}
            {lesson.content && (
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
            )}

            {/* PDF rendering */}
            {fileUrl && (
                <iframe
                    src={fileUrl}
                    className="w-full h-[80vh] rounded-xl mt-6"
                />
            )}
        </div>
    );
};
