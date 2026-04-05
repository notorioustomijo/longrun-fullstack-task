// Sidebar.jsx
import { useLocation } from 'react-router-dom';
import logo from '../assets/shelfie-logo.svg';
import logoSmall from '../assets/shelfie-logo_sm.svg';
import inventoryBlue from '../assets/inventory-blue.svg';
import inventoryGrey from '../assets/inventory-grey.svg';
import taskBlue from '../assets/task-blue.svg';
import taskGrey from '../assets/task-grey.svg';

export default function Sidebar() {
    const { pathname } = useLocation();

    const isInventory = pathname === '/';
    const isTask = pathname === '/tasks';

    return (
        <>
            {/* Mobile — hidden at md and above */}
            <nav className="
                fixed top-0 left-0 z-40
                w-[6.75rem] h-screen
                flex flex-col items-center gap-8
                md:hidden
                bg-white shadow-[0_2px_14px_rgba(0,0,0,0.04)]
            ">
                <div className="flex px-4 py-6">
                    <img src={logoSmall} />
                </div>
                <div className="pt-8 flex flex-col gap-4">
                    <a href="/" className={`px-4 py-3 ${isInventory ? 'bg-[#F9FBFE]' : ''}`}>
                        <img src={isInventory ? inventoryBlue : inventoryGrey} />
                    </a>
                    <a href="/tasks" className={`px-4 py-3 ${isTask ? 'bg-[#F9FBFE]' : ''}`}>
                        <img src={isTask ? taskBlue : taskGrey} />
                    </a>
                </div>
            </nav>

            {/* Medium — shown between md and lg (icons only, no text) */}
            <nav className="
                fixed top-0 left-0 z-40
                w-[5rem] h-screen
                hidden md:flex lg:hidden
                flex-col items-center gap-8
                bg-white shadow-[0_2px_14px_rgba(0,0,0,0.04)]
            ">
                <div className="flex px-4 py-6 border-b-2 border-[#F3F8FD] w-full justify-center">
                    <img src={logoSmall} />
                </div>
                <div className="pt-8 flex flex-col gap-4">
                    <a href="/" className={`px-4 py-3 rounded-sm flex justify-center ${isInventory ? 'bg-[#F9FBFE]' : ''}`}>
                        <img src={isInventory ? inventoryBlue : inventoryGrey} className="w-[18px] h-[18px]" />
                    </a>
                    <a href="/tasks" className={`px-4 py-3 rounded-sm flex justify-center ${isTask ? 'bg-[#F9FBFE]' : ''}`}>
                        <img src={isTask ? taskBlue : taskGrey} className="w-[18px] h-[18px]" />
                    </a>
                </div>
            </nav>

            {/* Desktop — shown at lg and above (icons + text) */}
            <nav className="
                fixed top-0 left-0 z-40
                w-[15rem] h-screen
                hidden lg:flex
                flex-col items-center gap-8
                bg-white shadow-[0_2px_14px_rgba(0,0,0,0.04)]
            ">
                <div className="flex px-4 py-6 border-b-2 border-[#F3F8FD]">
                    <img src={logo} />
                </div>
                <div className="pt-8 flex flex-col gap-4">
                    <a href="/" className={`
                        px-4 py-3 w-[13.875rem]
                        flex justify-center gap-2 items-center
                        font-semibold text-[#0163C6] rounded-sm
                        ${isInventory ? 'bg-[#F9FBFE]' : ''}
                    `}>
                        <img src={isInventory ? inventoryBlue : inventoryGrey} className="w-[18px] h-[18px]" />
                        Inventory
                    </a>
                    <a href="/tasks" className={`
                        px-4 py-3 w-[13.875rem]
                        flex justify-center gap-2 items-center
                        rounded-sm
                        ${isTask ? 'bg-[#F9FBFE]' : ''}
                    `}>
                        <img src={isTask ? taskBlue : taskGrey} className="w-[18px] h-[18px]" />
                        Tasks
                    </a>
                </div>
            </nav>
        </>
    )
}