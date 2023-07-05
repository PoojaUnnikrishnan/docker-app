// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home';
import Register from './Components/Register';
import List from './Components/List';

import TreeDirectory from "./Components/TreeDirectory";
function App() {
  return (
    <div className='font-serif'>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/tree" element={<TreeDirectory />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
