import React from 'react'
import '../App.css'

function Tables({list,colname}){
    return <div >
        {list.length > 0 && (
        <table style={{padding:'10px 25px'}}>
            <thead className="tableseparate">
                <tr >
                    {colname.map((headerItem, index) => (
                        <th key={index}>
                            {headerItem.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.values(list).map((obj,index)=> (
                <tr key={index}>
                    {Object.values(obj).map((value,index2)=>(
                    <td key={index2}>{value}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        )}
    </div>
}

export default Tables
// /cellSpacing ="100px" style={{width:width,height:height,padding:'10px 5px'} }