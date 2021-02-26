import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../Images/logo.png";
import { Musiclists } from "../Services/MusicListData";
import MusicList from "./MusicList";

const MediaContainer = () => {
  const Styles = styled.div`
    img {
      width: 100%;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 0px 10px 0px;
      padding: 10px 25px;
      box-sizing: border-box;
    }
    a,
    .navbar-nav,
    .navbar-light .nav-link {
      color: #000;
      text-decoration: none;
      display: inline-flex;
      margin-right: 10px;
    }
    .navbar-brand {
      width: 15%;
    }
    .listView {
      display: inline-block;
      margin-right: 20px;
      margin-top: 20px;
      cursor: pointer;
    }
  `;

  return (
    <div>
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} />
          </Navbar.Brand>
        </Navbar>
        <MusicList data={Musiclists} />
      </Styles>
    </div>
  );
};

export default MediaContainer;
