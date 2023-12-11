import style from "./Comments.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios"
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const endPoint = import.meta.env.VITE_BACKEND_URL;
export const Comments = () => {
  const datauser = JSON.parse(localStorage.getItem('sesion'));
  if (!datauser) {
    return <Navigate to="/" />;
  }
  const [formData, setFormData] = useState({
    name: datauser.nameUser,
    email: datauser.email,
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await axios.post(endPoint + "/sendEmail", formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your comment has been submitted successfully.",
      });

      setFormData({
        name: datauser.nameUser,
        email: datauser.email,
        comment: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className={style.containerCardComments}>
      <p className={style.description}>
        We would love to hear your opinion. <br></br>Please leave your comment below<br></br> and feel free to share anything you find necessary.
        
      </p>
      <div className={style["card"]}>
        <span className={style.title}>Leave a Comment</span>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.group}>
            <textarea
              placeholder=""
              id="comment"
              name="comment"
              rows="5"
              required
              value={formData.comment}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="comment">Comment</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );  
};
