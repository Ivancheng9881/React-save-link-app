// SPDX-License-Identifier: GPL-3.0

// defining that we are using solidity versions 0.8.0 and above
pragma solidity ^0.8.0;

// import dependencies to save/minimize on gas fees when deploying and transactions -- else more code on blockchain = higher costs
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// the contract is inheritting from ERC721 constructor -- blueprints of an Non-Fungible-Token
contract SmartContract is ERC721, Ownable {
    //using the openzeppelin Counters dependency
    using Counters for Counters.Counter;
    //important!! for allowing strings to pass as integers
    using Strings for uint256;
    //using Counters to increment tokenId variable
    Counters.Counter _tokenIds;
    //mapping is a key/value pair, in this case the key = string url, value = name of the url
    mapping(uint256 => string) _tokenURIs;

    //create a contruct that lets us easily map through all the tokens directly from the blockchain
    struct RenderToken {
        uint256 id;
        string uri;
    }

    //constructor functions in solidity runs only once -- when the smart contract is initially deployed for the first time
    constructor() ERC721("Smart Contract", "3 Kingdoms Collection") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        //mapping name = _tokenURI, saving it to "tokenId", key value is _tokenURI;
        _tokenURIs[tokenId] = _tokenURI;
    }

    //declaring "view" means person calling this function can only view
    //since tokenURI() is inside the ERC721 dependency, we must override it with keyword override and virtual
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        //"require" is similar to if statement, "_exists" is a function built in ERC721 to check if our tokenId we passed exists first, if not, function will not be executed
        require(_exists(tokenId));
        //declare memory var to query the URI of the token id
        string memory _tokenURI = _tokenURIs[tokenId];
        return _tokenURI;
    }

    //"view" functions are always read only, therefore no interactions, therefore no incurred gas fees
    //function that populates an array from tokenId 0 to latest tokenId
    //"[]" is to declare that a variable is an array
    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 latestId = _tokenIds.current();
        uint256 counter = 0;
        RenderToken[] memory res = new RenderToken[](latestId);
        for (uint256 i = 0; i < latestId; i++) {
            //if token id 0 exists...so on and so forth...ugh for loops...but they are the fastest...
            if (_exists(counter)) {
                //call the tokenURI function with argument of the counter to get back the url
                string memory uri = tokenURI(counter);
                //res[counter] refers to array's index, create new RenderToken, do not need to declare "new" on construct like in js
                res[counter] = RenderToken(counter, uri);
            }
            counter++;
        }
        return res;
    }

    //strings need to be allocated to memory -- most expensive -- only use string memory storage for uri's
    //declaring a function/variable/object "public" means that anyone can interact with it as long as they have the smart contract address on blockchain
    //declaring function mint public means we want anyone to be able to mint an nft, if declaring "onlyOwner()" allows only the deployer to interact
    function mint(address recipient, string memory uri)
        public
        returns (uint256)
    {
        //note that instead of using string memory for newId, we declare it as uint256 to save on gas fees
        uint256 newId = _tokenIds.current();

        //in ERC721 theres an internal function named "mint", which takes 2 arguments, give to which address and with which id(metadata)
        _mint(recipient, newId);

        //call _setTokenURI function
        _setTokenURI(newId, uri);

        return newId;
    }
}
