import FolderIcon from "@/icons/FolderIcon";
import ImageIcon from "@/icons/ImageIcon";
import WalletIcon from "@/icons/WalletIcon";
import colors from "tailwindcss/colors";

export default function BuyCreateAndSell (){
   return(
      <div className="text-gray-100 my-10">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4">Buy, Create and Sell Your NFTs</p>
         <div className="grid gap-3 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center">
            <div className="shadow border border-gray-800 p-4 rounded-lg flex flex-col gap-y-3">
               <div className="flex gap-y-3 flex-col justify-center">
                  <div className="bg-blue-500/20 p-1 rounded-lg w-min">
                     <WalletIcon color={colors.blue[700]} />
                  </div>
                  <span className="text-xl font-semibold">Setup Your Wallet</span>
               </div>
               <span className="">Connect to Your wallet provider Metamask, Trust Wallet, and more.</span>
            </div>
            <div className="shadow border border-gray-800 p-4 rounded-lg flex flex-col gap-y-3">
               <div className="flex gap-y-3 flex-col justify-center">
                  <div className="bg-blue-500/20 p-1 rounded-lg w-min">
                     <FolderIcon color={colors.blue[700]} />
                  </div>
                  <span className="text-xl font-semibold">Create Collection</span>
               </div>
               <span className="">Collections for storage your NFT and publisher.</span>
            </div>
            <div className="shadow border border-gray-800 p-4 rounded-lg flex flex-col gap-y-3">
               <div className="flex gap-y-3 flex-col justify-center">
                  <div className="bg-blue-500/20 p-1 rounded-lg w-min">
                     <ImageIcon color={colors.blue[700]} />
                  </div>
                  <span className="text-xl font-semibold">Buy,Create and Sell NFTs.</span>
               </div>
               <span className="">Grow up your portofolio and collection.Get and make NFTs..</span>
            </div>
         </div>
      </div>
   )
}