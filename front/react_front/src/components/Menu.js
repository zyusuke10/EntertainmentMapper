import { useState, useRef, useEffect } from 'react'
import './Menu.css'
import Icon from './logout.svg'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    
    return(
        <>
            <div ref={dropdownRef} className="relative inline-block text-left">
                <span className="rounded-md shadow-sm">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded={isOpen}>
                    MENU
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4B5563">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </button>
                </span>
                
                {isOpen && (
                  
                    <li class="gnavi__list">
                    <ul class="dropdown__lists">
                      
                        <li class="dropdown__list"><a href="#">イベントマップ</a></li>
                        <li class="dropdown__list"><a href="#">お気に入りのイベント</a></li>
                        <li class="dropdown__list"><a href="#">Googleカレンダー連携</a></li>
                        <li class="dropdown__list"><a href="#">ログアウト<img class="text_img" src={Icon}></img></a></li>
                    </ul>
                </li>
                )}
            </div>
        </>
    )
}

export default Menu
