import React, { useEffect, useState } from 'react'
import "./header.css"
import { NavLink } from "react-router-dom"
import axios from "axios"

const Headers = () => {
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    // logoout
    const logout = ()=>{
        window.open("http://localhost:6005/logout","_self")
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
        <header>
          <nav>
            <div className="left">
              <h1 className='color:"#ff4081"'>Event<sup>Manage</sup></h1>
            </div>
            <div className="right">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                {Object?.keys(userdata)?.length > 0 ? (
                  <>
                    <li className="user-info">
                      <span className="user-name">{userdata?.displayName}</span>
                      <img
                        src={userdata?.image}
                        alt="User"
                        className="user-image"
                      />
                    </li>
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li onClick={logout} className="logout-button">
                      Logout
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </header>
      </>
      
    )
}

export default Headers