export default function TopCreator(){
   const creators = [
      { name: "Horse Man", portofolio: "100000 ETH" },
      { name: "Diggie Crypto", portofolio: "100000 ETH" },
      { name: "Scratch Anime", portofolio: "100000 ETH" },
      { name: "Mustang", portofolio: "100000 ETH" },
      { name: "Sword Style", portofolio: "100000 ETH" },
      { name: "Kraken Crypto", portofolio: "100000 ETH" },
      { name: "Dragon Strom", portofolio: "100000 ETH" },
      { name: "Space", portofolio: "100000 ETH" },
      { name: "The Mountain", portofolio: "100000 ETH" },
      { name: "Apes Crypto", portofolio: "100000 ETH" },
   ];

   const slicer = creators.length / 2;
   const creator1 = creators.slice(0, slicer);
   const creator2 = creators.slice(slicer, slicer * 2);

   return(
      <div id="top_creator" className="text-gray-100 my-10">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4 text-gray-900 dark:text-white">Most Creator</p>
         <div className="flex flex-col md:flex-row gap-x-5">
            <div className="w-full">
               {
                  creator1.map((creator, index) => {
                     return(
                        <div key={index} className="flex items-center border-b border-gray-200 dark:border-gray-800 justify-between px-4 py-4 gap-x-6 hover:border hover:shadow shadow-gray-200/70 dark:hover:shadow-gray-700/70 hover:rounded-md text-gray-700 dark:text-gray-300">
                           <span className="text-lg font-bold">{index + 1}</span>
                           <div className="flex items-center gap-x-3 flex-grow">
                              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-100"></div>
                              <span>{creator.name}</span>
                           </div>
                           <span className="font-semibold">{creator.portofolio}</span>
                        </div>
                     )
                  })
               }
            </div>
            <div className="w-full">
               {
                  creator2.map((creator, index) => {
                     return(
                        <div key={index + 1 + slicer} className="flex items-center border-b border-gray-200 dark:border-gray-800 justify-between px-4 py-4 gap-x-6 hover:border text-gray-700 dark:text-gray-300 hover:shadow-gray-200/70 dark:hover:shadow hover:shadow-gray-700/70 hover:rounded-md">
                           <span className="text-lg font-bold">{index + 1 + slicer}</span>
                           <div className="flex items-center gap-x-3 flex-grow">
                              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-100"></div>
                              <span>{creator.name}</span>
                           </div>
                           <span className="font-semibold">{creator.portofolio}</span>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   ) 
}