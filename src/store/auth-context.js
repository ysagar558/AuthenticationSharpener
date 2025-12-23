import React,{useState} from "react";
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
const loginHandler=(token)=>{
    localStorage.setItem('token',token);
    setToken(token);

}
const logoutHandler=()=>{
    setToken(null);
    localStorage.removeItem('token');

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

