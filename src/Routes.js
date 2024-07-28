import App from "./App";
import SignIn from "./SigninPage";
import SignUp from "./SignupPage";
import React, { useState, useEffect } from "react";

const Routes = () => {
  const [currentPage, setCurrentPage] = useState("signIn");
  if (currentPage === "signIn") {
    return <SignIn loadPage={setCurrentPage} />;
  } else if (currentPage === "signUp") {
    return <SignUp loadPage={setCurrentPage} />;
  } else if (currentPage === "app") {
    return <App loadPage={setCurrentPage} />;
  }
};

export default Routes;

// {
//     name:"ruvi",
//     functionToCall:setCurrenPage,
// }

// const App = (props) => {

//     const handleClick = () => {
//         props.functionToCall()
//     }

//     return (<div>
//         <button onClick={handleClick}>Change things</button>
//         {props.name}
//     </div>)

// }

// const setCurrenPage = function() {}

// <App name="ruvi" functionToCall={setCurrenPage}/>
