import React,{useState} from "react";
import { Link,useHistory } from "react-router-dom";
const AuthContext=React.createContext({
    token:"",
    isLoggedin:false,
    Login:(token)=>{},
    Logout:()=>{},
});

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token');
const [token,setToken]=useState(initialToken);
const userIsLoggedIn=!!token;
const history=useHistory();
const loginHandler=(token)=>{
    localStorage.setItem('token',token);
    setToken(token);

}
const logoutHandler=()=>{
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokend');
    localStorage.removeItem('loginTimeStamp');
    // history.replace("/auth");
    <Link to='/auth'></Link>;

}

const contextValue={
    token:token,
    isLoggedin:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler,

}
    return (<AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>);
};

export default AuthContext;

