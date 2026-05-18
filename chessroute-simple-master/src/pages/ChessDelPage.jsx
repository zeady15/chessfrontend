import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

export const ChessDelPage = () => {
    const { chessId } = useParams();
    const navigate = useNavigate();
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

    const handleDelete = event => {
        event.preventDefault();
        axios.delete(`https://chess.sulla.hu/chess/${chessId}`)
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !chess?.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő elem: {chess.name}</h5>
                        <div className="lead">Születési éve: {chess.birth_date}</div>
                        <div className="lead">Nyert világbajnokságok: {chess.world_ch_won}</div>
                        <div className="lead">Profil: {chess.profile_url}</div>
                        <img
                            alt={chess.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: '500px' }}
                            src={chess.image_url ? chess.image_url : 'https://placehold.co/400x800'}
                        />
                    </div>
                    <form onSubmit={handleDelete}>
                        <div>
                            <Link to={'/'}>
                                <button className="bi bi-backspace">&nbsp;Mégsem</button>
                            </Link>
                            &nbsp;&nbsp;
                            <button className="bi bi-trash3">&nbsp;Törlés</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
