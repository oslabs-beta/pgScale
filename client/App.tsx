
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Databases from './containers/Databases';
import Dashboard from './containers/Dashboard';
import DataModels from './containers/DataModels';
import Tests from './containers/Tests';
import Queries from './containers/Queries';
import NotFound from './containers/NotFound';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';
import { authenticateUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from './features/store';

const App = (props) => {


  const user = useSelector((state: RootState) => { return state.user })
  // fetch to get cookies and authenticate  
    // if theyre authenticated we can update the database initail state
  useEffect(() => {
    fetch('/api/user/authenticate')
      .then(res => res.json())
      .then(data => {
        if (data.statusCode === 200) {
          authenticateUser(true);
        }
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  // export const authenticateUser = async () => {
//   try {
//     const response = await fetch('/api/user/authenticate')
//       .then(res => res.json());
//   }

// }

  /*
    make a fetch to the server to check if the user cookies are authenticated 
  */
  const auth = { isAuthenticated: user.auth.isAuthenticated }
  return (
    <BrowserRouter>
      <Routes>
        {/* change this to dashboard later  */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<SignUpForm/>} />
        <Route path='about' element={<div>About</div>} />
  
        {/* <Route path='signup' element={<SignUpForm handleCloseFunc={()=>console.log('hi')}/>} /> */}
        <Route element={<PrivateRoute auth={auth}/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='queries' element={<Queries/>}/>
          <Route path='tests' element={<Tests/>}/>
          <Route path='database' element={<Databases/>}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 