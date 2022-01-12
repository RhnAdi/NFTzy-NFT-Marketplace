import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Container from "@/components/Container"
import Image from "next/image"
import EthIcon from "@/icons/EthIcon"
import colors from "tailwindcss/colors"
import WalletIcon from "@/icons/WalletIcon"
import { useState } from "react"
import Web3 from "web3"
import Web3Modal from "web3modal"
import marketContract from "../../build/contracts/market.json"
import tokenContract from "../../build/contracts/token.json"
import { marketAddress, nftAddress } from "../../utils/address"
import axios from "axios"

export default function Detail ({data}) {
   const [loading, setLoading] = useState(false);

   async function buyNFT () {
      setLoading(true);
      try {
         const web3modal = new Web3Modal("http://127.0.0.1:7545");
         const provider = await web3modal.connect();
         const web3 = new Web3(provider);
         const accounts = await web3.eth.getAccounts();
         const MarketContract = new web3.eth.Contract(marketContract.abi, marketAddress);
         const price = Number(web3.utils.fromWei(data.price, "ether"));
         console.log(price)
         const tx = await MarketContract.methods.createMarketSale(nftAddress, data.tokenId).send({
            from: accounts[0],
            value: data.price
         })
         console.log(tx)
         setLoading(false)
      } catch (error) {
         console.log(error)
         setLoading(false)
      }
   }

   return(
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
         <Navbar />
         <Sidebar />
         <Container>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-100 flex flex-col md:flex-row gap-x-10 flex-1 mt-4 mb-10">
               <Image src={data.image} width={360} height={360} className="p-2 bg-gray-700 rounded-xl" alt="asset-image" />
               <div className="py-4 flex-1">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.name}</p>
                  <p className="text-lg mt-4 text-gray-900 dark:text-gray-100">{data.description}</p>
                  <div className="my-4">
                     <div className="my-4">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Seller</p>
                        <p className="text-md text-gray-800 dark:text-gray-300">{data.seller}</p>
                     </div>
                     <div className="my-4">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Owner</p>
                        <p className="text-md text-gray-300 text-gray-800 dark:text-gray-300">
                           {
                              (Web3.utils.toBN(data.owner).isZero())?
                              "NFTzy"
                              :
                              data.owner
                           }
                        </p>
                     </div>
                  </div>
                  {/* <div className="flex my-5 justify-between gap-x-10 items-center justify-center"> */}
                     <div className="my-4">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Price</p>
                        <div className="flex gap-x-2 mt-2">
                           <EthIcon color={colors.blue[800]} /> 
                           <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Web3.utils.fromWei(data.price, "ether")}</p>
                        </div>
                     </div>
                     {
                        loading?
                        <button className="my-4 bg-blue-800 flex items-center gap-x-3 rounded-lg flex flex-row justify-center items-center h-min py-3 w-full">
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <p className="text-lg font-bold">Processing...</p>
                        </button>
                        :
                        <button className="my-4 bg-blue-800 flex items-center gap-x-3 rounded-lg flex flex-row justify-center items-center h-min py-3 w-full" onClick={buyNFT}>
                           <WalletIcon color={colors.gray[100]} />
                           <p className="text-lg font-bold">Buy Now</p>
                        </button>
                     }
                  {/* </div> */}
               </div>
            </div>
            <Footer />
         </Container>
      </div>
   )
}

export async function getServerSideProps(ctx) {
   const { id } = ctx.query;
   const web3 = new Web3("http://127.0.0.1:7545");
   const MarketContract = new web3.eth.Contract(marketContract.abi, marketAddress);
   const TokenContract = new web3.eth.Contract(tokenContract.abi, nftAddress);
   const data = await MarketContract.methods.getMarketItem(id).call();
   const tokenUri = await TokenContract.methods.tokenURI(data[2]).call();
   const meta = await axios.get(tokenUri);
   const price = data[5].toString();
   return {
      props: {
         data: {
            price,
            name: meta.data.name,
            description: meta.data.description,
            seller: data[3],
            owner: data[4],
            image: meta.data.image,
            tokenId: data[2],
            sold: data[6]
         }
      }
   }
}
