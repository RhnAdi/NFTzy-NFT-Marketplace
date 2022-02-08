// Components
import DashboardIcon from "@/icons/DashboardIcon"
import FavoriteIcon from "@/icons/FavoriteIcon"
import SettingIcon from "@/icons/SettingIcon"
import MarketIcon from "@/icons/MarketIcon"
import FolderIcon from "@/icons/FolderIcon"
import WalletIcon from "@/icons/WalletIcon"
import ImageIcon from "@/icons/ImageIcon"
import TimeIcon from "@/icons/TimeIcon"
import Image from "next/image"
import Link from "next/link"

// Utils
import { useSelector } from "react-redux"
import colors from "tailwindcss/colors"
import sortAddress from "../../utils/sortAddress"
import { useEffect, useState } from "react"

// Tools
import axios from "axios"

export default function Sidebar({active}){
   const [username, setUsername] = useState();
   const [photoProfile, setPhotoProfile] = useState();
   const [activeMenu, setActiveMenu] = useState(active);
   const menu = [
      { title: "Dashboard", href: "/", icon: <DashboardIcon color={colors.blue[(activeMenu == "Dashboard")? 600 : 300]} width={24} height={24} /> },
      { title: "Market", href: "/market", icon: <MarketIcon color={colors.blue[(activeMenu == "Market")? 600 : 300]} width={24} height={24} /> },
      // { title: "Artist", href: "/", icon: <TopIcon color={colors.blue[(activeMenu == "Artist")? 600 : 300]} width={24} height={24} /> },
      // { title: "Saved", href: "/", icon: <FavoriteIcon color={colors.blue[(activeMenu == "Saved")? 600 : 300]} width={24} height={24} /> },
      { title: "Create", href: "/create", icon: <ImageIcon color={colors.blue[(activeMenu == "Create")? 600 : 300]} width={24} height={24} /> },
   ]
   
   const menu_account = [
   { title: "Profile", href: "/accounts/profile", icon: <FolderIcon color={colors.blue[(activeMenu == "Profile")? 600 : 300]} width={24} height={24} /> },
   { title: "Wallet", href: "/accounts/wallet", icon: <WalletIcon color={colors.blue[(activeMenu == "Wallet")? 600 : 300]} width={24} height={24} /> },
   // { title: "History", href: "/", icon: <TimeIcon color={colors.blue[(activeMenu == "History")? 600 : 300]} width={24} height={24} /> },
   { title: "Setting", href: "/accounts/setting", icon: <SettingIcon color={colors.blue[(activeMenu == "Setting")? 600 : 300]} width={24} height={24} /> },  
   ]

   const account = useSelector(state => state.accounts);

   useEffect(() => {
      (async () => {
         if(account){
            try {
               const res = await axios.get(`/api/user/${account}`);
               setUsername(res.data.data.username);
               setPhotoProfile(res.data.data.photo_profile)
            } catch (error) {
               return
            }
         }
      })()
   }, [account])

   const _handleMenu = (x) => {
      setActiveMenu(x)
   }

   return(
      <div className="fixed bg-gray-100/70 dark:bg-gray-900/60 backdrop-blur text-gray-100 h-screen w-64 z-50 shadow-md shadow-gray-200/50 dark:shadow-gray-800 hidden lg:block">
         <div className="py-8 flex pl-4">
            <Image src="/logo.png" width={32} height={32} alt="Logo" />
            <span className="title text-xl font-bold ml-4 text-gray-900 dark:text-white">NFTzy</span>
         </div>
         <div className="flex flex-col justify-between">
            <div className="">
               <p className="pl-4 py-2 tracking-widest text-gray-600 dark:text-gray-300 text-md font-medium">Marketplace</p>
               {
                  menu.map((menuItem, index) => {
                     return(
                        <Link key={index} href={menuItem.href}>
                        <a 
                           className={`flex mx-4 px-3 py-2 my-1 items-center rounded relative ${menuItem.title == activeMenu? "bg-gray-200 dark:bg-gray-800 text-blue-700 dark:text-white": "text-gray-700 dark:text-gray-300"} cursor-pointer`}
                           onClick={() => _handleMenu(menuItem.title)}
                        >
                           <div className="mr-4">
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
               <p className="pl-4 py-2 tracking-widest text-gray-600 dark:text-gray-300 text-md font-medium">Accounts</p>
               {
                  menu_account.map((menuItem, index) => {
                     return(
                        <Link href={menuItem.href} key={index} >
                        <a className={`flex mx-4 px-3 rounded py-2 my-1 items-center relative ${menuItem.title == activeMenu? "bg-gray-200 dark:bg-gray-800 text-blue-700 dark:text-white": "text-gray-700 dark:text-gray-300"} cursor-pointer`}
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
            <div className="bg-blue-700 shadow-lg shadow-blue-700 mx-4 rounded-lg mt-10">
               <div className="flex items-center px-3 py-3 gap-x-3">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full relative overflow-hidden">
                     <Image alt="account" src={ photoProfile || "/images/account.png" } layout="fill" objectPosition={"center"} objectFit="cover" />
                  </div>
                  <div className="flex my-auto flex-col">
                     <p className="text-lg font-medium text-white">{username ?  username : "Unnamed"}</p>
                     <p className="text-gray-200">{account? sortAddress(account) : "Nothing Address"}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
