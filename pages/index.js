import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Trending from "@/components/Trending";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import TopCreator from "@/components/TopCreator";
import Categories from "@/components/Categories";
import BuyCreateAndSell from "@/components/BuyCreateAndSell";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import NFTcontract from "../build/contracts/token.json";
import NFTzycontract from "../build/contracts/market.json";
import { marketAddress, nftAddress } from "../utils/address";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SekeletonCard from "@/components/Card/SekeletonCard";
import { SET_MARKETCONTRACT, SET_TOKENCONTRACT, SET_WEB3 } from "utils/redux/Type";

const Home = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const web3 = useSelector(state => state.web3);
  const marketContract = useSelector(state => state.web3);
  const tokenContract = useSelector(state => state.web3);

  const dispatch = useDispatch()

  const initial = async () => {
    setLoading(true);
    try {
      const web3 = new Web3('http://127.0.0.1:7545');
      const marketContract = await new web3.eth.Contract(NFTzycontract.abi, marketAddress);
      const tokenContract = await new web3.eth.Contract(NFTcontract.abi, nftAddress);
      const items = await marketContract.methods.fetchMarketItems().call();
      const data = await Promise.all(items.map(async (item, index) => {
        const tokenUri = await tokenContract.methods.tokenURI(item.tokenId).call();
        const meta = await axios.get(tokenUri);
        const price = await item.price.toString();
        const nft = {
          tokenId: parseInt(item.tokenId),
          name: meta.data.name,
          description: meta.data.description,
          image: meta.data.image,
          price: price,
          owner: item.owner,
          seller: item.seller,
        }
        return nft;
      }));
      setNfts(data);
      setLoading(false);
      dispatch({type: SET_WEB3, payload: web3});
      dispatch({type: SET_MARKETCONTRACT, payload: marketContract});
      dispatch({type: SET_TOKENCONTRACT, payload: tokenContract});
    } catch (error) {
      console.log('Error => ', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    initial();
  }, []);
  
  return(
    <div className={`bg-gray-100 dark:bg-gray-900`}>
      <Sidebar active="Dashboard" />
      <Navbar />
      <Container>
        <>
          <Hero />
          {
            loading?
            <div className="text-gray-100 my-10">
              <p className="text-lg lg:text-2xl font-bold tracking-wider mb-4">Trending</p>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4 overflow-auto gap-x-4">
                <SekeletonCard />
                <SekeletonCard />
                <SekeletonCard />
                <SekeletonCard />
                <SekeletonCard />
                <SekeletonCard />
              </div>
            </div>
            :
            <Trending trending_nft={nfts} />
          }
          <TopCreator />
          <Categories />
          <BuyCreateAndSell />
          <Community />
          <Footer />
        </>
      </Container>
    </div>
  )
}

export default Home;