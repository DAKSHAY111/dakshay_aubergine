import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [users, setUsers] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const [isNull, setIsNull] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const data = await response.json();
      console.log(data);
      setUsers(data.data);
      setIsNull(false);
    };
    getUsers();
  }, []);

  return (
    <>
  {!isNull &&
    users.map((user) => (
      <Link to={`/${user.id}`} key={user.id} style={{textDecoration:"none"}}>
        <div className="card">
          <img className="user-avatar" src={user.avatar} alt={user.first_name} />
          <div className="card-body">
            <h2 className="user-name">
              {user.first_name} {user.last_name}
            </h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </Link>
    ))}
</>
  );
};

export default Homepage;
