import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // user가 존재한다면 userObj에 user정보 업데이트
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={userObj} userObj={userObj} />
       : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
