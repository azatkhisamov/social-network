import React from "react";
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import Friends from "./Friends/Friends";


const Navbar = (props) => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div className={s.item}>
        <a href='/feed'>News</a>
      </div>
      <div className={s.item}>
        <a href='/music'>Music</a>
      </div>
      <div className={s.item}>
        <a href='/settings'>Settings</a>
      </div>
      <h2>Friends</h2>
      <div className={s.friends}>
        {props.friends.map(item => <Friends key={item.id} avatarUrl={item.avatarUrl} name={item.name} />)}
      </div>
    </nav>
  );
};

export default Navbar;
