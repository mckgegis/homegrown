import React from 'react'
import { logout } from '../services/auth'

export const Profile = ({ history: {push} }) => {
    const handleLogOut = async () => {
        await logout();
        push("/auth/login");
    }
    return (
      <div>
        You're Logged In
        <fieldset style="height:100px; width:100px">
          {" "}
          <legend>Coding is Fun</legend>{" "}
        </fieldset>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    );
}