export default function SekeletonCard () {
   return(
      <div className="">
         <div className="p-3 w-full bg-gray-200/70 dark:bg-gray-800/70 rounded-2xl shadow-lg dark:shadow-gray-800/50 text-gray-100 animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-10 w-full rounded-xl h-60 mb-4"></div>
            <div className="">
               <div className="flex gap-x-3 items-center my-2 px-2">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-grow flex flex-col gap-y-2">
                     <div className="h-5 w-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                     <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-3"></div>
                  </div>
               </div>
               <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg h-10 mt-4"></div>
            </div>
         </div>
      </div>
   )
}