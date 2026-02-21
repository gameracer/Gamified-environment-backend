import React from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export const EducatorDashboard: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="p-10 max-w-4xl mx-auto space-y-6">

                <h1 className="text-4xl font-bold">
                    Educator Control Panel
                </h1>

                <div className="grid grid-cols-2 gap-6">

                    <Button
                        variant="primary"
                        onClick={() => navigate("/educator/modules")}
                    >
                        Manage Modules
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/educator/lessons")}
                    >
                        Manage Lessons
                    </Button>

                </div>
            </div>
        </div>
    );
};
