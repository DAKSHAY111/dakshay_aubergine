import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import html2canvas from 'html2canvas';
import {saveAs} from  'file-saver';
import { useRef } from "react";

const About = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const pageRef = useRef(null);

    const handlePageDownload = () => {
      const fileName = `${user.first_name} ${user.last_name}.jpeg`;

      html2canvas(document.querySelector("#page")).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, fileName);
        });
      }
      );

    };


  const [isNull, setIsNull] = useState(true);

  const { id } = useParams();


  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();
      console.log(data);
      setUser(data.data);
      setIsNull(false);
      console.log(id);
    };
    getUsers();
  }, []);

  return (
    <>
      {!isNull && (
        <div className="card">
          <img src={user.avatar} alt={user.first_name}  className="user-avatar" />
          <div className="card-body">
            <h2 className="user-name">
              {user.first_name} {user.last_name}
            </h2>
            <p className="user-email">{user.email}</p>
          </div>
          <button className="btn" onClick={handlePageDownload}>
            Download
          </button>
        </div>
      )}
    </>
  );
};

export default About;
