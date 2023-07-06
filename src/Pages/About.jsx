import React, { useEffect } from 'react'
import  { useState } from 'react';
import { useParams } from 'react-router-dom';

const About = () => {
    const [user,setUser] = useState({
        id: '',
        email: '',
        first_name: '',
        last_name: '',  
        avatar: ''
      });

    const [isNull,setIsNull] = useState(true);

    const {id} = useParams();

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            const data = await response.json();
            console.log(data);
            setUser(data.data);
            setIsNull(false);
            console.log(id);
        }
        getUsers();
    }, [])

  return (
    <>
    {!isNull && (
        <div className="card">
            <img src={user.avatar} alt={user.first_name} />
            <div className="card-body">
                <h2>{user.first_name} {user.last_name}</h2>
                <p>{user.email}</p>
            </div>
            
        </div>
    )}
    </>
  )
}

export default About