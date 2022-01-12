import EthIcon from "@/icons/EthIcon"
import Image from "next/image"
import colors from "tailwindcss/colors"
import Link from "next/link"

export default function Card({id, name, author, price, image}){
   return(
      <Link href={`/detail/${id}`}>
      <a className="px-3 py-3 w-full bg-gray-300/70 dark:bg-gray-800/70 rounded-2xl shadow-lg dark:shadow-gray-800/50 text-gray-100">
         <Image src={`${image}`} width={440} height={360} alt="nft-image" className="rounded-xl" />
         <div className="">
            <div className="flex gap-x-3 items-center my-2 px-2">
               <div className="h-10 w-10 bg-gray-100 dark:bg-gray-300 rounded-full"></div>
               <div className="">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-200">{name}</p>
                  <span className="text-md text-gray-700 dark:text-gray-300">{author}</span>
               </div>
            </div>
            <div className="flex justify-between px-3 py-2 bg-blue-700 rounded-lg mt-3 items-center">
               <span className="text-gray-100 font-bold">Current Bid</span>
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