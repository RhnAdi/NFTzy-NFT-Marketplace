import BallIcon from "@/icons/BallIcon";
import Card2Icon from "@/icons/Card2Icon";
import CdIcon from "@/icons/CdMusic";
import ImageIcon from "@/icons/ImageIcon";
import UtilityIcon from "@/icons/UtilityIcon";
import WorldIcon from "@/icons/WorldIcon";
import colors from "tailwindcss/colors";

export default function Categories(){
   const categories = [
      { 
         title: "Art", 
         sub: "Collect your favorite art and make better portofolio.", 
         icon: <ImageIcon color={colors.blue[700]} width={32} height={32} /> 
      },
      { 
         title: "Music", 
         sub: "Collect your favorite music and make better portofolio.", 
         icon: <CdIcon color={colors.blue[700]} width={32} height={32} />
      },
      { 
         title: "Sports", 
         sub: "Collect your favorite sport and make better portofolio.", 
         icon: <BallIcon color={colors.blue[700]} width={32} height={32} /> 
      },
      { 
         title: "Worlds", 
         sub: "Collect your favorite world and make better portofolio.", 
         icon: <WorldIcon color={colors.blue[700]} width={32} height={32} /> 
      },
      { 
         title: "Utility", 
         sub: "Collect your favorite utility and make better portofolio.", 
         icon: <UtilityIcon color={colors.blue[700]} width={32} height={32} /> 
      },
      { 
         title: "All Nfts", 
         sub: "Collect your favorite Nfts and make better portofolio.", 
         icon: <Card2Icon color={colors.blue[700]} width={32} height={32} /> 
      },
   ]
   return(
      <div className="text-gray-100 my-10">
         <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4">Categories</p>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {
               categories.map((categori, index) => {
                  return(
                     <div key={index} className="bg-gray-800/50 rounded-xl px-4 py-4 flex flex-col gap-y-3">
                        <div className="flex gap-x-3 items-center">
                           <div className="bg-blue-500/20 p-1 rounded-lg">
                              { categori.icon }
                           </div>
                           <span className="text-xl font-bold">{categori.title}</span>
                        </div>
                        <p className=" text-lg">{categori.sub}</p>
                        <p className="text-blue-700 text-lg">Explore</p>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}