
//import Web3 from 'web3';
import MultiSigWallet from './../../contracts/MultiSigWallet.json';
import MyToken from './../../contracts/MyToken.json';
import WalletFactory from './../../contracts/WalletFactoryV4.json';
import { CHAIN_ID, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL } from "./../common/Constant";
import { ethers } from 'ethers';


export const createWllet= () =>{

      let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      return provider;
}
export const mainnetProvider = new ethers.providers.JsonRpcProvider(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.APIKEY}`
    )
export const getProvider= () =>{
      let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      return provider;
}

console.log('CHAIN',CHAIN_ID,RPC_URL)
const createContractObject = ( contractAbi, contractAddress) => {
      // get provider

      let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      let contract = new ethers.Contract(contractAddress, contractAbi, provider)
      
      return contract
};

export const getDid = async(signer) => {
    
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
       
       const result = await FactoryContract.dids(signer) 
       console.log('FACTORIDD', result)
      return result;
};


export const getTokenBalanceOf = async(signer) => {
      
 
      const MyTokenContract  = createContractObject(MyToken.abi, MYTOKEN_ADDRESS);
      // get token balance
      const num = await MyTokenContract.balanceOf(signer)
 
      return Number(num);
};

export const getRegisterStatus = async(signer) => {

      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get status info
      var status = await FactoryContract.isRegistered(signer)
      return status;
};

export const userexist = async(email) => {
      
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get status info
      const status = await FactoryContract.userExist(email)
      let userinfo;
      if(status){
         userinfo = await FactoryContract.getUser(email)
      }
      return userinfo;
};



export const getVcs = async(did) => {
      
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      var vcs = await FactoryContract.getVcs(did);
      console.log('VCS', vcs)
      return vcs;
};


export const walletsCount = async() => {
     
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get wallet addresses
      const count = await FactoryContract.walletsCount();
      
      return Number(count);
};



export const getWallets = async(count, start) => {
    
      const FactoryContract = createContractObject(WalletFactory.abi, CONTRACT_ADDRESS);
      // get Verifiable Credentials info
      const multiSigWallets = await FactoryContract.getWallets(count, start);
     
      return multiSigWallets;
};




export const getWalletInfo = async(addr) => {

      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      
      // get Verifiable Credentials info
       const wName = await WalletContract.getName();
       let required = await WalletContract.getRequired();
       let counts = await WalletContract.getOwnersCount();
       let balance = await WalletContract.getAsset();
       let ownersaddr = await WalletContract.getOwners();
       required = Number(required);
       counts = Number(counts)
       balance = ethers.utils.formatEther( Number(balance).toString())
      console.log('walletinfo',required, counts, balance, ownersaddr)
      return {
            wName,
             required,
             counts,
             ownersaddr,
             balance
      };
};


export const getApprovalCount = async(addr, index) => {

      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
     
      const approvement = await WalletContract._getApprovalCount(index);
       console.log('aprove',approvement)
      return Number(approvement);
}; 


export const getRequired = async(addr) => {
 
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
    
      const req = await WalletContract.getRequired();
      console.log('require',req)
      return Number(req);
}; 


export const getTxs = async(addr) => {
      
      const WalletContract = createContractObject(MultiSigWallet.abi, addr);
      
      const transactions = await WalletContract.getTxs();
      console.log('transactions',transactions)
      return transactions;
};



