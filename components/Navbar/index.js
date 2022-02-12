import NotificationIcon from "@/icons/NotificationIcon";
import SearchIcon from "@/icons/SearchIcon";
import MenuIcon from "@/icons/MenuIcon";
import UserIcon from "@/icons/UserIcon";
import colors from "tailwindcss/colors";
import { useState, useEffect } from "react";
import Link from "next/link";
import ButtonWallet from "../ButtonWallet";
import DarkModeToggle from "../DarkModeToggle";
import { useSelector } from "react-redux";
import sortAddress from "utils/sortAddress";
import axios from "axios";
import { useRouter } from "next/router"

export default function Navbar({active}){
   const Router = useRouter();
   const [sidebar, setSidebar] = useState(false);
   const [keyword, setKeyword] = useState("");
   const menu = [
      { title: "Dashboard", href: "/" },
      { title: "Market", href: "/market" },
      { title: "Create", href: "/create" },
   ]
   const menu_account = [
      { title: "Profile", href: "/accounts/profile" },
      { title: "Wallet", href: "/accounts/wallet" },
      { title: "Setting", href: "/accounts/setting" },  
   ]
   const [activeMenu , setActiveMenu] = useState(active);

   const account = useSelector(state => state.accounts);

   return(
      <div className="fixed z-40">
         <div className={`bg-gray-50/60 dark:bg-gray-900/60 backdrop-filter backdrop-blur-lg flex text-white lg:pl-72 md:px-10 sm:px-10 px-3 h-16 md:h-20 items-center justify-between shadow shadow-gray-100/50 dark:shadow-gray-800/50 gap-x-4 absolute w-screen z-40`}>
            <div className="flex gap-x-2 items-center">
               <div className={`${sidebar? "bg-gray-200 dark:bg-gray-800":null} p-2 rounded flex lg:hidden`} onClick={() => setSidebar(!sidebar)} >
                  <MenuIcon color={colors.blue[700]} width={24} height={24} />
               </div>
               <div className="items-center bg-gray-200 dark:bg-gray-800 px-3 py-2 md:px-3 md:py-2 rounded lg:w-96 md:w-72 sm:w-64 lg:flex hidden">
                  <SearchIcon color={colors.blue[700]} width={24} height={24} />
                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        Router.push({pathname: "/market", query: { keyword: keyword } })
                     }}
                  >
                     <input placeholder="Search" className="bg-transparent outline-none ml-4 text-sm w-full text-gray-800 dark:text-gray-100" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                  </form>
               </div>
            </div>
            <div className="flex md:gap-x-6 sm:gap-x-6 gap-x-3 sm:mr-5">
               <DarkModeToggle />
               <ButtonWallet />
               <button className="focus:bg-gray-200 dark:focus:bg-gray-800 p-2 rounded" onClick={() => Router.push("/accounts/profile")}>
                  <UserIcon color={colors.blue[700]} width={24} height={24} />
               </button>
            </div>
         </div>
         <div className={`z-20 bg-gray-50/60 dark:bg-gray-900/60 backdrop-filter backdrop-blur-lg absolute lg:pl-72 md:px-10 pl-3 pr-3 pt-20 shadow-md shadow-gray-100 dark:shadow-gray-800 w-64 h-screen text-gray-100 ${sidebar? "block": "hidden"}`}>
            <div className="flex gap-x-4 bg-gray-300/50 dark:bg-gray-900/50 backdrop-filter backdrop-blur-lg py-2 px-4 rounded mb-3">
               <SearchIcon color={colors.blue[700]} width={24} height={24} />
               <form 
                  onSubmit={(e) => {
                     e.preventDefault();
                     Router.push({pathname: "/market", query: { keyword: keyword }})
                  }}
               >
               <input placeholder="Search" className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
               </form >
            </div>
            <p className="tracking-widest text-gray-600 text-gray-500 dark:text-gray-300 mb-2 font-medium">Marketplace</p>
            {
               menu.map((menuItem, index) => {
                  return(
                     <Link key={index} href={menuItem.href} >
                     <div className={`my-1 px-4 py-1 rounded cursor-pointer text-lg font-medium ${activeMenu == menuItem.title? "bg-blue-700 text-gray-100 dark:text-gray-100":"text-gray-600 dark:text-gray-300"}`} onClick={() => setActiveMenu(menuItem.title)}>
                        <p>{menuItem.title}</p>
                     </div>
                     </Link>
                  )
               })
            }
            <p className="tracking-widest text-gray-500 dark:text-gray-300 mt-3 font-medium mb-2">Account</p>
            <div className="flex flex-col gap-y-2">
            {
               menu_account.map((menuItem, index) => {
                  return(
                     <Link key={index} href={menuItem.href} >
                     <a className={`px-4 py-1 rounded cursor-pointer text-lg font-medium ${activeMenu == menuItem.title? "bg-blue-700 text-gray-100":"text-gray-600 dark:text-gray-300"}`} onClick={() => setActiveMenu(menuItem.title)}>
                        <p>{menuItem.title}</p>
                     </a>
                     </Link>
                  )
               })
            }
            </div>
            <div className="bg-blue-700 shadow-lg shadow-blue-700n rounded-lg mt-10">
               <div className="flex items-center px-6 py-3 gap-x-3">
                  <div className="flex my-auto flex-col">
                     <p className="text-gray-100">Account</p>
                     <p className="text-gray-200">{account? sortAddress(account) : "Nothing address"}</p>
                  </div>
               </div>
            </div>
         </div>
            
      </div>
   )
}
