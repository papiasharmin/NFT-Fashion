
import { BrowserQRCodeReader } from "@zxing/browser";
import React, { useEffect, useRef, useState } from "react";
import './QrCodeReader.css';


const QrCodeReader = ({ onRead, setOpen }) => {
      
      const videoRef = useRef(null);
      const mountedRef = useRef(false);
      
      const [devices, setDevices] = useState([]);
      const [currentCamera, setCurrentCamera] = useState(undefined);
    
      /**
       * setDevicesList function
       * @returns 
       */
      const setDevicesList = async () => {
            // const list = await BrowserQRCodeReader.listVideoInputDevices();
            const list = await navigator.mediaDevices.enumerateDevices();
            const result = [];
            for (const device of list) {
                  result.push({ id: device.deviceId, name: device.label });
            }
            setDevices([...result]);
            return result;
      };
    
      useEffect(() => {
            mountedRef.current = true;
            const codeReader = new BrowserQRCodeReader(undefined, 'video');
            setDevicesList();

            codeReader.decodeFromVideoDevice(undefined, videoRef.current, function (result, _, controls) {
                  if (mountedRef.current === false) {
                        controls.stop();
                        return;
                  }
                  if (typeof result !== "undefined") {
                        controls.stop();
                        onRead(result);
                  }
            });

            return function cleanup() {
                  mountedRef.current = false;
            };
      }, [currentCamera]);
    
    
      return (
            <div 
               className='walletdetail'
               style={{zIndex:'10'}}
            >
            <h3>
                        Please read QRCode
             </h3>
             {
                        devices.length !== 0 &&
                        <select
                              value={currentCamera === undefined ? devices[0]?.id : currentCamera}
                              onChange={e => { setCurrentCamera(e.target.value); }}
                              style={{ width: "90%", maxWidth: "1000px" }}
                        >
                              {devices.map((device, index) => <option value={device.id} key={index.toString()} >{device.name}</option>)}
                        </select>
                  }
              
                  <video 
                        style={{overflow:'scroll', width: "70%", maxWidth: "1000px", borderRadius: "10px", marginTop: "1em", marginBottom: "1em" }} 
                        ref={videoRef} 
                  />
                  <button
                     
                        style={{ width: "90%", maxWidth: "1000px" }} 
                        onClick={() => setOpen(false)} 
                       
                  >
                        STOP
                  </button>
            </div >
      );
    
};
    
export default QrCodeReader;


