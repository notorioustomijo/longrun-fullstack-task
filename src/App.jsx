import { Routes, Route } from 'react-router-dom';
import Inventory from './page/Inventory';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <main className="
      flex
      gap-12
      h-full
      bg-[#F9FBFE]
    ">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </main>
  )
}

export default App
