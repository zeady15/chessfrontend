import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ChessCreatePage = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        name: "",
        birth_date: "",
        world_ch_won: 0,
        profile_url: "",
        image_url: "",
    });

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`https://chess.sulla.hu/chess`, payload)
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setPayload(prevPayload => ({
            ...prevPayload,
            [name]: value
        }));
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új sakkozó</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={payload.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="birth_date"
                            className="form-control"
                            value={payload.birth_date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="world_ch_won"
                            className="form-control"
                            value={payload.world_ch_won.toString()}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="profile_url"
                            className="form-control"
                            value={payload.profile_url}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="image_url"
                            className="form-control"
                            value={payload.image_url}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    );
};
