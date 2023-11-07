
import React, { useEffect, useState } from "react";
import './../../../assets/css/App.css';
import { useMyContext } from './../../../Contexts';
import {
    getDid,
    getVcs
} from './../../hooks/UseContract';
import VcTable from "./VcTable";
import Header from './../../common/header'
import {
    PINTAGatewayURL
} from './../../common/Constant';



const MyVC = (props) => {
    // create contract
    const {
        currentAccount
    } = useMyContext();

    const [vcs, setVcs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * init function
     */
    const init = async()=> {
        // get did
        var did = await getDid(currentAccount);
        var result = await getVcs(did);
        setVcs(result);
    };

    /**
     * downloadAction function
     * @param cid VC's CID
     * @param name Vc's file name
     */
    const downloadAction = (cid, name) => {
        // get file
       
        // superAgent.get(`${PINTAGatewayURL}/${cid}`, {
        //     responseType: 'blob',
        // })
        // .then((res) => {
        //     fileDownload(res.data, name)
        // });
        
    };

    /**
     * ページングするための関数
     * @param e イベント内容
     * @param newPage 新しいページ
     */
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
        
    /**
     * 1ページに表示する取引履歴の上限を引き上げる関数
     * @param e イベント内容
     */
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };


    useEffect(() => {
        init();
    },[]);

    return (
        <div className="parent-div">
            <Header/>
            <div className='buy-centerdiv'>
       
                <p><strong>My Verifiable Credentials</strong></p>
                   
           
                <div style={{ maxHeight: 600 }}>
                    {vcs.length > 0 ?
                        (<ul>
                            { vcs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    return (
                                        <li>
                                            <div>{i+1}</div>
                                            <div>{row.name}</div>
                                            <div>     
                                                <a href={`${PINTAGatewayURL}/${row.cid}`}>
                                                download
                                                </a>
                                            </div>
                                        </li>
                                   );
                            })}
                        </ul>)
                        :
                        <h3>No VCS Uploaded</h3>
                      }
                </div>

            </div>
        </div>
    );
};

export default MyVC;