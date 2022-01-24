import Image from "next/image"

export default function Hero(){
   return(
      <div id="hero" className="text-white my-5 flex flex-col sm:flex-row md:justify-between items-center md:gap-x-5">
         <div className="sm:w-4/6 mb-10 px-4 md:px-0">
            <div className="flex gap-x-3 items-center text-3xl font-bold">
               <Image src="/logo.png" width={44} height={44} alt="nftzy" />
               <p className="title text-gray-800 dark:text-white">NFTzy</p>
            </div>
            <div className="mt-8"> 
               <p className="text-4xl tracking-wider text-gray-800 dark:text-white">Discover,collect and sell extraordinary NFTs.</p>
            </div>
            <div className="mt-10 flex gap-x-4 w-full">
               <button className="flex-1 sm:flex-none bg-blue-700 px-8 py-2 rounded text-lg shadow-lg shadow-blue-700/50" >Explore</button>
               <button className="flex-1 sm:flex-none border border-blue-700 px-8 py-2 rounded text-lg text-blue-700 shadow-lg shadow-blue-700/50" >Create</button>
            </div>
         </div>
         <div className="backdrop-filter backdrop-blur-lg bg-gray-300/50 dark:bg-gray-800/70 px-2 py-2 rounded-xl relative shadow-md shadow-gray-700/20">
            <div className="relative">
               <Image src="/images/JapanModern-nft.jpg" width={420} height={300} alt="Cult" className="rounded-xl" />
               <div className="flex items-center gap-x-3 absolute bottom-0 bg-gray-400/70 dark:bg-gray-800/50 px-4 py-3 w-full rounded-lg">
                  <div className="bg-gray-100 rounded-full w-10 h-10"></div>
                  <div className="flex flex-col">
                     <span className="text-lg">Skeleton Cult Illuminati</span>
                     <span className="text-md">Culter CulCul</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}