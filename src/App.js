import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import About from './Pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage/>} />
        <Route path="/:id" element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
