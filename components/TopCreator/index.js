import sortAddress from "../../utils/sortAddress";
import Image from "next/image"
import Link from "next/link"

export default function TopCreator({data}){

   const slicer = Math.ceil(data?.length / 2);
   const creator1 = data?.slice(0, slicer);
   const creator2 = data?.slice(slicer, slicer * 2);

   return(
      <div id="top_creator" className="text-gray-100 my-10">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4 text-gray-900 dark:text-white">Most Creator</p>
         <div className="flex flex-col md:flex-row gap-x-5">
            <div className="w-full">
               {
                  creator1?.map((creator, index) => {
                     return(
                        <Link key={index} href={`/accounts/profile/${creator._id}`}>
                        <a className="flex items-center border-b border-gray-200 dark:border-gray-800 justify-between px-4 py-4 gap-x-6 hover:border hover:shadow shadow-gray-200/70 dark:hover:shadow-gray-700/70 hover:rounded-md text-gray-700 dark:text-gray-300">
                           <span className="text-lg font-bold">{index + 1}</span>
                           <div className="flex items-center gap-x-3 flex-grow">
                              <div className="relative h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-100 overflow-hidden">
                                 <Image layout="fill" src={creator.profile?.photo_profile || "/images/account.png"} alt="pp" />
                              </div>
                              <span className="truncate">{creator.profile?.username || sortAddress(creator._id)}</span>
                           </div>
                           <span className="font-semibold">{creator.totalItem} Item Created</span>
                        </a>
                        </Link>
                     )
                  })
               }
            </div>
            <div className="w-full">
               {
                  creator2?.map((creator, index) => {
                     return(
                        <Link key={index + 1 + slicer} href={`/accounts/profile/${creator._id}`}>
                        <a className="flex items-center border-b border-gray-200 dark:border-gray-800 justify-between px-4 py-4 gap-x-6 hover:border text-gray-700 dark:text-gray-300 hover:shadow-gray-200/70 dark:hover:shadow hover:shadow-gray-700/70 hover:rounded-md">
                           <span className="text-lg font-bold">{index + 1 + slicer}</span>
                           <div className="flex items-center gap-x-3 flex-grow">
                              <div className="relative h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-100 overflow-hidden">
                                 <Image layout="fill" src={creator.profile?.photo_profile || "/images/account.png"} alt="pp" />
                              </div>
                              <span className="truncate">{creator.profile?.username || sortAddress(creator._id)}</span>
                           </div>
                           <span className="font-semibold">{creator.totalItem} Item Created</span>
                        </a>
                        </Link>
                     )
                  })
               }
            </div>
         </div>
      </div>
   ) 
}