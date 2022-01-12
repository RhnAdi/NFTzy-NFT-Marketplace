import Container from "@/components/Container"
import Sidebar from "@/components/Sidebar"
import ImageIcon from "@/icons/ImageIcon"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import colors from "tailwindcss/colors"
import Input from "@/components/Input"
import { create } from "ipfs-http-client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Web3 from "web3"
import { nftAddress, marketAddress } from "../utils/address"
import web3Modal from "web3modal";
import { Dialog } from "@headlessui/react"
import TokenContract from "../build/contracts/token.json"
import MarketContract from "../build/contracts/market.json"
import Link from "next/link"
import EthIcon from "@/icons/EthIcon"
import ModalItem from "@/components/ModalItem"

export default function Create() {
   const [file, setFile] = useState();
   const [fileUrl, setFileUrl] = useState(null);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0);
   const [waitingTx, setWaitingTx] = useState(false);
   const [createdItem, setCreatedItem] = useState(false);
   const [newTokenId, setNewTokenId] = useState();

   const client = create('/ip4/127.0.0.1/tcp/5001');

   function _handleUpload (e) {
      console.log(e.target.files);
      if(e.target.files[0]){
         const fileUri = URL.createObjectURL(e.target.files[0]);
         setFile(e.target.files[0])
         setFileUrl(fileUri); 
      } else {
         return
      }
   }

   async function _handleCreate (e) {
      setWaitingTx(true);
      e.preventDefault();
      if(!file){
         setWaitingTx(false)
         return
      }
      try {
         const fileHash =  await client.add(file, {
            progress: (prog) => console.log("Receive:", prog)
         });
         const fileUri = await `http://127.0.0.1:8080/ipfs/${fileHash.path}`;
         if(!name && !description && !price && !fileHash) return
         const data = JSON.stringify({
            name, description, image: fileUri
         })
         const added = await client.add(data);
         const url = `http://127.0.0.1:8080/ipfs/${added.path}`;

         await createSale(url);
         setWaitingTx(false);
      } catch (error) {
         setWaitingTx(false)
;         console.log(error);
      }
   }

   function _handlePrice (e) {
      setPrice(e.target.value);
   }

   async function createSale(url) {
      const web3modal = new web3Modal("http://localhost:7545");
      const provider = await web3modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const tokenContract = new web3.eth.Contract(TokenContract.abi, nftAddress, {
         from: accounts[0],
      });
      const marketContract = new web3.eth.Contract(MarketContract.abi, marketAddress, {
         from: accounts[0]
      });
      const tx = await tokenContract.methods.createToken(url).send({ from: accounts[0] });
      const tokenId = await tx.events.Transfer.returnValues.tokenId;
      setNewTokenId(tokenId);
      const listingPrice = await marketContract.methods.getListingPrice().call();
      const marketItem = await marketContract.methods.createMarketItem(nftAddress, tokenId, Web3.utils.toWei(price, "ether")).send({ value: Number(listingPrice), from: accounts[0] });
      console.log(marketItem);
      const new_token_id = await marketItem.events.MarketItemCreated.returnValues.tokenId;
      setNewTokenId(new_token_id);
      setCreatedItem(true);
   }

   function _handleCloseCreatedItem () {
      setCreatedItem(false);
      setName("");
      setDescription("");
      setFile(null)
      setPrice(0);
   }

   return (
      <div className="bg-gray-100 dark:bg-gray-900">
         {
            (createdItem)?
            <ModalItem image={fileUrl} onClose={_handleCloseCreatedItem} message={"Your NFT has been minted and sell"} tokenId={newTokenId} >
               <div className="flex justify-between">
                  <p className="flex-1">Name :</p>
                  <p>{name}</p>
               </div>
               <div className="flex justify-between">
                  <p className="w-max flex-1">Description :</p>
                  <p className="text-right flex-1">{description}.</p>
               </div>
               <div className="flex justify-between">
                  <p className="w-max flex-1">Price :</p>
                  <p className="text-right flex-1 flex items-center gap-x-2 justify-end"><EthIcon width={24} height={24} color={colors.gray[300]} /> {price}</p>
               </div>
            </ModalItem>
            :
            null
         }
         <Sidebar active="Create" />
         <Navbar />
         <Container>
            <div className="text-gray-900 dark:text-gray-100 mb-20 bg-gray-800/20 p-7 sm:p-8 md:p-10 rounded-lg border-t-8 border-blue-600 shadow-sm">
               <p className="text-2xl font-bold border-b-2 border-gray-800 pb-4">Create New Item</p>
               <form onSubmit={_handleCreate}>
               <div className="mt-4 mb-10 flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-2">
                     <p className="text-lg">Asset <span className="text-red-400">*</span></p>
                     <label htmlFor="asset" className="cursor-pointer w-min">
                        <div className="w-44 h-44 bg-gray-300 dark:bg-gray-800 flex justify-center items-center rounded-lg overflow-hidden">
                           {
                              fileUrl == null?
                                 <ImageIcon color={colors.gray[100]} width={42} height={42} />
                              :
                                 <div className="w-full h-full relative"> 
                                    <Image layout="fill" alt="file" className="w-full h-full" objectFit="cover" objectPosition={"center"} src={fileUrl} />
                                 </div>
                           }
                        </div>
                     </label>
                     <input type="file" id="asset" className="hidden" onChange={_handleUpload} required />
                  </div>
                  <Input title="Name" required onChange={(e) => setName(e.target.value)} placeholder={"Asset Name"} value={name} />
                     
                     <Input 
                        title="Price" 
                        required 
                        type="number" 
                        onChange={_handlePrice} 
                        placeholder={"Asset Price"}
                        value={price} 
                        pattern="[0-9]*" 
                     />
                     
                  <div className="flex flex-col gap-y-2">
                     <label className="text-lg" htmlFor="description">Description</label>
                     <textarea
                     onChange={(e) => setDescription(e.target.value)}
                        placeholder="Asset description"
                        className="px-4 py-2 placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-400 rounded bg-gray-200 dark:bg-gray-800 outline-none focus:ring-4 ring-blue-700/20 h-32"
                        id="description"
                        required
                     />
                  </div>
               </div>
               {
                  waitingTx?
                  <button className="text-lg font-bold px-8 py-3 rounded bg-gray-600 shadow shadow-gray-800/50 text-gray-100 w-full flex items-center justify-center gap-x-2" disabled >
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Processing...
                  </button>
                  :
                  <button type="submit" className="text-lg font-bold px-8 py-3 rounded bg-blue-800 shadow shadow-blue-800/50 text-gray-100 w-full">Create</button>
               }
               </form>
            </div>
            <Footer />
         </Container>
      </div>
   )
}