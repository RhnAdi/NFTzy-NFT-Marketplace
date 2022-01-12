import DiscordIcon from "@/icons/DiscordIcon";
import FacebookIcon from "@/icons/FacebookIcon";
import InstagramIcon from "@/icons/InstagramIcon";
import LinkedIcon from "@/icons/LinkedIcon";
import RedditIcon from "@/icons/RedditIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import colors from "tailwindcss/colors";

export default function Community(){
   return(
      <div className="text-gray-100 my-10 flex flex-col gap-y-10">
         <div className="flex flex-col justify-center items-center gap-y-3">
            <p className="text-lg lg:text-2xl font-bold tracking-wider">Subscribe</p>
            <input placeholder="Email Address ..." className="md:w-96 w-72 px-3 py-2 bg-gray-800 rounded-lg outline-none" />
            <button className="bg-red-700 px-5 py-2 rounded-lg">Subscribe</button>
         </div>
         <div className="flex flex-col justify-center items-center gap-y-3">
            <p className="text-lg lg:text-2xl font-bold tracking-wider">Community</p>
            <div className="flex gap-3 flex-wrap items-center justify-center">
               <div className="bg-gray-800 rounded p-2">
                  <TwitterIcon color={colors.gray[200]} />
               </div>
               <div className="bg-gray-800 rounded p-2">
                  <FacebookIcon color={colors.gray[200]} />
               </div>
               <div className="bg-gray-800 rounded p-2">
                  <LinkedIcon color={colors.gray[200]} />
               </div>
               <div className="bg-gray-800 rounded p-2">
                  <RedditIcon color={colors.gray[200]} />
               </div>
               <div className="bg-gray-800 rounded p-2">
                  <InstagramIcon color={colors.gray[200]} />
               </div>
               <div className="bg-gray-800 rounded p-2">
                  <DiscordIcon color={colors.gray[200]} />
               </div>
            </div>
         </div>
      </div>
   )
}