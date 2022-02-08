import axios from "axios";
import { useState, useEffect } from "react"
import Card from "@/components/Card"
import SekeletonCard from "@/components/Card/SekeletonCard"
import Web3 from "web3"
import sortAddress from "utils/sortAddress";

export default function Collected ({data = []}) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {
            data.length == 0?
            <p className="col-span-3 text-center text-xl text-gray-800 dark:text-gray-300 my-10">No Items.</p>
            :
            data?.map((nft, index) => {
               if(!nft) return
               const price = Web3.utils.fromWei(nft?.price, "ether");
               const address = sortAddress(nft.seller);
               return (
                  <Card
                     key={index}
                     name={nft.meta.name}
                     id={nft.tokenId}
                     description={nft.description}
                     price={price}
                     author={address}
                     image={nft.meta.image}
                  />
               )
            })
         }
      </div>
   )
}