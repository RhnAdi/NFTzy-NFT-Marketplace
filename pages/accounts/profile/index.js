// Components
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Container from "@/components/Container"
import Footer from "@/components/Footer"
import { Tab } from "@headlessui/react"
import Collected from "@/components/Acounts/Collected"
import Created from "@/components/Acounts/Created"
import Image from "next/image"
import Link from "next/link"

// Utils
import { marketAddress, nftAddress } from "../../../utils/address"
import marketContract from "../../../build/contracts/market.json"
import tokenContract from "../../../build/contracts/token.json"
import { SET_ACCOUNT } from "../../../utils/redux/Type"
import providerOptions from "../../../utils/Wallet"

// Tools
import Web3 from "web3"
import { useState, useEffect } from "react"
import Web3Modal from "web3modal"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

export default function Profile(props) {
   // Define State
   const [username, setUsername] = useState('Unnamed');
   const [bio, setBio] = useState();
   const [sites, setSites] = useState([]);
   const [accounts, setAccounts] = useState([]);
   const [photoProfile, setPhotoProfile] = useState();
   const [banner, setBanner] = useState();
   const [loading, setLoading] = useState(false);

   // Data
   const [itemCollected, setItemCollected] = useState([]);
   const [itemCreated, setItemCreated] = useState([]);
   const account = useSelector(state => state.accounts)

   // Redux Dispatch
   const dispatch = useDispatch();
   useEffect(() => {
      (async () => {
         setLoading(true);
         console.log(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK)
         try {
            const web3modal = new Web3Modal({
               network: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK,
               cacheProvider: true,
               providerOptions: providerOptions(),
            });
            const provider = await web3modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const Market = new web3.eth.Contract(marketContract.abi, marketAddress, { from: accounts[0] });
            const Token = new web3.eth.Contract(tokenContract.abi, nftAddress, { from: accounts[0] });
            let myNFTs = await Market.methods.fetchMyNFTs().call({ from: accounts[0] });
            let myItemsCreated = await Market.methods.fetchItemsCreated().call({ from: accounts[0] });
            myNFTs = await Promise.all(myNFTs.map(async item => {
               const token_uri = await Token.methods.tokenURI(item.tokenId).call();
               const meta = await axios.get(token_uri);
               return {
                  created: item.created,
                  itemId: item.itemId,
                  owner: item.owner,
                  price: item.price,
                  seller: item.seller,
                  sold: item.sold,
                  tokenAddress: item.tokenAddress,
                  tokenId: item.tokenId,
                  meta: meta.data
               }
            }))
            myItemsCreated = await Promise.all(myItemsCreated.map(async item => {
               const token_uri = await Token.methods.tokenURI(item.tokenId).call();
               const meta = await axios.get(token_uri);
               return {
                  created: item.created,
                  itemId: item.itemId,
                  owner: item.owner,
                  price: item.price,
                  seller: item.seller,
                  sold: item.sold,
                  tokenAddress: item.tokenAddress,
                  tokenId: item.tokenId,
                  meta: meta.data
               }
            }))
            // Setter
            setItemCollected(myNFTs)
            setItemCreated(myItemsCreated);
            dispatch({ type: SET_ACCOUNT, payload: accounts[0] })
            const res = await axios.get(`/api/user/${accounts[0]}`)
            const _profile = res.data.data;
            if (_profile !== null) {
               setUsername(_profile?.username);
               setBio(_profile?.bio);
               setSites(_profile?.sites);
               setPhotoProfile(_profile?.photo_profile);
               setBanner(_profile?.banner);
            }

            setLoading(false);
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
      })();
   }, [account])

   const tab = ["Collected", "Created"];
   return (
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
         <Navbar />
         <Sidebar active="Profile" />
         <Container>
            <div className="mb-10">
               <div className="relative flex justify-center">
                  <div className="bg-gray-700/20 w-full h-32 md:h-48 rounded-lg relative overflow-hidden" id="banner">
                     {
                        banner ?
                           <Image src={banner} layout="fill" objectFit="cover" objectPosition="center" alt="banner" />
                           :
                           null
                     }
                  </div>
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full absolute -bottom-12 md:-bottom-16 border-4 border-gray-100 dark:border-gray-900" id="profile-picture">
                     <Image src={photoProfile || "/images/account.png"} width={128} height={128} objectPosition="center" objectFit="cover" alt="account" className="rounded-full bg-gray-700" />
                  </div>
               </div>
               <div className="mt-16 md:mt-20">
                  <p className="text-xl font-bold text-center">{username}</p>
                  <p className="truncate text-center dark:text-gray-300 text-gray-600 text-lg">{accounts[0] || account || "Not Connected"}</p>
                  <p className="text-center dark:text-gray-300 text-gray-600 mt-2">{bio}</p>
                  {
                     (sites && sites.length !== 0) ?
                        <p className="text-center mt-2"><span className="font-semibold text-gray-900 dark:text-white">Sites : </span>
                           {
                              sites.map((site, index) => {
                                 return (
                                    <p key={index}>
                                       <Link passHref={true} href={`${site}`}>
                                          <a className="text-blue-400">{`${site}`}</a>
                                       </Link>
                                       {
                                          (site == sites[sites.length - 1] ? "" : ",")
                                       }
                                    </p>
                                 )
                              })
                           }
                        </p>
                        :
                        null
                  }
               </div>
               <div className="mt-10 w-full">
                  <Tab.Group as="div" className="flex flex-col items-center w-full justify-center">
                     <Tab.List className="flex justify-between gap-x-2 w-full md:w-min bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                        {
                           tab.map((item, index) => {
                              return (
                                 <Tab
                                    key={index}
                                    className={
                                       ({ selected }) =>
                                          selected ? "w-full md:w-32 text-lg font-medium bg-blue-700 text-white rounded-md px-4 py-2"
                                             :
                                             "w-full md:w-32 text-lg font-medium text-gray-700 dark:text-white rounded-md px-4 py-2"
                                    }
                                 >
                                    {item}
                                 </Tab>
                              )
                           })
                        }
                     </Tab.List>
                     {
                        loading ?
                           <div className="mt-5 w-full">
                              <p className="text-center">Loading...</p>
                           </div>
                           :
                           <Tab.Panels className="mt-5 w-full">
                              <Tab.Panel>
                                 <Collected data={itemCollected} />
                              </Tab.Panel>
                              <Tab.Panel>
                                 <Created data={itemCreated} />
                              </Tab.Panel>
                           </Tab.Panels>
                     }
                  </Tab.Group>
               </div>
            </div>
            {/* } */}
            <Footer />
         </Container>
      </div>
   )
}