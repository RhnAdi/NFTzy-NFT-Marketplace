// SPDX-Licensi-Indentifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract market is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemSold;
    address payable owner;
    uint256 constant listingPrice = 0.0025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address tokenAddress;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        uint256 created;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 itemId,
        address tokenAddress,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        uint256 created
    );

    event ItemTransfered(
        uint256 tokenId,
        address from,
        address to,
        uint256 timestamp
    );

    function getListingPrice() public pure returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address tokenAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei.");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price."
        );
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            tokenAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            block.timestamp
        );
        IERC721(tokenAddress).transferFrom(
            payable(msg.sender),
            address(this),
            tokenId
        );
        emit MarketItemCreated(
            itemId,
            tokenAddress,
            tokenId,
            msg.sender,
            address(0),
            price,
            false,
            block.timestamp
        );
    }

    function createMarketSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase."
        );
        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemSold.increment();
        payable(owner).transfer(listingPrice);
    }

    function getMarketItem(uint256 _itemId)
        public
        view
        returns (MarketItem memory)
    {
        return idToMarketItem[_itemId];
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](
            _itemIds.current() - _itemSold.current()
        );
        for (uint256 i = 0; i < _itemIds.current(); i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                MarketItem storage item = idToMarketItem[i + 1];
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < _itemIds.current(); i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                MarketItem storage item = idToMarketItem[i + 1];
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < _itemIds.current(); i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < _itemIds.current(); i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                MarketItem storage item = idToMarketItem[i + 1];
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }
        return items;
    }

    function TransferItem(
        address nftContract,
        uint256 _tokenId,
        address payable _to
    ) public returns (uint256) {
        require(
            idToMarketItem[_tokenId].owner == msg.sender,
            "You're is not owner."
        );
        idToMarketItem[_tokenId].owner = _to;
        IERC721(nftContract).transferFrom(msg.sender, _to, _tokenId);
        emit ItemTransfered(_tokenId, msg.sender, _to, block.timestamp);
        return _tokenId;
    }
}
