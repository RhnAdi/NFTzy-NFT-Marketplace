import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Container from "@/components/Container"
import BuyButton from "@/components/BuyButton"
import LoadingButton from "@/components/LoadingButton"
import TransferButton from "@/components/TransferButton"
import Image from "next/image"
import EthIcon from "@/icons/EthIcon"
import colors from "tailwindcss/colors"
import { useState, useEffect } from "react"
import Web3 from "web3"
import Web3Modal from "web3modal"
import marketContract from "../../build/contracts/market.json"
import tokenContract from "../../build/contracts/token.json"
import { marketAddress, nftAddress } from "../../utils/address"
import axios from "axios"
import Input from "@/components/Input"
import Alert from "@/components/Alert"
import providerOptions from "../../utils/Wallet"
import { useRouter } from 'next/router'


export default function Detail ({data, error}) {

   const Router = useRouter();
   const { id } = Router.query;

   const [ownerAddress, setOwnerAddress] = useState(data?.owner)
   const [sellerUsername, setSellerUsername] = useState();
   const [ownerUsername, setOwnerUsername] = useState();
   const [loading, setLoading] = useState(false);
   const [modalTransfer, setModalTransfer] = useState(false);
   const [transferSuccess, setTransferSuccess] = useState(false);
   const [transferFailed, setTransferFailed] = useState(false);
   const [buySuccess, setBuySuccess] = useState(false);
   const [buyFailed, setBuyFailed] = useState(false);
   const [history, setHistory] = useState([]);

   async function buyNFT () {
      setLoading(true);
      try {
         const web3modal = new Web3Modal({
            network: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK,
            cacheProvider: true,
            providerOptions: providerOptions()
         });
         const provider = await web3modal.connect();
         const web3 = new Web3(provider);
         const accounts = await web3.eth.getAccounts();
         const MarketContract = new web3.eth.Contract(marketContract.abi, marketAddress);
         const price = Number(web3.utils.fromWei(data.price, "ether"));
         const tx = await MarketContract.methods.createMarketSale(nftAddress, data.tokenId).send({
            from: accounts[0],
            value: data.price
         })
         const transfer_data = await axios.post(`/api/item/${data.tokenId}/transfer`, {
            from: data.owner,
            to: accounts[0],
            tx_hash: tx.transactionHash
         })
         setOwnerAddress(transfer_data.data.data.owner);
         setLoading(false)
         setBuySuccess(true)
      } catch (error) {
         setLoading(false)
         setBuyFailed(true)
      }
   }

   useEffect(() => {
      error?
         null
      :
      (async () => {
         const seller = await axios.get(`/api/user/${data.seller}`);
         const owner = await axios.get(`/api/user/${data.owner}`);
         const res_item = await axios.get(`/api/item/${id}`);
         setHistory(res_item.data.data.history);
         setSellerUsername(seller.data.data?.username);
         setOwnerUsername(owner.data.data?.username);
      })()
   },[ownerAddress])

   return(
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
         <Navbar />
         <Sidebar />
         <Container>
            { transferSuccess && <Alert type="success" message="Transfer Item." onDelete={() => setTransferSuccess(false)} /> }
            { transferFailed && <Alert type="danger" message="Transfer Item." notice="Failed" onDelete={() => setTransferFailed(false)} /> }
            { buySuccess && <Alert type="success" message="Buy Item." onDelete={() => setBuySuccess(false)} /> }
            { buyFailed && <Alert type="danger" message="Buy Item." notice="Failed" onDelete={() => setBuyFailed(false)} /> }
            {
               modalTransfer ?
               <ModalTransfer 
                  onClose={() => setModalTransfer(false)} 
                  tokenId={data.tokenId} 
                  whenSuccess={()=> setTransferSuccess(true)} 
                  whenFailed={()=> setTransferFailed(true)}
                  addTransfer={(data) => setHistory(state => {
                     return [
                        ...state,
                        data
                     ]
                  })}
               />
               :
               null
            }
            {
               error?
               <p>No Items</p>
               :
               <>
               <div className="bg-gray-100 dark:bg-gray-900 text-gray-100 flex flex-col md:flex-row gap-x-10 flex-1 mt-4 mb-5 px-2 md:px-0 w-full">
                  <Image src={data.image} objectFit="contain" objectPosition="center" width={360} height={360} className="flex-1 p-2 bg-gray-200 dark:bg-gray-800 rounded-xl h-auto w-full" alt="asset-image" />
                  <div className="py-4 flex-1">
                     <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.name}</p>
                     <p className="text-sm mt-4 text-gray-900 dark:text-gray-100 mb-2">Created on {data.created}</p>
                     <p className="text-md mt-4 text-gray-900 dark:text-gray-100 break-all">{data.description}</p>
                     <div className="my-4">
                        <div className="my-4">
                           <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Seller</p>
                           <p className="truncate text-md text-gray-800 dark:text-gray-300 text-wrap">{sellerUsername || data.seller}</p>
                        </div>
                        <div className="my-4">
                           <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Owner</p>
                           <p className="truncate text-md text-gray-800 dark:text-gray-300">
                              {
                                 (Web3.utils.toBN(data.owner).isZero())?
                                 "NFTzy"
                                 :
                                 ownerUsername || ownerAddress || data.owner
                              }
                           </p>
                        </div>
                     </div>
                     
                        <div className="my-4">
                           <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Price</p>
                           <div className="flex gap-x-2 mt-2">
                              <EthIcon color={colors.blue[800]} /> 
                              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Web3.utils.fromWei(data.price, "ether")}</p>
                           </div>
                        </div>
                        {
                           data.sold?
                           <TransferButton onClick={() => setModalTransfer(true)} />
                           :
                           loading?
                           <LoadingButton />
                           :
                           <BuyButton onClick={buyNFT} />
                        }
                     
                  </div>
               </div>
               <div className="flex flex-col mx-2 mb-10">
                  <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4">History</p>
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-800 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                           <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              </tr>
                           </thead>
                           <tbody className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 divide-y divide-gray-200">
                              {
                                 history.map((hstry, index) => {
                                    return (
                                       <tr key={index}>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <p className="truncate text-sm capitalize">{hstry.type}</p>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <p className="truncate text-sm">
                                                {
                                                   (Web3.utils.toBN(hstry.from).isZero())?
                                                   "NFTzy"
                                                   :
                                                   hstry.from
                                                }
                                             </p>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <p className="text-sm ">
                                                {
                                                   (Web3.utils.toBN(hstry.to).isZero())?
                                                   "NFTzy"
                                                   :
                                                   hstry.to
                                                }
                                             </p>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <p className="text-sm ">{hstry.tx_hash}</p>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm">{hstry.createdAt}</td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                        </div>
                     </div>
                  </div>
               </div>
               </>
            }
            <Footer />
         </Container>
      </div>
   )
}

export async function getServerSideProps(ctx) {
   const { id } = ctx.query;
   const web3 = new Web3(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK);
   try {
      const MarketContract = new web3.eth.Contract(marketContract.abi, marketAddress);
      const TokenContract = new web3.eth.Contract(tokenContract.abi, nftAddress);
      const data = await MarketContract.methods.getMarketItem(id).call();
      const tokenUri = await TokenContract.methods.tokenURI(data[2]).call();
      const meta = await axios.get(tokenUri);
      const price = data[5].toString();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];      
      const date = new Date(Number(data[7]) * 1000);
      const created = `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
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
               sold: data[6],
               created: created,
            }
         }
      }
   } catch(error) {
      return {
         props: {
            error: true
         }
      }
   }
}

const ModalTransfer = ({ onClose, tokenId, whenSuccess, whenFailed, addTransfer }) => {
   const [address, setAddress] = useState("");
   const [loading, setLoading] = useState(false)
   async function transferNFT () {
      setLoading(true)
      try {
         const web3modal = new Web3Modal({
            network: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK,
            cacheProvider: true,
            providerOptions: providerOptions()
         });
         const provider = await web3modal.connect();
         const web3 = new Web3(provider);
         const accounts = await web3.eth.getAccounts();
         const MarketContract = new web3.eth.Contract(marketContract.abi, marketAddress);
         const tx = await MarketContract.methods.TransferItem(nftAddress, tokenId, address).send({
            from: accounts[0],
         })
         const resTx = await axios.post(`/api/item/${tokenId}/transfer`, {
            from: tx.events.ItemTransfered.returnValues.from,
            to: tx.events.ItemTransfered.returnValues.to,
            tx_hash: tx.transactionHash
         })
         addTransfer(resTx.data.data_history)
         setLoading(false);
         onClose();
         whenSuccess();
      } catch (error) {
         onClose();
         whenFailed();
         setLoading(false)
      }
   }
   return (
      <div className="w-full h-full fixed backdrop-blur-sm z-50 top-0 left-0 flex justify-center items-center px-4">
         <div className="p-4 bg-white dark:bg-gray-800 rounded-xl w-full lg:w-1/2 shadow-lg">
            <form onSubmit={e => e.preventDefault()}>
               <Input
                  title="Address" 
                  required={true} 
                  type="text" 
                  placeholder="Transfer Address" 
                  onChange={
                     (e) => setAddress(e.target.value)
                  } 
               />
               <div className="w-full flex gap-x-2 mt-4">
                  <button 
                     onClick={onClose} 
                     className="flex-1 w-full py-2 bg-gray-300 rounded text-gray-800 dark:text-gray-600"
                  >
                     Cancel
                  </button>
                  {
                     loading?
                     <button className={"bg-blue-800 flex items-center gap-x-3 rounded flex flex-row justify-center items-center h-min py-2 w-full flex-1"} disabled={true}>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="font-bold text-white">Processing...</p>
                     </button>
                     :
                     <button 
                        onClick={transferNFT}
                        className="flex-1 w-full py-2 bg-blue-600 rounded text-white font-semibold"
                     >
                        Transfer
                     </button>
                  }
               </div>
            </form>
         </div>
      </div>
   )
}