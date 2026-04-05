// App.jsx
import { Routes, Route } from 'react-router-dom';
import Inventory from './page/Inventory';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-[#F9FBFE]">
      <Sidebar />
      <main className="
        flex-1
        ml-[6.75rem]
        md:ml-[5rem]
        lg:ml-[15rem]
        px-8
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