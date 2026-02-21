import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const BackButton: React.FC<{ to?: string }> = ({ to }) => {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => to ? navigate(to) : navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold mb-4"
        >
            <ArrowLeft className="w-4 h-4" />
            Back
        </button>
    );
};
