import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export const ChessSinglePage = () => {
    const params = useParams();
    const { chessId } = params;
    const [chess, setChess] = useState(null);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchChess = async () => {
            setPending(true);
            try {
                const response = await axios.get(`https://chess.sulla.hu/chess/${chessId}`);
                setChess(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        };

        fetchChess();
    }, [chessId]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !chess?.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                                <h5 className="card-title">Sakkozó neve: {chess.name}</h5>
                                <div className="lead">Születési éve: {chess.birth_date}</div>
                                <div className="lead">Nyert világbajnokságai: {chess.world_ch_won}</div>
                                {/* Feltételes NavLink az abszolút URL-hez */}
                        {chess.profile_url.startsWith('http') ? (
                            <a href={chess.profile_url} target="_blank" rel="noopener noreferrer">
                                Profile link
                            </a>
                        ) : (
                            <Link to={chess.profile_url}>Profile link</Link>
                        )}
                        <br />
                        <Link key={chess.id} to={'/chess/' + chess.id}>
                            <img
                                alt={chess.name}
                                className="img-fluid"
                                style={{ maxHeight: 200 }}
                                src={chess.image_url ? chess.image_url : 'https://placehold.co/400x800'}
                            />
                        </Link>
                        <br />
                    </div>
                    <div>
                        <Link to="/"><i className="bi bi-backspace"></i></Link> &nbsp;&nbsp;&nbsp;
                        <Link key="y" to={'/mod-chess/' + chess.id}>
                            <i className="bi bi-pencil"></i>
                        </Link>
                    </div>
                </div>
            )}
                </div>
    );
}

