import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Container from "@/components/Container"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NFTContract from "../build/contracts/token.json";
import NFTzyContract from "../build/contracts/market.json";
import { nftAddress, marketAddress } from "../utils/address";
import axios from "axios"
import Web3Modal from "web3modal"
import Web3 from "web3"
import { SET_TOKENCONTRACT, SET_MARKETCONTRACT, SET_ACCOUNT, SET_WEB3 } from "utils/redux/Type"
import sortAddress from "utils/sortAddress"
import SekeletonCard from "@/components/Card/SekeletonCard"


export default function Market () {
   const accounts = useSelector(state => state.accounts);
   const web3 = useSelector(state => state.web3);
   const marketContract = useSelector(state => state.marketContract);
   const tokenContract = useSelector(state => state.tokenContract);
   const [NFTs, setNFTs] = useState([]);
   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   const renderData = async () => {
      setLoading(true)
      if( marketContract && tokenContract ) {
         const items = await marketContract.methods.fetchMarketItems().call();
         const data = await Promise.all(items.map(async item => {
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
         setNFTs(data);
         setLoading(false)
      } else if(web3) {
         const tokenContract = await new web3.eth.Contract(NFTContract.abi, nftAddress, {
            data: NFTContract.bytecode,
         })
         const marketContract = await new web3.eth.Contract(NFTzyContract.abi, marketAddress, {
            data: NFTzyContract.bytecode,
         });
         const items = await marketContract.methods.fetchMarketItems().call();
         const data = await Promise.all(items.map(async item => {
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
         dispatch({type: SET_TOKENCONTRACT, payload: tokenContract});
         dispatch({type: SET_MARKETCONTRACT, payload: marketContract});
         dispatch({type: SET_ACCOUNT, payload: accounts});
         setNFTs(data);
         setLoading(false)
      } else {
         const web3 = await new Web3('http://127.0.0.1:7545');
         const tokenContract = await new web3.eth.Contract(NFTContract.abi, nftAddress, {
            data: NFTContract.bytecode,
         })
         const marketContract = await new web3.eth.Contract(NFTzyContract.abi, marketAddress, {
            data: NFTzyContract.bytecode,
         });
         const items = await marketContract.methods.fetchMarketItems().call();
         const data = await Promise.all(items.map(async item => {
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
         dispatch({type: SET_WEB3, payload: web3});
         setNFTs(data);
         setLoading(false);
      }
   }

   useEffect(() => {
      renderData()
   }, [])
   return(
      <div className="bg-gray-100 dark:bg-gray-900">
         <Sidebar active="Market" />
         <Navbar />
         <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20">
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
               NFTs.map((nft, index) => {
                  const address = sortAddress(nft.seller)
                  return(
                     <Card 
                        key={index}
                        id={nft.tokenId} 
                        name={nft.name} 
                        price={web3.utils.fromWei(nft.price, "ether")} 
                        image={nft.image}
                        author={address}
                     />
                  )
               })
            }
            </div>
            <Footer />
         </Container>
      </div>
   )
}