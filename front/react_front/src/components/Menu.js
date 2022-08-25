import { useState, useRef, useEffect } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { Dialog, DialogContent } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
//お気に入りページのLink修正必要(現段階ではとりあえずHomeに設定)
//headerにおくメニューコンポーネント
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
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

  return (
    <>
      <div ref={dropdownRef} className="relative inline-block text-left">
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            onClick={() => setShowDialogue(true)}
          >
            MENU
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#4B5563"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>

        <Dialog
        className="dialog"
          open={showDialogue}
          fullWidth
          maxWidth="md"
          PaperProps={{
            style: {
              boxShadow: "none",
              textAlign: "center",
              width: "auto",
            },
          }}
        >
          <ClearIcon
            onClick={() => setShowDialogue(false)}
            className="menu-quit"
          />
          <DialogContent>
            <div className="menu-container">
              <NavLink to="/home" className="menu-list">
                イベントマップ
              </NavLink>
              <NavLink to="/favorite" className="menu-list">
                お気に入りリスト
              </NavLink>
              <NavLink to="" className="menu-list">
                Google カレンダー連携
              </NavLink>
              <NavLink to="" className="menu-list">
                ログアウト
              </NavLink>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Menu;
