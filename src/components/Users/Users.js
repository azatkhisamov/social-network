import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import * as axios from "axios";

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    axios
        .get("https://social-network.samuraijs.com/api/1.0/users?page=4")
        .then((responce) => this.props.setUsers(responce.data.items));
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.props.users.map((user) => (
          <User
            key={user.id}
            info={user}
            followUnfollow={this.props.followUnfollow}
          />
        ))}
        <button>Show more</button>
      </div>
    );
  }
}

export default Users;
