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
            {/* Mobile nav, >=768px */}
            <nav className="
                w-[6.75rem]
                h-[100vh]
                flex
                flex-col
                items-center
                gap-8
                md:hidden
                bg-white
                shadow-[0_2px_14px_rgba(0,0,0,0.04)]
                border-b
                border-[#F3F8FD]
            ">
                <div className="
                    flex
                    px-4
                    py-6
                ">
                    <img src={logoSmall} />
                </div>
                <div className="
                    pt-8
                    flex
                    flex-col
                    gap-4
                ">
                    <a href="/" className={`
                        px-4
                        py-3
                        ${isInventory ? 'bg-[#F9FBFE]' : ''}
                    `}
                    >
                        <img src={isInventory ? inventoryBlue : inventoryGrey} />
                    </a>
                    <a href="/tasks" className={`
                        px-4
                        py-3
                        ${isTask ? 'bg-[#F9FBFE]' : ''}
                    `}>
                        <img src={isTask ? taskBlue : taskGrey} />
                    </a>
                </div>
            </nav>

            {/* Tab - Desktop Breakpoint (>= 768px) */}
            <nav className="
                hidden
                md:flex
                w-[15rem]
                h-[100vh]
                flex-col
                items-center
                gap-8
                bg-white
                shadow-[0_2px_14px_rgba(0,0,0,0.04)]
            ">
                <div className="
                    flex
                    px-4
                    py-6
                    border-b-2
                    border-[#F3F8FD]
                ">
                    <img src={logo} />
                </div>
                <div className="
                    pt-8
                    flex
                    flex-col
                    gap-4
                ">
                    <a href="/" className={`
                        px-4
                        py-3
                        w-[13.875rem]
                        flex
                        justify-center
                        gap-2
                        font-semibold
                        text-[#0163C6]
                        rounded-sm
                        items-center
                        ${isInventory ? 'bg-[#F9FBFE]' : ''}
                    `}>
                        <img src={isInventory ? inventoryBlue : inventoryGrey} className="
                            w-[18px]
                            h-[18px]
                        "/>
                        Inventory
                    </a>
                    <a href="/tasks" className={`
                        px-4
                        py-3
                        w-[13.875rem]
                        flex
                        justify-center
                        gap-2
                        rounded-sm
                        items-center
                        ${isTask ? 'bg-[#F9FBFE]' : ''}
                    `}>
                        <img src={isTask ? taskBlue : taskGrey} className="
                            w-[18px]
                            h-[18px]
                        "/>
                        Tasks
                    </a>
                </div>
            </nav>
        
        </>
    )
}

