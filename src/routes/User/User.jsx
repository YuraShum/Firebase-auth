import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { endSession, getSession, isLoggedIn } from "../../session";
import { MdOutlineWebhook } from 'react-icons/md'
import { RiAccountCircleFill } from 'react-icons/ri'
import { RxExit } from 'react-icons/rx'
import { BsHouseGear } from 'react-icons/bs'

import './User.scss'
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../../firebase";
export default function User() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [getInfo, setGetInfo] = useState(false)
    const [settings, setSettings] = useState(false);
    const [changePassword, setChangePassword] = useState(false)


    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        }

        let session = getSession();
        setEmail(session.email);

        console.log("Your access token is: " + session.accessToken);
    }, [navigate]);

    const onLogout = () => {
        endSession();
        navigate("/login");
    }

    const styleImgLogo = {
        width: 80,
        height: 80,
        color: '#569bc4'
    }
    const styleImg = {
        width: 40,
        height: 40,
        color: '#569bc4'
    }

    const resetPassword = async (e) => {
        e.preventDefault()
        const emailValue = email;
        sendPasswordResetEmail(database, emailValue)
            .then(data => {
                alert('Check your gmail')
            }).catch(e => {
                alert(e.code)
            })
        setChangePassword(false)

    }



    return (
        <>
            <header>
                <nav className="navigation">
                    <MdOutlineWebhook style={{ ...styleImgLogo, cursor: 'pointer' }} onClick={
                        () => {
                            setChangePassword(false)
                            setGetInfo(false)
                        }
                    } />
                    <div className="user-info">
                        <div className="user-name">
                            <RiAccountCircleFill style={styleImg} />
                            <p>{email}</p>
                        </div>
                        <BsHouseGear style={styleImg} onClick={() => setSettings((prevValue) => !prevValue)} />
                        <RxExit style={styleImg} onClick={onLogout} />
                    </div>
                </nav>
            </header>
            <div className={`menu-burger ${settings ? 'active' : ''}`}>
                <ul className="menu-list" >
                    <li onClick={() => {
                        setGetInfo(false);
                        setSettings(false);
                        setChangePassword(true);

                    }}>
                        <p>Change password</p>
                    </li>
                    <li onClick={() => {
                        setChangePassword(false);
                        setSettings(false);
                        setGetInfo(true);
                    }}>
                        <p>Info</p>
                    </li>
                </ul>
            </div>
            {changePassword &&
                <div className="change-section">
                    <form onSubmit={resetPassword}>
                        <label htmlFor="">Change password section</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                        />
                        <button type="submit" onClick={() => {
                            setSettings(false);

                        }}>Change password</button>
                    </form>
                </div>}
            {getInfo &&
                <>
                    <div className="form-result">
                        <h3>Дані успішно сформовані</h3>
                        <p><span>ПІБ:</span> Шумельчук Ю.Г.</p>
                        <p><span>Група:</span> ІО-02</p>
                        <p><span>Факультет:</span> ФІОТ</p>
                        <p><span>Адреса:</span> м. Рівне</p>
                        <p><span>Telegram: </span>@shum_yura</p>
                    </div>
                </>}
            <div className="user-container"></div>
        </>
    );
};
