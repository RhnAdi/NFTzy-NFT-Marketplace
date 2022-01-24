
import Authereum from 'authereum';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default function providerOptions() {
   return {
      authereum: {
         package: Authereum
      },
      walletconnect: {
         package: WalletConnectProvider,
         options: {
            infuraId: "-"
         }
      },
      injected: {
           display: {
             logo: '/images/metamask.png',
             name: 'Metamask',
             description: 'Connect with the provider in your Browser',
           },
           package: null,
         },
   }
 };
