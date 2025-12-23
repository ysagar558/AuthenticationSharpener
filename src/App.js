import logo from './logo.svg';
import './App.css';
import {useContext,useEffect} from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/Profile/UserProfile';
import AuthContext from './store/auth-context';

function App() {
  const ctx=useContext(AuthContext);
  useEffect(()=>{
    const checkToken=async ()=>{
      if(!ctx.token) return;
      try{
        const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog',{
          method:'POST',
          body:JSON.stringify({idToken:ctx.token}),
          headers:{'Content-Type':'application/json'},
        });
        if(!res.ok) ctx.logout();
      }
      catch{
        ctx.logout();
      }
    };
    checkToken();
  },[ctx]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!ctx.isLoggedin && <Route path='/auth'>
          <AuthPage />
        </Route>}
        {ctx.isLoggedin && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
