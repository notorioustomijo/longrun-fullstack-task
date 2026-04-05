import { Routes, Route } from 'react-router-dom';
import Inventory from './page/Inventory';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="
      flex
      h-screen
      bg-[#F9FBFE]
      gap-12
    ">
      <Sidebar />
      <main className="
        flex-1
        ml-[8.5rem]
        mr-[2rem]
        md:ml-[18rem]
        md:mr-[4rem]
        h-screen
        overflow-y-auto
      ">
        <Routes>
          <Route path="/" element={<Inventory />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
