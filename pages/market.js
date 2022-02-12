// Components
import SekeletonCard from "@/components/Card/SekeletonCard"
import Container from "@/components/Container"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Card from "@/components/Card"

// Utils
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import NFTContract from "../build/contracts/token.json";
import NFTzyContract from "../build/contracts/market.json";
import { nftAddress, marketAddress } from "../utils/address";
import { SET_TOKENCONTRACT, SET_MARKETCONTRACT, SET_ACCOUNT, SET_WEB3 } from "utils/redux/Type"

// Tools
import sortAddress from "utils/sortAddress"
import Web3Modal from "web3modal"
import axios from "axios"
import Web3 from "web3"


export default function Market ({searching = []}) {
   console.log(searching)
   // Define Router
   const Router = useRouter();

   // Define State
   const [loading, setLoading] = useState(false);
   const [NFTs, setNFTs] = useState(searching);
   
   // Redux State
   const tokenContract = useSelector(state => state.tokenContract);
   const marketContract = useSelector(state => state.marketContract);
   const accounts = useSelector(state => state.accounts);
   const web3 = useSelector(state => state.web3);

   // Redux Dispatch
   const dispatch = useDispatch();

   const BLOCKCHAIN_NETWORK = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK;

   const renderData = async () => {
      setLoading(true)
      if( marketContract && tokenContract ) {
         const items = await marketContract.methods.fetchMarketItems().call();
         const data = await Promise.all(items.map(async item => {
            const tokenUri = await tokenContract.methods.tokenURI(item.tokenId).call();
            const meta = await axios.get(tokenUri);
            const price = item.price.toString();
            const res = await axios.get(`/api/user/${item.seller}`);
            const sellerAccount = res.data.data?.username;
            const photoAccount = res.data.data?.photo_profile;
            const nft = {
               price,
               tokenId: parseInt(item.tokenId),
               seller: sellerAccount || sortAddress(item.seller),
               owner: item.owner,
               image: meta.data.image,
               name: meta.data.name,
               description: meta.data.description,
               photo_profile: photoAccount
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
            const res = await axios.get(`/api/user/${item.seller}`);
            const sellerAccount = res.data.data?.username;
            const photoAccount = res.data.data?.photo_profile;
            const nft = {
               price,
               tokenId: parseInt(item.tokenId),
               seller: sellerAccount || sortAddress(item.seller),
               owner: item.owner,
               image: meta.data.image,
               name: meta.data.name,
               description: meta.data.description,
               photo_profile: photoAccount
            }
            return nft
         }))
         dispatch({type: SET_TOKENCONTRACT, payload: tokenContract});
         dispatch({type: SET_MARKETCONTRACT, payload: marketContract});
         dispatch({type: SET_ACCOUNT, payload: accounts});
         setNFTs(data);
         setLoading(false)
      } else {
         const web3 = new Web3(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK);
         const tokenContract = new web3.eth.Contract(NFTContract.abi, nftAddress, {
            data: NFTContract.bytecode,
         })
         const marketContract = new web3.eth.Contract(NFTzyContract.abi, marketAddress, {
            data: NFTzyContract.bytecode,
         });
         const items = await marketContract.methods.fetchMarketItems().call();
         const data = await Promise.all(items.map(async item => {
            const tokenUri = await tokenContract.methods.tokenURI(item.tokenId).call();
            const meta = await axios.get(tokenUri);
            const price = item.price.toString();
            const res = await axios.get(`/api/user/${item.seller}`);
            const sellerAccount = res.data.data?.username;
            const photoAccount = res.data.data?.photo_profile;
            const nft = {
               price,
               tokenId: parseInt(item.tokenId),
               seller: sellerAccount || sortAddress(item.seller),
               owner: item.owner,
               image: meta.data.image,
               name: meta.data.name,
               description: meta.data.description,
               photo_profile: photoAccount
            }
            return nft
         }))
         dispatch({type: SET_WEB3, payload: web3});
         setNFTs(data);
         setLoading(false);
      }
   }

   const _handleSearch = async () => {
      const res = await axios.get(`/api/item/search?keyword=${Router.query.keyword}`);
      console.log(res.data )
      setNFTs(res.data.data)
   }

   useEffect(() => {
      if(
         Router.query?.keyword &&
         Router.query.keyword !== ""
      ) {
         console.log(Router.query.keyword)
         _handleSearch()
      } else {
         renderData()
      }
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
                  return(
                     <Card 
                        key={index}
                        id={nft.tokenId} 
                        name={nft.name} 
                        price={web3.utils.fromWei(nft.price, "ether")} 
                        image={nft.image}
                        author={nft.seller}
                        profile_photo={nft.photo_profile}
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

export async function getServerSideProps ({ query }) {
   try {
      const res_search = await axios.get(`http://localhost:3000/api/item/search?keyword=${query.keyword}`);
      let data = 
      return {
         props: {
            searching: res_search.data.data
         }
      }
   } catch (error) {
      return {
         props: {
            error: true
         }
      }
   }
}