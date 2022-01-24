import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import Container from "@/components/Container"
import Footer from "@/components/Footer"
import Input from "@/components/Input"
import { useState, useEffect } from "react"
import Web3 from "web3"
import web3Modal from "web3modal"
import ImageIcon from "@/icons/ImageIcon"
import Image from "next/image"
import colors from "tailwindcss/colors"
import Link from "next/link"

export default function Setting () {
   const [account, setAccount] = useState();
   const [photo, setPhoto] = useState(null);
   const [photoUrl, setPhotoUrl] = useState(null);
   const [banner, setBanner] = useState(null);
   const [bannerUrl, setBannerUrl] = useState(null);
   const [loadingAccount, setLoadingAccount] = useState(false);
   const [loading ,setLoading] = useState(false);
   const [sites, setSites] = useState([]);
   const [link, setLink] = useState();
   useEffect(() => {
      const Web3Modal = new web3Modal("http://127.0.0.1:7545");
      (async () => {
         try {
            setLoadingAccount(true);
            const provider = await Web3Modal.connect();
            const web3 = new Web3(provider);
            const Accounts = await web3.eth.getAccounts();
            setAccount(Accounts[0]);
            setLoadingAccount(false);
         } catch (error) {
            setLoadingAccount(false);
         }
      })()
   }, [])
   function _addSites (e) {
      e.preventDefault();
      if(!link) return
      setSites(state => {
         return [
            ...state,
            link
         ]
      })
      setLink("");
   }
   function _handlePhoto(e){
      if(e.target.files[0]){
         setPhoto(e.target.files[0]);
         setPhotoUrl(URL.createObjectURL(e.target.files[0]));
      } 
      return
   }
   function _handleBanner(e){
      if(e.target.files[0]){
         setBanner(e.target.files[0]);
         setBannerUrl(URL.createObjectURL(e.target.files[0]));
      } 
      return
   }
   return(
      <div className="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
         <Sidebar active="Setting" />
         <Navbar />
         <Container>
            <div className="text-gray-900 dark:text-gray-100 mb-20 backdrop-blur-lg backdrop-filter bg-gray-200/20 dark:bg-gray-800/20 px-4 py-6 sm:p-8 md:p-10 rounded-lg border-t-8 border-blue-600 shadow-sm">
               <p className="text-2xl font-bold border-b border-gray-300 dark:border-gray-800 pb-4">Setting</p>
               <form className="w-full">
                  <div className="flex flex-col md:flex-row gap-x-10 w-full">
                     <div className="flex flex-col gap-y-2 mt-8">
                           <p className="text-lg">Photo Profile</p>
                           <label htmlFor="photo" className="cursor-pointer w-min">
                              <div className="w-44 h-44 bg-gray-300 dark:bg-gray-800 flex justify-center items-center rounded-full overflow-hidden">
                                 {
                                    photo == null?
                                       <ImageIcon color={colors.gray[100]} width={42} height={42} />
                                    :
                                       <div className="w-full h-full relative"> 
                                          <Image layout="fill" alt="file" className="w-full h-full" objectFit="cover" objectPosition={"center"} src={photoUrl} />
                                       </div>
                                 }
                              </div>
                           </label>
                           <input type="file" id="photo" className="hidden" onChange={_handlePhoto} />
                        </div>
                     <div className="flex flex-col gap-y-2 mt-8 w-full md:w-min">
                           <p className="text-lg">Banner</p>
                           <label htmlFor="banner" className="cursor-pointer w-full">
                              <div className="w-full md:w-96 h-44 bg-gray-300 dark:bg-gray-800 flex justify-center items-center rounded-lg overflow-hidden">
                                 {
                                    bannerUrl == null?
                                       <ImageIcon color={colors.gray[100]} width={42} height={42} />
                                    :
                                       <div className="w-full h-full relative"> 
                                          <Image layout="fill" alt="file" className="w-full h-full" objectFit="cover" objectPosition={"center"} src={bannerUrl} />
                                       </div>
                                 }
                              </div>
                           </label>
                           <input type="file" id="banner" className="hidden" onChange={_handleBanner} />
                        </div>
                  </div>
                  <div className="mt-4 mb-10 flex flex-col gap-y-3">
                     <Input title="Account Address" required value={account} placeholder="Account Address" disabled />
                     <Input title="Username" required placeholder="Username" />
                     <Input title="Email" placeholder="Email" />
                     <div className="flex flex-col gap-y-2">
                        <label className="text-lg" htmlFor="bio">Bio</label>
                        <textarea
                           placeholder="Biodata"
                           className="px-4 py-2 placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-400 rounded bg-gray-200 dark:bg-gray-800 outline-none focus:ring-2 ring-blue-700/70 h-32"
                           id="bio"
                           required
                        />
                     </div>
                     <div className="flex flex-col gap-y-2">
                        <label className="text-lg" htmlFor="bio">Sites</label>
                        {
                           sites.map((site, index) => {
                              return <p key={index}>&#x1F517; <a href={site} className="text-sky-700">{site}</a></p>
                           })
                        }
                        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2">
                           <input className="px-4 py-2 placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-400 rounded bg-gray-200 dark:bg-gray-800 outline-none focus:ring-2 ring-blue-700/70 sm:flex-grow" placeholder="Link" onChange={(e)=>setLink(e.target.value)} value={link} />
                           <button onClick={_addSites} className="px-5 border border-blue-800 py-2 text-blue-700 rounded active:bg-gray-800/50">&#43; Add Site</button>
                        </div>
                     </div>
                  </div>
                  {
                     loading?
                     <button className="text-lg font-bold px-8 py-3 rounded bg-gray-600 shadow shadow-gray-800/50 text-gray-100 w-full flex items-center justify-center gap-x-2" disabled >
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                     </button>
                     :
                     <button type="submit" className="text-lg font-bold px-8 py-3 rounded bg-blue-800 shadow shadow-blue-800/50 text-gray-100 w-full">Save</button>
                  }
               </form>
            </div>
            <Footer />
         </Container>
      </div>
   )
}