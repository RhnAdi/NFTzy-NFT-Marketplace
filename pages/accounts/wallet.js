import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default  function Wallet() {
   return (
      <div className="text-gray-100 bg-gray-100 dark:bg-gray-900">
         <Sidebar active="Wallet" />
         <Navbar />
         <Container>
            <div className="mt-3 mb-20">
               <p className="text-2xl text-center text-gray-900 dark:text-white">Connect Your Wallet</p>
               <p className="text-md text-center text-gray-800 dark:text-gray-200">Connect with one of our available wallet providers or create a new one.</p>
               <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-200/70 backdrop-blur dark:bg-gray-800 py-8 flex flex-col items-center rounded-lg gap-y-2 px-3">
                     <Image src="/images/metamask.png" width={50} height={50} alt="metamask" className="bg-transparent rounded-full" />
                     <p className="text-xl text-gray-900 dark:text-white">Metamask</p>
                     <p className="text-center text-gray-800 dark:text-gray-300">Connected to metamask wallet provider.</p>
                  </div>
                  <div className="bg-gray-200/70 backdrop-blur dark:bg-gray-800 py-8 flex flex-col items-center rounded-lg gap-y-2 px-3">
                     <Image src="/images/walletconnect.png" width={50} height={50} alt="metamask" className="bg-gray-800 rounded-full" />
                     <p className="text-xl text-gray-900 dark:text-white">Wallet Connect</p>
                     <p className="text-center text-gray-800 dark:text-gray-300">Connected to wallet connect provider.</p>
                  </div>
                  <div className="bg-gray-200/70 backdrop-blur dark:bg-gray-800 py-8 flex flex-col items-center rounded-lg gap-y-2 px-3">
                     <Image src="/images/authereum.png" width={50} height={50} alt="authereum" className="bg-gray-800 rounded-full" />
                     <p className="text-xl text-gray-900 dark:text-white">Authereum</p>
                     <p className="text-center text-gray-800 dark:text-gray-300">Connected to Authereum wallet provider.</p>
                  </div>
               </div>
            </div>
            <Footer />
         </Container>
      </div>
   )
}