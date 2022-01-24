import WalletIcon from "@/icons/WalletIcon";
import colors from "tailwindcss/colors";
import Web3Modal from "web3modal";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import { SET_ACCOUNT, SET_WEB3 } from "utils/redux/Type";
import providerOptions from "../../utils/Wallet"

export default function ButtonWallet () {
   const dispatch = useDispatch();
   const onConnect = async () => {
      try {
         const web3Modal = new Web3Modal({
            cacheProvider: true,
            network: 'http://localhost:7545',
            providerOptions: providerOptions(),
         });
         web3Modal.clearCachedProvider();
         const provider = await web3Modal.connect();
         const web3 = new Web3(provider);
         const accounts = await web3.eth.getAccounts();
         dispatch({ type: SET_WEB3, payload: web3 });
         dispatch({ type: SET_ACCOUNT, payload: accounts });
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <button className="focus:bg-gray-200 dark:focus:bg-gray-800 p-2 rounded" onClick={onConnect}>
         <WalletIcon color={colors.blue[700]} width={24} height={24} alt="wallet" />
      </button>
   )
}