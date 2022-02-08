import Card from "../Card";
import Web3 from "web3";
import sortAdrress from "utils/sortAddress";
import { useRouter } from "next/router";
import axios from "axios";

export default function Trending({trending_nft}){
   const router = useRouter();
   return(
      <div className="text-gray-100 my-10 flex flex-col justify-center items-center md:items-start w-full">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4 text-gray-900 dark:text-white">Explore</p>
         <div id="list" className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-4 w-full">
            {
               trending_nft.slice(0, 12).map((nft, index) => {
                  return(
                     <Card 
                        key={index} 
                        id={nft.tokenId} 
                        name={nft.name} 
                        author={nft.seller} 
                        price={Web3.utils.fromWei(nft.price, "ether")} 
                        image={nft.image}
                        profile_photo={nft.photo_profile || "/images/account.png"}
                     />
                  )
               })
            }
         </div>
         <div className="flex items-center w-full justify-center mt-8">
            <button className="font-medium text-md bg-transparent py-2 text-blue-700 border rounded-lg border-blue-700 w-full sm:w-1/2 md:w-1/4 active:bg-blue-700 active:text-white" onClick={() => router.push("/market")}>Explore more &rarr;</button>
         </div>
      </div>
   )
}