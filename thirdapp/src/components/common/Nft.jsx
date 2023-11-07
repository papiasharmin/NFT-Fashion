import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { useState } from "react";
import { useEffect } from "react";
import cardimg from "./../../assets/images/cardimg.jpg"
import { LOYALTY_CONTRACT_ADRESS } from "./Constant";
import { Web3Button } from "@thirdweb-dev/react";
const Nft = (props) =>{
    const {conttact} = useContract();
    const{
        data:loyaltycard,
        isLoding: isLoyaltyCardLoading
    } = useNFT(conttact,props.tokenid)

    let [loyaltyPoint, setLoyaltyPoint] = useState(0)
   
    useEffect(()=>{
       setLoyaltyPoint(loyaltycard?.metadata.attribute[0].value)

    },[loyaltycard])
    console.log('props.nft',props.nft)

    return (
        <li style={{display:'flex',flexDirection:'column',gap:'5px', justifyContent:'center',alignItems:'center'}}>
            {props.nft.metadata.image ?
                <ThirdwebNftMedia
            
                        metadata={props.nft?.metadata}
                        height="100%"
                        width="100%"
                     
                />
                :
        
                <img
                src={cardimg}
                alt=""
                width="400"
                height="200"
                style={{
                  objectFit: "contain",
                }}
              />
        }

            {props.nft?.metadata?.atributes
             &&
            props.nft?.metadata?.atributes

            ?.map(item =>{
                console.log(item)
                return (
                    <div style={{display:'flex',gap:'15px', justifyContent:'center',alignItems:'center'}}>
                       <p>{item.traid_type}: {item.value}</p> 
                       <button className="button-outline" style={{fontSize:'12px'}}>Update Points</button>
                    </div>
                )
               })
            }
            <p>{props.nft?.metadata?.name}</p>
           
            <Web3Button
               action={(contract) => contract.erc721.cancel(props.tokenid)}
               contractAddress={LOYALTY_CONTRACT_ADRESS}
             >
            Cancel
           </Web3Button>

        </li>
    )
}



export default Nft;