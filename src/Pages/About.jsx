import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import html2canvas from 'html2canvas';

const About = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const handlePageDownload = () => {
    const fileName = `${user.first_name}_${user.last_name}.jpeg`;

    html2canvas(document.querySelector(`#userCard-${user.id}`)).then(canvas => {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      link.click();
    });
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
        <div className="card" id={`userCard-${user.id}`}>
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
