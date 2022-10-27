import React, { useContext, useState } from "react";
import { Menu, Dropdown  } from "antd"
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { URL_USER_SVC, LOGOUT, PROFILE, QUESTIONS, SIGNIN, DASHBOARD, DIFFICULTY } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_SUCCESS } from "../constants";
import { UserContext } from "../util/userContext";
import useAxios from "../util/useAxios";
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const axios = useAxios()
  const handleLogout = async () => {
    const res = await axios.post(URL_USER_SVC + LOGOUT, {withCredentials:true, credentials: "include"})
        .catch((err) => {
            if (err.response.status === STATUS_CODE_CONFLICT) {
                console.log("Error during log out")
            }
        })
    if (res && res.status === STATUS_CODE_SUCCESS) {
        localStorage.setItem("user",null)
        setUser(null)
        navigate(SIGNIN)
    }
}
  const profilemenu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>Hello, {user.username}</strong>

      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to={PROFILE} onClick={() => setIsOpen(!isOpen)}>
          <span>
            <i className="fe fe-user mr-2" />
            Account Settings
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item onClick={handleLogout} >
        <span>
          <i className="fe fe-log-out mr-2" />
          Logout
        </span>
      </Menu.Item>
    </Menu>
  )
  const matchmenu = (
    <Menu selectable={false}>
      <Menu.Item>
        <Link to={DIFFICULTY} state={{diff: 'Easy', name: user}} onClick={() => setIsOpen(!isOpen)}>
          <span>
            <i className="fe fe-user mr-2" />
            Easy
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to={DIFFICULTY} state={{diff: 'Medium', name: user}} onClick={() => setIsOpen(!isOpen)}>
          <span>
            <i className="fe fe-user mr-2" />
            Medium
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to={DIFFICULTY} state={{diff: 'Hard', name: user}} onClick={() => setIsOpen(!isOpen)}>
          <span>
            <i className="fe fe-user mr-2" />
            Hard
          </span>
        </Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="Navbar">
      <span className="nav-logo">Group 1</span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <Link to={DASHBOARD} onClick={() => setIsOpen(!isOpen)}>Home</Link>
        <Link to={QUESTIONS} onClick={() => setIsOpen(!isOpen)}>Questions</Link>
        <Dropdown overlay={matchmenu}>
          
          <div className="dropdown">
            <span style={{ marginRight: "5px",MarginLeft:"15px" }}>{"Match"}</span>
            <DownOutlined />
          </div>
          
        </Dropdown>
        <Dropdown overlay={profilemenu}>
          <div className="dropdown">
            <span style={{ marginRight: "5px",MarginLeft:"15px" }}>{"Profile"}</span>
            <DownOutlined />
          </div>
          
        </Dropdown>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;