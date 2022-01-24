import Card from "../Card";
import Web3 from "web3";
import sortAdrress from "utils/sortAddress";

export default function Trending({trending_nft}){
   return(
      <div className="text-gray-100 my-10">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4 text-gray-900 dark:text-white">Trending</p>
         <div id="list" className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4 overflow-auto gap-x-4">
            {
               trending_nft.map((nft, index) => {
                  const address = sortAdrress(nft.seller)
                  return(
                     <Card 
                        key={index} 
                        id={nft.tokenId} 
                        name={nft.name} 
                        author={address} 
                        price={Web3.utils.fromWei(nft.price, "ether")} 
                        image={nft.image} 
                     />
                  )
               })
            }
            {/* <Card id={1} name={"Trex Diamind"} author={"RAihan"} price={"5 ETH"} image={"trex-nft.jpg"} /> */}
         </div>
      </div>
   )
}