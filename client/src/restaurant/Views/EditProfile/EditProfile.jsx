import React from 'react'
import styles from './EditProfile.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import validationPass from './validationPass'
const endPoint = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios'
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { logoutByUser } from '../../../redux/actions/action'
import { NavLink, useNavigate } from "react-router-dom";

function EditProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userAuth = useSelector((state) => state.userAuth)
    const [passData, setPassData] = useState({
        actualPass: '',
        newPass: '',
        repeatPass: '',
    })
    const [errorPass, setErrorPass] = useState({
        actualPass: '',
        newPass: '',
        repeatPass: '',
        empty: true,
    })

    const defaultError = {
        actualPass: '',
        newPass: '',
        repeatPass: '',
        empty: false,
    }
    // console.log(passData);
    console.log(errorPass);
    const handleFormPass = (event) => {

        const value = event.target.value;
        const name = event.target.id;
        setPassData({
            ...passData, [name]: value
        });
        setErrorPass(validationPass({
            ...passData, [name]: value
        }))

    }

    const handleSubmit = async () => {
        if (Object.keys(userAuth).length > 0) {
            console.log(userAuth.data.idUser);
        }
        event.preventDefault();
        if (JSON.stringify(errorPass) === JSON.stringify(defaultError)) {

            try {
                if (Object.keys(userAuth).length > 0) {
                    const data = await axios.patch(endPoint + `/updatepassword/${userAuth.data.idUser}`, {
                        "oldPassword": passData.actualPass,
                        "newPassword": passData.newPass
                    })
                    console.log(data.status);
                    if (parseInt(data.status) === 200) {
                        setPassData({
                            actualPass: '',
                            newPass: '',
                            repeatPass: '',
                        })

                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Password changed successfully",
                        });

                        navigate("/login");
                    }
                    dispatch(logoutByUser()); //limpia el estado global userLogued y userAuth

                }
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: "Password Invalid",
                });
            }
        }
    }



    return (
        <div className={styles.bigDiv}>
            <div className={styles.formPassword}>
                <h2>Edit Password</h2>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="actualPass" className="form-label">Old password</label>
                        <input type="password" className="form-control" id="actualPass" aria-describedby="emailHelp" onChange={handleFormPass} value={passData.actualPass} />
                        {
                            errorPass.actualPass.length > 0 ? (
                                <div id="emailHelp" className={styles.fullDiv}>{errorPass.actualPass}</div>
                            ) : (
                                <div id="emailHelp" className={styles.emptyDiv}></div>
                            )
                        }

                    </div>
                    <div className="mb-3">
                        <label for="newPass" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="newPass" aria-describedby="emailHelp" onChange={handleFormPass} value={passData.newPass} />
                        {
                            errorPass.newPass.length > 0 ? (
                                <div id="emailHelp" className={styles.fullDiv}>{errorPass.newPass}</div>
                            ) : (
                                <div id="emailHelp" className={styles.emptyDiv}></div>
                            )
                        }


                    </div>
                    <div className="mb-3">
                        <label for="repeatPass" className="form-label">Confirm new password</label>
                        <input type="password" className="form-control" id="repeatPass" aria-describedby="emailHelp" onChange={handleFormPass} value={passData.repeatPass} />
                        {
                            errorPass.repeatPass.length > 0 ? (
                                <div id="emailHelp" className={styles.fullDiv}>{errorPass.repeatPass}</div>
                            ) : (
                                <div id="emailHelp" className={styles.emptyDiv}></div>
                            )
                        }
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile