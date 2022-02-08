import SunIcon from "@/icons/SunIcon"
import MoonIcon from "@/icons/MoonIcon"
import colors from "tailwindcss/colors"
import { useTheme } from "next-themes"

export default function DarkModeToggle () {
   const { theme, setTheme } = useTheme()

   if(theme == "light"){
      return(
         <button className="focus:bg-gray-200 dark:focus:bg-gray-800 p-2 rounded" onClick={() => setTheme("dark")}>
            <MoonIcon color={colors.blue[700]} width={24} height={24} alt="light" />
         </button>
      )
   }

   return (
      <button className="focus:bg-gray-200 dark:focus:bg-gray-800 p-2 rounded" onClick={() => setTheme("light")}>
         <SunIcon color={colors.blue[700]} width={24} height={24} alt="light" />
      </button>
   )
}