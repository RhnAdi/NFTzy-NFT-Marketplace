import WalletIcon from "@/icons/WalletIcon";
import colors from "tailwindcss/colors";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import { SET_ACCOUNT, SET_WEB3 } from "utils/redux/Type";

export default function ButtonWallet () {
   const dispatch = useDispatch();
   const providerOptions = {
      metamask: {
         id: "injected",
         name: "Metamask",
         type: "Injected",
         check: "isMetamask",
      },
      // authereum: {
      //    package: Authereum,
      // }
   }
   const onConnect = async () => {
      const web3Modal = new Web3Modal({
         cacheProvider: false,
         disableInjectedProvider: false,
         providerOptions
      })
      await web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      dispatch({ type: SET_WEB3, payload: web3 });
      dispatch({ type: SET_ACCOUNT, payload: accounts });
   }
   return (
      <button className="focus:bg-gray-800 p-2 rounded" onClick={onConnect}>
         <WalletIcon color={colors.gray[300]} width={24} height={24} alt="wallet" />
      </button>
   )
}