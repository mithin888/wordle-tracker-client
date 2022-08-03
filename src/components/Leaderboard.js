import React, { useState, useEffect, useContext } from "react";
import FilterContext from './../context/filter-context';

import api from "../api/api";

import UserList from "./UserList";

import classes from "./Leaderboard.module.css";


const Leaderboard = () => {

  const [weekly, setWeekly] = useState(true);
  const [monthly, setMonthly] = useState(false);
  const [all, setAll] = useState(false);
  const [users, setUsers] = useState([]);

  const ctx = useContext(FilterContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${api}/leaderboard/${ctx.filter}`, {
          headers: {
            'Authorization': process.env.REACT_APP_AUTH,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const userList = await response.json();
        setUsers(userList.sort((a, b) => {
          return a.score - b.score;
        }));
      }
      catch (err) {
        console.log(err);
      }
    })();
  }, [ctx.filter]);


  const weeklyHandler = () => {
    setWeekly(true);
    setMonthly(false);
    setAll(false);
    ctx.filter = '7';
  };
  const monthlyHandler = () => {
    setMonthly(true);
    setWeekly(false);
    setAll(false);
    ctx.filter = '30';
  };
  const allHandler = () => {
    setAll(true);
    setWeekly(false);
    setMonthly(false);
    ctx.filter = 'all';
  };

  // const sentenceCase = filter.substring(0, 1).toUpperCase() + filter.substring(1);

  return (
    <React.Fragment>
      <div className={`container px-0 pb-2 my-3 ${classes.container}`}>

        {/* Settings Icon */}
        {/* <div className={`w-100 m-auto row justify-content-end`}>
          <div className={`col-1 mt-3 ps-0 justify-content-center`}>
            <i className={`fa-solid fa-gear ${classes.icon}`}></i>
          </div>
        </div> */}

        <h1 className="text-center p-5 mb-3">Wordle<br /> Leaderboard</h1>
        {/* // <----- dropdown style filters -----> */}
        {/* <div className="row justify-content-end pb-2">
          <div className="col-4 text-end dropdown">
            <button className="mt-2 btn dropdown-toggle pe-4" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="pe-2">{sentenceCase}</span>
            </button>
            <div class="dropdown-menu">
              <button className={`${classes.button} ${weekly && classes.active} dropdown-item`} onClick={weeklyHandler}>Weekly</button>
              <button className={`${classes.button} ${monthly && classes.active} dropdown-item`} onClick={monthlyHandler}>Monthly</button>
              <button className={`${classes.button} ${all && classes.active} dropdown-item`} onClick={allHandler}>All Time</button>
            </div>
          </div>
        </div> */}
        {/* <-------- Original --------> */}
        {/* <div className={`row m-auto pb-2 justify-content-center d-flex justify-content-around`}>
          <button onClick={weeklyHandler} className={`col-4 px-0 btn ${classes.button} ${weekly && classes.active}`}>Weekly</button>
          <button onClick={monthlyHandler} className={`col-4 px-0 btn ${classes.button} ${monthly && classes.active}`} >Monthly</button>
          <button onClick={allHandler} className={`col-4 px-0 btn ${classes.button} ${all && classes.active}`}>All Time</button>
        </div> */}
        {/* <----- Tabs ----->*/}

        <div className="tabs is-centered is-boxed m-0">
          <ul>
            <li href="#weekly" className={`${classes.tab} ${weekly ? "is-active" : ""}`} onClick={weeklyHandler}><a className={classes.tab} href="#weekly">Last 7 Days</a></li>
            <li href="#monthly" className={`${classes.tab} ${monthly ? "is-active" : ""}`} onClick={monthlyHandler}><a href="#monthly">Last 30 Days</a></li>
            <li href="#all" className={`${classes.tab} ${all ? "is-active" : ""}`} onClick={allHandler}><a href="#all">All Time</a></li>
          </ul>
        </div>
        {/* <----- Legend Below ----->*/}
        <div className={`row m-auto pt-2 ${classes['tab-header']}`}>
          <span className="col-2 text-center ps-4 pe-0 ms-1">Rank</span>
          <span className="col-6 ms-4 ps-1">User</span>
          <span className="col-3 ms-0 ps-0 text-center">Avg Guess</span>
        </div>
        <div className={`pt-1 ${classes['tab-body']}`}>
          <UserList users={users} />
        </div>

      </div>
    </React.Fragment>
  );
};

export default Leaderboard;