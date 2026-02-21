import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Navbar } from "../../components/Navbar";

export const ManageModules: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="p-10 max-w-4xl mx-auto space-y-6">

                <h1 className="text-4xl font-bold">
                    Educator Panel
                </h1>

                <div className="flex gap-4">
                    <Button
                        variant="primary"
                        onClick={() => navigate("/educator/create-module")}
                    >
                        Create Module
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/educator/create-lesson")}
                    >
                        Create Lesson
                    </Button>
                </div>
            </div>
        </div>
    );
};
