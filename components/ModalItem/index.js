import Image from "next/image"
import { useRouter } from "next/router"

export default function ModalItem ({image, message, onClose, children, tokenId}) {
   const router = useRouter();
   return(
      <div className="fixed backdrop-blur-sm w-full h-full flex justify-center items-center px-10 py-10" style={{zIndex: 100}}>
               <div className="bg-gray-100 w-full h-full lg:w-1/2 rounded-xl bg-gray-800 p-5 shadow flex flex-col justify-between">
                  <div className="pb-5 border-b border-gray-600 flex justify-between">
                     <p className="text-2xl font-medium text-gray-200">🎉 <span className="text-xl md:text-2xl font-semibold">Congratulation !!</span></p>
                     <p className="text-2xl font-bold" onClick={onClose}>&#215;</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-x-8 h-full py-5">
                     <div className="flex-1 w-full h-72 relative rounded-lg overflow-hidden">
                        <Image src={image} layout="fill" alt="asset" objectFit="cover" objectPosition={"center"} />
                     </div>
                     <div className="flex-1 text-gray-300">
                        <p className="mt-2 font-medium text-lg">{message}.</p>
                        <div className="mt-4 flex flex-col gap-y-2">
                           {
                              children
                           }
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-y-3 gap-x-3 border-t border-gray-600 pt-5">
                     <button className="w-full bg-blue-600 py-2 md:py-3 rounded-lg text-xl" onClick={() => router.push(`/detail/${tokenId}`)}>Go to Item</button>
                     <button className="w-full bg-gray-500 py-2 md:py-3 rounded-lg text-lg" onClick={onClose}>Close</button>
                  </div>
               </div>
            </div>
   )
}