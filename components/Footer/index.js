import Image from "next/image"

export default function Footer(){
   return(
      <>
      <div className="text-gray-100 border-t border-gray-700 py-10 flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">
         <div className="flex flex-col gap-y-4 md:w-80 lg:w-96">
            <div className="flex gap-x-3 justify-center md:justify-start">
               <Image src="/logo.png" width={32} height={32} alt="Logo" />
               <p className="title text-2xl font-semibold">NFTzy</p>
            </div>
            <p className="text-md">NFTzy is a digital marketplace for non-fungitable token.We will to be make better transaction and connection with creator nft in the world.</p>
         </div>
         <div className="flex flex-col gap-y-4">
            <p className="text-xl font-large">Marketplace</p>
            <div className="flex flex-col gap-y-1">
               <p>All NFTs</p>
               <p>Art</p>
               <p>Music</p>
               <p>Domain</p>
               <p>Metaverse</p>
               <p>World</p>
               <p>Sports</p>
               <p>Utility</p>
            </div>
         </div>
         <div className="flex flex-col gap-y-4">
            <p className="text-xl font-large">Account</p>
            <div className="flex flex-col gap-y-1">
               <p>Creator</p>
               <p>My NFT</p>
               <p>Profile</p>
               <p>Saved</p>
            </div>
         </div>
         <div className="flex flex-col gap-y-4">
            <p className="text-xl font-large">Resources</p>
            <div className="flex flex-col gap-y-1">
               <p>Help Center</p>
               <p>Platform Informations</p>
               <p>Partner</p>
               <p>Gas-Free Marketplace</p>
               <p>Blog</p>
               <p>News latter</p>
            </div>
         </div>
      </div>
      <p className="py-4 text-center text-gray-500">&copy;Copyright 2021 with RhnAdi.</p>
      </>
   )
}