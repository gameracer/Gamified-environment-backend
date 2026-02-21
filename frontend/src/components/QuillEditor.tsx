import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
    label?: string;
}

export default function QuillEditor({
                                        value,
                                        onChange,
                                        label = "Content"
                                    }: QuillEditorProps) {

    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {

            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write something...",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"]
                    ]
                }
            });

            quillRef.current.on("text-change", () => {
                const html =
                    editorRef.current
                        ?.querySelector(".ql-editor")
                        ?.innerHTML || "";

                onChange(html);
            });
        }

        // Sync external value
        if (quillRef.current && value !== undefined) {
            const editor =
                editorRef.current?.querySelector(".ql-editor");

            if (editor && editor.innerHTML !== value) {
                editor.innerHTML = value;
            }
        }

    }, [value, onChange]);

    return (
        <div className="w-full">
            {/* Label */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Editor Container */}
            <div className="
                w-full
                bg-white
                border border-gray-300
                rounded-xl
                shadow-sm
                overflow-hidden
                focus-within:ring-2
                focus-within:ring-blue-500
                focus-within:border-blue-500
                transition
            ">

                {/* Toolbar override styling */}
                <div className="
                    [&_.ql-toolbar]:border-0
                    [&_.ql-toolbar]:border-b
                    [&_.ql-toolbar]:bg-gray-50
                    [&_.ql-toolbar]:rounded-t-xl
                " />

                {/* Editor */}
                <div
                    ref={editorRef}
                    className="
                        min-h-[200px]
                        sm:min-h-[250px]
                        md:min-h-[300px]
                        max-h-[500px]
                        overflow-y-auto
                        text-sm
                    "
                />
            </div>

            {/* Helper text */}
            <p className="mt-1 text-xs text-gray-500">
                Supports formatting, lists, links, and images.
            </p>
        </div>
    );
}
