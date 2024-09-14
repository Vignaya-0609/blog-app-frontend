import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserLayout from './components/UserLayout';
import Blog from './components/Blog';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={
          <Home/>
        }/>
        <Route exact path='/register' element={
          <Register/>
        }/>
        <Route path='/user' element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='blog' element={<Blog />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
