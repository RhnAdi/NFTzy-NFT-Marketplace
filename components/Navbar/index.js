import NotificationIcon from "@/icons/NotificationIcon";
import SearchIcon from "@/icons/SearchIcon";
import MenuIcon from "@/icons/MenuIcon";
import UserIcon from "@/icons/UserIcon";
import colors from "tailwindcss/colors";
import { useState } from "react";
import Link from "next/link";
import ButtonWallet from "../ButtonWallet";
import DarkModeToggle from "../DarkModeToggle";

export default function Navbar({active}){
   const [sidebar, setSidebar] = useState(false);
   const menu = [
      { title: "Dashboard", href: "/" },
      { title: "Market", href: "/market" },
      { title: "Artist", href: "/" },
      { title: "Saved", href: "/" },
      { title: "Create", href: "/create" },
   ]
   const menu_account = [
      { title: "My Collections", href: "/" },
      { title: "Wallet", href: "/accounts/wallet" },
      { title: "History", href: "/" },
      { title: "Setting", href: "/" },  
   ]
   const [activeMenu , setActiveMenu] = useState(active);
   return(
      <div className="fixed z-40 bg-gray-900">
         <div className={`bg-gray-900 flex text-white lg:pl-72 md:px-10 sm:px-10 px-3 h-16 md:h-20 items-center justify-between shadow shadow-gray-800/50 gap-x-4 border-gray-700 absolute w-screen z-40`}>
            <div className="flex gap-x-2 items-center">
               <div className={`${sidebar? "bg-gray-800":null} p-2 rounded flex lg:hidden`} onClick={() => setSidebar(!sidebar)} >
                  <MenuIcon color={colors.gray[100]} width={24} height={24} />
               </div>
               <div className="items-center bg-gray-800 px-3 py-2 md:px-3 md:py-2 rounded lg:w-96 md:w-72 sm:w-64 lg:flex hidden">
                  <SearchIcon color={colors.gray[100]} width={24} height={24} />
                  <input placeholder="Search ..." className="bg-transparent outline-none ml-2 text-sm w-full" />
               </div>
            </div>
            <div className="flex md:gap-x-6 sm:gap-x-6 gap-x-3 sm:mr-5">
               <DarkModeToggle />
               <ButtonWallet />
               <button className="focus:bg-gray-800 p-2 rounded">
                  <NotificationIcon color={colors.gray[300]} width={24} height={24} />
               </button>
               <button className="focus:bg-gray-800 p-2 rounded">
                  <UserIcon color={colors.gray[300]} width={24} height={24} />
               </button>
            </div>
         </div>
         <div className={`z-20 bg-gray-900 absolute lg:pl-72 md:px-10 pl-3 pr-3 pt-20 shadow-md shadow-gray-800 w-64 h-screen text-gray-100 ${sidebar? "block": "hidden"}`}>
            <div className="flex gap-x-2 bg-gray-800 py-2 px-4 rounded mb-3">
               <SearchIcon color={colors.gray[100]} width={24} height={24} />
               <input placeholder="Search" className="w-full bg-transparent outline-none" />
            </div>
            <p className="tracking-widest text-gray-300 font-semibold mb-2">Marketplace</p>
            {
               menu.map((menuItem, index) => {
                  return(
                     <Link key={index} href={menuItem.href} >
                     <div className={`my-1 px-4 py-1 rounded cursor-pointer ${activeMenu == menuItem.title? "bg-gray-800 text-gray-100":"text-gray-300"}`} onClick={() => setActiveMenu(menuItem.title)}>
                        <p>{menuItem.title}</p>
                     </div>
                     </Link>
                  )
               })
            }
            <p className="tracking-widest text-gray-300 mt-3 font-semibold mb-2">Account</p>
            <div className="flex flex-col gap-y-2">
            {
               menu_account.map((menuItem, index) => {
                  return(
                     <Link key={index} href={menuItem.href} >
                     <a className={`px-4 py-1 rounded cursor-pointer ${activeMenu == menuItem.title? "bg-gray-800 text-gray-100":"text-gray-300"}`} onClick={() => setActiveMenu(menuItem.title)}>
                        <p>{menuItem.title}</p>
                     </a>
                     </Link>
                  )
               })
            }
            </div>
         </div>
      </div>
   )
}