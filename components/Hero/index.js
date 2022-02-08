import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Hero({randomItem}){
   const router = useRouter();
   return(
      <div id="hero" className="text-white my-5 flex flex-col sm:flex-row md:justify-between items-center md:gap-x-5">
         <div className="sm:w-4/6 mb-10 px-4 md:px-0">
            <div className="flex gap-x-3 items-center justify-center sm:justify-start text-3xl font-bold">
               <Image src="/logo.png" width={44} height={44} alt="nftzy" />
               <p className="title text-gray-800 dark:text-white">NFTzy</p>
            </div>
            <div className="mt-8"> 
               <p className="text-4xl tracking-wider text-gray-800 dark:text-white text-center sm:text-left">Discover,collect and sell extraordinary NFTs.</p>
               <p className="text-lg tracking-wider text-gray-800 dark:text-white mt-4 w-full sm:w-3/4 text-center sm:text-left">NFTzy is the worlds first and largest NFT marketplace in testnet network.</p>
            </div>
            <div className="mt-10 flex gap-x-4 w-full">
               <button className="flex-1 sm:flex-none bg-blue-700 px-8 py-2 rounded text-lg shadow-lg shadow-blue-700/50 active:text-gray-300 active:bg-blue-600" onClick={() => router.push("/market")}>Explore</button>
               <button className="flex-1 sm:flex-none border border-blue-700 px-8 py-2 rounded text-lg text-blue-700 shadow-lg shadow-blue-700/50 active:text-blue-600 active:border-blue-600" onClick={() => router.push("/create")} >Create</button>
            </div>
         </div>
         <div className="backdrop-filter backdrop-blur-lg border-2 border-white/50 dark:border-gray-800/40 px-2 py-2 rounded-xl relative shadow-md shadow-gray-700/20">
            <div className="relative">
               <Image src={randomItem?.image || "/images/JapanModern-nft.jpg"} width={550} height={400} alt="Cult" className="rounded-lg" objectFit="cover" />
               <div className="flex items-center gap-x-3 absolute bottom-1.5 px-4 py-3 w-full rounded-lg backdrop-blur-lg">
                  <div className="bg-gray-100 rounded-full w-10 h-10 overflow-hidden relative">
                     <Image src={randomItem?.photo_profile || '/images/account.png'} layout="fill" objectFit="contain" objectPosition={"center"} alt="account" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-lg">{randomItem?.name}</span>
                     <span className="text-md">{ randomItem?.username || randomItem?.sort_address_seller}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}