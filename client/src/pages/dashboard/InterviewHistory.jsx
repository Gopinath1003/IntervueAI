import { useEffect, useState, useRef } from "react";
import axios from "axios";

function InterviewHistory() {

    const [history, setHistory] =
    useState([]);

    const fetchHistory =
    async () => {

        const token =
        localStorage.getItem("token");

        const response =
        await axios.get(

            "http://localhost:3001/api/interview/history",

            {
                headers:{
                    Authorization: token
                }
            }
        );

        setHistory(
            response.data
        );
    };

    const hasFetched = useRef(false);
    
      useEffect(() => {
        if (hasFetched.current) return;
    
        hasFetched.current = true;
    
        fetchHistory();
      }, []);

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Interview History
            </h1>

            {history.map(
                (interview) => (

                <div
                    key={interview._id}
                    className="border p-4 rounded mb-4"
                >

                    <h2>
                        {interview.role}
                    </h2>

                    <p>
                        Score:
                        {interview.overallScore}/10
                    </p>

                </div>

            ))}

        </div>
    );
}

export default InterviewHistory;