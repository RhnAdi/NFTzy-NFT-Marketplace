import colors from "tailwindcss/colors";
import WalletIcon from "@/icons/WalletIcon";

const BuyButton = ({onClick}) => {
   return (
      <button className="my-4 bg-blue-600 flex items-center gap-x-3 rounded-lg flex flex-row justify-center items-center h-min py-3 w-full" onClick={onClick}>
         <WalletIcon color={colors.gray[100]} />
         <p className="text-lg font-bold">Buy Now</p>
      </button>
   )
}

export default BuyButton;