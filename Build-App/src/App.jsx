import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ItemsList from './ItemsList';
import UpdateButton from './UpdateButton';
import Home from './Home';
import Blog from './Blog';
import Contact from './Contact';

const App = () => {
  return (
    <div>
      <h1>React Project</h1>
      <h2>Course List</h2>
      <ItemsList />
      <hr />

      <h2>Update Button</h2>
      <UpdateButton />
       <hr />

      <nav style={{marginBottom:'20px'}}>
        <Link to="/" style={{marginRight:'10px'}}>Home</Link>
        <Link to="/blog" style={{marginRight:'10px'}}>Blog</Link>
        <Link to="/contact">Contact us</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      

      
    </div>
  );
};

export default App;

