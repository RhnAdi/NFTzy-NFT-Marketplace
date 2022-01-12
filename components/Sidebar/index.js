import DashboardIcon from "@/icons/DashboardIcon"
import FavoriteIcon from "@/icons/FavoriteIcon"
import SettingIcon from "@/icons/SettingIcon"
import MarketIcon from "@/icons/MarketIcon"
import FolderIcon from "@/icons/FolderIcon"
import WalletIcon from "@/icons/WalletIcon"
import ImageIcon from "@/icons/ImageIcon"
import styles from "./Sidebar.module.css"
import colors from "tailwindcss/colors"
import TimeIcon from "@/icons/TimeIcon"
import TopIcon from "@/icons/TopIcon"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Sidebar({active}){
   const [activeMenu, setActiveMenu] = useState(active);
   const menu = [
      { title: "Dashboard", href: "/", icon: <DashboardIcon color={colors.blue[(activeMenu == "Dashboard")? 600 : 100]} width={24} height={24} /> },
      { title: "Market", href: "/market", icon: <MarketIcon color={colors.blue[(activeMenu == "Market")? 600 : 100]} width={24} height={24} /> },
      { title: "Artist", href: "/", icon: <TopIcon color={colors.blue[(activeMenu == "Artist")? 600 : 100]} width={24} height={24} /> },
      { title: "Saved", href: "/", icon: <FavoriteIcon color={colors.blue[(activeMenu == "Saved")? 600 : 100]} width={24} height={24} /> },
      { title: "Create", href: "/create", icon: <ImageIcon color={colors.blue[(activeMenu == "Create")? 600 : 100]} width={24} height={24} /> },
   ]
   
   const menu_account = [
   { title: "Collections", href: "/", icon: <FolderIcon color={colors.blue[(activeMenu == "My Collections")? 600 : 100]} width={24} height={24} /> },
   { title: "Wallet", href: "/accounts/wallet", icon: <WalletIcon color={colors.blue[(activeMenu == "Wallet")? 600 : 100]} width={24} height={24} /> },
   { title: "History", href: "/", icon: <TimeIcon color={colors.blue[(activeMenu == "History")? 600 : 100]} width={24} height={24} /> },
   { title: "Setting", href: "/", icon: <SettingIcon color={colors.blue[(activeMenu == "Setting")? 600 : 100]} width={24} height={24} /> },  
   
   ]
   
   const _handleMenu = (x) => {
      setActiveMenu(x)
   }

   return(
      <div className="fixed bg-gray-900 text-gray-100 h-screen w-64 z-50 shadow-md shadow-gray-800 hidden lg:block">
         <div className="py-8 flex pl-4">
            <Image src="/logo.png" width={32} height={32} alt="Logo" />
            <span className="title text-xl font-bold ml-4">NFTzy</span>
         </div>
         <div className="">
            <p className="pl-4 py-2 tracking-widest text-gray-300 text-md">Marketplace</p>
            {
               menu.map((menuItem, index) => {
                  return(
                     <Link key={index} href={menuItem.href}>
                     <a 
                        className={`flex mx-4 px-3 py-2 my-1 items-center rounded relative ${menuItem.title == activeMenu? "bg-gray-800": "text-gray-300"} cursor-pointer`}
                        onClick={() => _handleMenu(menuItem.title)}
                     >
                        <div className="mr-4 shadow-md">
                           { menuItem.icon }
                        </div>
                        <span className="text-lg">
                           { menuItem.title }
                        </span>
                     </a>
                     </Link>
                  )
               })
            }
         </div>
         <div className="">
            <p className="pl-4 py-2 tracking-widest text-gray-300 text-md">Accounts</p>
            {
               menu_account.map((menuItem, index) => {
                  return(
                     <Link href={menuItem.href} key={index} >
                     <a className={`flex mx-4 px-3 rounded py-2 my-1 items-center relative ${menuItem.title == activeMenu? "bg-gray-800": "text-gray-300"} cursor-pointer`}
                     onClick={() => _handleMenu(menuItem.title)}>
                        <div className="mr-4">
                           { menuItem.icon }
                        </div>
                        <span className="text-xl">
                           { menuItem.title }
                        </span>
                     </a>
                     </Link>
                  )
               })
            }
         </div>
      </div>
   )
}
