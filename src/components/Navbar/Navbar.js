import React from "react";
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import Friends from "./Friends/Friends";
import { connect } from "react-redux/es/exports";


const Navbar = (props) => {
  return (
    <nav className={s.nav}>
      {props.userId ? <div className={s.item}>
        <NavLink to={`/profile`}>Profile</NavLink>
      </div> : <div style={{display: 'none'}}></div>}
      <div className={s.item}>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users'>Find users</NavLink>
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
        {props.navbar.friends.map(item => <Friends key={item.id} avatarUrl={item.avatarUrl} name={item.name} />)}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    navbar: state.navbar,
    userId: state.auth.id,
  }
}

const NavbarContainer = connect(mapStateToProps)(Navbar);

export default NavbarContainer;
