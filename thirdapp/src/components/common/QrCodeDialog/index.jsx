
import QRCode from 'qrcode.react';
import React from 'react';
import './QrCodeDialog.css';

/**
 * QrCodeDialogコンポーネント
 * @param props 引数
 */
const QrCodeDialog = (props) => {
      // 引数から値を取得する。
      const { 
            tag,
            open, 
            did,
            handleClose, 
      } = props;

      return (
      <>
            <div className="overlay" onClick={handleClose}>
         
               
            </div>
                          <div className='walletdetail' >
                          <div>
                                {tag}
                          </div>
                          <div>
                          
                                <QRCode value={did} />
                           </div>
                           <button onClick={handleClose} className="buton-outline">Close</button> 
                    </div>  
      </>
      );
};

export default QrCodeDialog;