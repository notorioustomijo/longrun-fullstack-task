import { useRef } from 'react';
import searchIcon from '../assets/search.svg';

export default function SearchBar({ value, onChange }) {
    const searchRef = useRef(null);

    return (
        <div 
            onClick={() => searchRef.current.focus()}
            className="
            w-[100%] 
            bg-white
            px-4
            py-3
            shadow-[0_1px_4px_rgba(0,0,0,0.15)]
            relative
            rounded
            cursor-text
        ">
            <img 
                src={searchIcon} 
                className="
                    h-[24px] 
                    w-[24px]
                    absolute
                    top-3
                    left-4
                " 
            />
            <input 
                ref={searchRef}
                type="text"
                name="search"
                id="search"
                value={value}
                placeholder="Product name"
                onChange={e => onChange(e.target.value)}
                className="ml-8 outline-none w-full bg-transparent"
            />
        </div>
    )
}