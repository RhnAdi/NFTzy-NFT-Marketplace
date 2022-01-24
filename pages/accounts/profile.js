import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Container from "@/components/Container"
import Footer from "@/components/Footer"
import { Tab } from "@headlessui/react"
import Collected from "@/components/Acounts/Collected"
import Created from "@/components/Acounts/Created"
import Web3 from "web3"
import { marketAddress, nftAddress } from "../../utils/address"
import marketContract from "../../build/contracts/market.json"
import tokenContract from "../../build/contracts/token.json"
import { useState, useEffect } from "react"
import Web3Modal from "web3modal"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { SET_ACCOUNT } from "../../utils/redux/Type"
import providerOptions from "../../utils/Wallet"

export default function Profile () {
   const [accounts, setAccounts] = useState([]);
   const [MarketContract, setMarketContract] = useState();
   const [TokenContract, setTokenContract] = useState();
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      (async () => {
         setLoading(true);
         const web3modal = new Web3Modal({
            cacheProvider: true,
            network: 'http://localhost:7545',
            providerOptions: providerOptions(), 
         });
         try{
            const provider = await web3modal.connect();
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const Market = new web3.eth.Contract(marketContract.abi, marketAddress, { from: accounts[0] });
            const Token = new web3.eth.Contract(tokenContract.abi, nftAddress, { from: accounts[0] });
            setMarketContract(Market)
            setTokenContract(Token)
            setAccounts(accounts)
            dispatch({ type: SET_ACCOUNT, payload: accounts[0] })
            setLoading(false);
         } catch (error) {
            setLoading(false)
         }
      })()
   }, [])
   const tab = ["Collected", "Created", "Saved"];
   return (
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
         <Navbar />
         <Sidebar active="Profile" />
         <Container>
               <div className="mb-10">
                  <div className="relative flex justify-center">
                     <div className="bg-gray-700/20 w-full h-32 md:h-48 rounded-lg" id="banner"></div>
                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-full absolute -bottom-12 md:-bottom-16 border-4 border-gray-100 dark:border-gray-900" id="profile-picture">
                        <Image src="/images/account.png" width={128} height={128} objectPosition="center" alt="account" className="rounded-full bg-gray-700" />
                     </div>
                  </div>
                  <div className="mt-16 md:mt-20">
                     <p className="text-xl font-bold text-center">Unnamed</p>
                     <p className="text-center dark:text-gray-300 text-gray-600 text-lg">{accounts[0] || "Not Connected"}</p>
                     <p className="text-center dark:text-gray-300 text-gray-600 mt-2">lorem ipsum dolor si sbdjei edln sjnkdajnd jksndklasedpejd lnasdknakldn jdnende</p>
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
                                       ({selected}) =>
                                       selected? "w-full md:w-32 text-lg font-medium bg-blue-700 text-white rounded-md px-4 py-2"
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
                           loading?
                           <div className="mt-5 w-full">
                              <p className="text-center">Loading...</p>
                           </div>
                           :
                           <Tab.Panels className="mt-5 w-full">
                              <Tab.Panel>
                                 <Collected marketContract={MarketContract} tokenContract={TokenContract} accounts={accounts} />
                              </Tab.Panel>
                              <Tab.Panel>
                                 <Created marketContract={MarketContract} tokenContract={TokenContract} accounts={accounts} />
                              </Tab.Panel>
                              <Tab.Panel>
                                 <p>Saved</p>
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