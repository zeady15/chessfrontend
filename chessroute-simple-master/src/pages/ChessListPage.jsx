import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChessCard } from '../components/ChessCard';

export const ChessListPage = () => {
    const [chesses, setChess] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);

        axios
            .get("https://chess.sulla.hu/chess")
            .then((response) => {
                setChess(response.data);
            })
            .catch(console.log)
            .finally(() => setFetchPending(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakkozók</h2>
                    {chesses.map((chess) => (
                        <ChessCard chess={chess} key={chess.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
