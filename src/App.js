import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NotesState from './context/notes/NotesState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AlertState from './context/alert/AlertState';
import contextValue from './context/alert/AlertContext';
import { useContext } from 'react';
function App() {
  console.log(alert)
  return (
    <>
    <AlertState>
    <NotesState>
    <Router>
      {/* Header Of our web app */}
      <header>
        <Navbar/>
        <Alert />

      </header>

      <Routes>
        <Route exact path="/" element={<main><Home/></main>}></Route>
        <Route exact path="/about" element={<main><About/></main>}></Route>
        <Route exact path="/login" element={<main><Login /></main>}></Route>
        <Route exact path="/signup" element={<main><SignUp/></main>}></Route>
      </Routes>

    </Router>
    </NotesState>
    </AlertState>
    </>  
  );
}

export default App;
