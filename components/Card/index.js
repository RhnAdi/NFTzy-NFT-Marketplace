import EthIcon from "@/icons/EthIcon"
import Image from "next/image"
import colors from "tailwindcss/colors"
import Link from "next/link"

export default function Card({id, name, author, price, image, profile_photo}){
   return(
      <Link href={`/detail/${id}`}>
      <a className="px-3 py-3 w-full backdrop-blur rounded-2xl shadow-lg dark:shadow-gray-800/50 text-gray-100 border-2 border-white/50 dark:border-gray-800/40">
         <div className="relative w-full h-64 border-gray-300/20 bg-gray-300/50 dark:bg-gray-700/20 rounded-lg">
            <Image objectFit="contain" objectPosition="center" src={`${image}`} layout="fill" alt="nft-image" className="rounded-xl" />
         </div>
         <div className="">
            <div className="flex gap-x-3 items-center my-2 px-2">
               <div className="h-10 w-10 bg-gray-100 dark:bg-gray-300 rounded-full relative overflow-hidden">
                  <Image src={profile_photo || "/images/account.png"} layout="fill" objectFit="center" objectPosition="center" alt="photo_profile" />
               </div>
               <div className="">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-200">{name}</p>
                  <span className="text-md text-gray-700 dark:text-gray-300">{author}</span>
               </div>
            </div>
            <div className="flex justify-between px-3 py-2 bg-blue-700 rounded-lg mt-3 items-center">
               <span className="text-gray-100 font-bold">Price</span>
               <div className="flex items-center gap-x-1">
                  <EthIcon color={colors.gray[100]} width={24} height={24} />
                  <span className="text-lg font-bold font-mono">{price}</span>
               </div>
            </div>
         </div>
      </a>
      </Link>
   )
}