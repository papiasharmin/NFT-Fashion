import React, {useState, useEffect} from 'react';
import logo from './../../assets/images/logo.png'
import DID from './../../assets/images/did.jpg'
import QR from './../../assets/images/qrcode.png'
import Wallet from './../../assets/images/wallet.png'
import Bars from './../../assets/images/bars.png'
import Cube from './../../assets/images/cube.png'
import User from './../../assets/images/user.png'
import Aptos from './../../assets/images/aptos.png'
import Exit from './../../assets/images/exit.png'
import {Link, useNavigate} from 'react-router-dom'
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useMyContext } from './../../Contexts/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBars} from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';




const Home = () => {
    const [rightsidebar,setrightsidebar] = useState(false);
    const [leftsidebar,setleftsidebar] = useState(false);
    const Showright = ()=>setrightsidebar(!rightsidebar);
    const Showleft = ()=>setleftsidebar(!leftsidebar);
   
    
    const {
        currentAccount,
        setCurrentAccount,
        setKey
     
    } = useMyContext();

    const navigate = useNavigate()

    function redir(){
        console.log("redirect")
        navigate('/')
    }
    
    let address = useAddress()
    console.log('header',currentAccount,address)



  return (
    <>
    <div className="navbar">
        <div className="logobox">
            <img src={logo} alt="logo" />
            
            <input type="checkbox" id="sidebarclick" onClick={Showleft}/>
          
            <label id='sidebarbutton' htmlFor="sidebarclick">
            
        
            <FontAwesomeIcon icon={faCaretDown} size='lg' style={{color: "#b4bac5",}}/>
            </label>
        </div>
        <div className="features">
            <div className="search">
               <ConnectWallet/>
            </div>
            <input type="checkbox" name="check" id="navbtn" onClick={Showright}/>
           
            <label htmlFor="navbtn">
            <FontAwesomeIcon icon={faBars} size='lg' style={{color: "#b4bac5",}}/>
            </label>
        </div>
    </div>

    <div className={leftsidebar?  'notactive-sidebar': 'sidebar-header'}>
        <Link to={'/home'}><img src={DID} alt="logo" /></Link>
        <Link to={'/home'}><img src={QR} alt="logo" /></Link>
        <Link to={'/wallets'}><img src={Wallet} alt="logo" /></Link>
        <Link to={'/home'}><img src={Bars} alt="logo" /></Link>
        <Link to={'/home'}><img src={Cube} alt="logo" /></Link>
        <Link to={'/home'}><img src={User} alt="logo" /></Link>
        <Link to={'/home'} id='aptos'><img src={Aptos} alt="logo" /> <p>Aptos</p> </Link>
        <Link to={'/'}><img src={Exit} alt="logo" /></Link>
    </div>

    <div className={rightsidebar? 'active' : 'notactive'}>
            <Link to={'/home'}>
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </Link>
            <Link to={'/Wallets'}>
                <i class="fa-solid fa-wallet"></i>
                <span>Wallets</span>
            </Link>
            <Link to={'/create'}>
                <i class="fa-solid fa-plus"></i>
                <span>Create</span>
            </Link>
            <Link to={'/buy'}>
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Buy</span>
            </Link>
            <Link to={'/upload'}>
                <i class="fa-solid fa-upload"></i>
                <span>Upload</span>
            </Link>
            <Link to={'/myvc'}>
                <i class="fa-solid fa-address-card"></i>
                <span>MyVC</span>
            </Link>
            <Link to={'/Verify'}>
                <i class="fa-solid fa-check-to-slot"></i>
                <span>Verify VCS</span>
            </Link>
            <Link to={'/'}>
                <i class="fa-sharp fa-solid fa-door-open"></i>
                <span>Logout</span>
            </Link>
            <div className="upward">
                <label htmlFor="navbtn"><i class="fa-sharp fa-solid fa-chevron-up"></i></label>
            </div>
        </div>
    </>
  )
}

export default Home