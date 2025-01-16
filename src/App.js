import {Route, Routes } from 'react-router-dom';


import Signup from './components/Signup';
import Signin from './components/Signin';




function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<Signup />}/>
   <Route path='/login' element={<Signin />}/>
   </Routes>
  
  {/* <Navbar /> */}
   </>
  );
}

export default App;
