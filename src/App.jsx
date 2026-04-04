import { Routes, Route } from 'react-router-dom';
import Inventory from './page/Inventory';

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </main>
  )
}

export default App
