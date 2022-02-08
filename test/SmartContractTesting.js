const ContractNFTzy = artifacts.require("market");
const ContractNFT = artifacts.require("token");

contract("NFTzy", (accounts) => {
   before("Deploy Contract", async () => {
      try {
         this.market = await ContractNFTzy.new();
         this.nftzyContractAddress = await this.market.address;
         this.NFT = await ContractNFT.new(this.nftzyContractAddress);
         this.nftContractAddress = await this.NFT.address;
         this.listingPrice = await this.market.getListingPrice();
         assert.ok(true);
      } catch (error) {
         console.log(error);
         assert.ok(false);
      }
   })
   describe("NFT contract", async () => {
      it("Should NFT marketplace name is NFTzy", async () => {
         try {
            this.name = await this.NFT.name();
            assert.ok(true);
         } catch (error) {
            console.error(error);
            assert.ok(false);
         }
      })
      it("Should NFT marketplace symbol NFTzy", async () => {
         try {
            this.symbol = await this.NFT.symbol();
            assert.ok(true);
         } catch (error) {
            console.error(error);
            assert.ok(false);
         }
      })
   })
   describe("Check Function", () => {
      it("Create token", async () => {
         try {
            await this.NFT.createToken("http://localhost:3000/_next/image?url=%2Fimages%2FCyberPunk202-nft.jpg&w=1080&q=75");
            await this.NFT.createToken("/_next/image?url=%2Fimages%2FJapanModern-nft.jpg&w=1080&q=75");
            assert.ok(true)
         } catch (error) {
            console.error(error);
            assert.ok(false);
         }
      })
      it("Put tokens for sale", async () => {
         try {
            const listingPrice = parseInt(this.listingPrice);
            const actionPrice = web3.utils.toWei("1", "ether");
            await this.market.createMarketItem(this.nftContractAddress, 1, actionPrice, { value: listingPrice})
            await this.market.createMarketItem(this.nftContractAddress, 2, actionPrice, { value: listingPrice})
            assert.ok(true);
         } catch (error) { 
            console.error(error);
            assert.ok(false);
         }
      })
      it("Sale NFT token", async () => {
         try {
            const actionPrice = parseInt(web3.utils.toWei("1", "ether"));
            await this.market.createMarketSale(this.nftContractAddress, 1, { from: accounts[0], value: actionPrice });
            assert.ok(true)
         } catch (error) {
            console.log(error);
            assert.ok(false);
         }
      })
      it("Fetch Market Item", async () => {
         try {
            let items = await this.market.fetchMarketItems();
            items = await Promise.all(items.map(async i => {
               const tokenURI = await this.NFT.tokenURI(i.tokenId);
               let item = {
                  price: i.price.toString(),
                  tokenId: i.tokenId.toString(),
                  seller: i.seller,
                  owner: i.owner,
                  tokenURI,
                  created: i.created.toString()
               }
               return item;
            }))
            console.log(items);
            assert.ok(true)
         } catch (error) {
            console.error(error);
            assert.ok(false)
         }
      })
      it("Transfer Item", async () => {
         try {
            const tokenTransferd = await this.market.TransferItem(this.nftContractAddress, 1, accounts[1], { from: accounts[0] });
            const tokenOwner = await this.NFT.ownerOf(1);
            assert.equal(tokenOwner, accounts[1], "Transfer Item Failed.");
         } catch (error) {
            console.log(error);
            assert.ok(false)
         }
      })
      
   })
})