import axios from "axios";
import { useState, useEffect } from "react"
import Card from "@/components/Card"
import SekeletonCard from "@/components/Card/SekeletonCard"
import Web3 from "web3"
import sortAddress from "utils/sortAddress";

export default function Created ({ marketContract, tokenContract, accounts }) {
   const [myNFTs, setMyNFTs] = useState([]);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      (async () => {
         setLoading(true)
         try {
            const items = await marketContract.methods.fetchItemsCreated().call({
               from: accounts[0]
            });
            const data = await Promise.all(items.map(async item => {
               if(item.tokenId == "0") return
               const tokenUri = await tokenContract.methods.tokenURI(item.tokenId).call();
               const meta = await axios.get(tokenUri);
               const price = item.price.toString();
               const nft = {
                  price,
                  tokenId: parseInt(item.tokenId),
                  seller: item.seller,
                  owner: item.owner,
                  image: meta.data.image,
                  name: meta.data.name,
                  description: meta.data.description
               }
               return nft
            }))
            setMyNFTs(data);
            setLoading(false)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
      })()
   }, [])
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {
            loading?
            <>
               <SekeletonCard />
               <SekeletonCard />
               <SekeletonCard />
               <SekeletonCard />
               <SekeletonCard />
               <SekeletonCard />
            </>
            :
            null
         }
         {
            myNFTs.length == 0?
            <p className="col-span-3 text-center text-xl text-gray-800 dark:text-gray-300 my-10">No Items.</p>
            :
            myNFTs.map((data, index) => {
               if(!data) return
               const price = Web3.utils.fromWei(data.price, "ether");
               const address = sortAddress(data.seller);
               return (
                  <Card
                     key={index}
                     name={data.name}
                     id={Number(data.tokenId)}
                     description={data.description}
                     price={price}
                     author={address}
                     image={data.image}
                  />
               )
            })
         }
      </div>
   )
}