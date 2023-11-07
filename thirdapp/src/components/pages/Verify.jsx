
import React from "react";

import Header from "./../common/header"


const Verify = () => {
    return (
      
<div className='parent-div'>
<Header/>
<div className='buy-centerdiv'>

    <p><strong>You can verify VC</strong></p>
                        
    <blockcerts-verifier></blockcerts-verifier>
    <div className="inputs-verify-vc">
            <input type="text" placeholder='Certificate URL'/>
            <button >Verify</button>
        </div>
                        
</div>
</div>
     
       
    );
};

export default Verify;