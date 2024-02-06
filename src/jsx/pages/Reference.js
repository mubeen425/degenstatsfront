import React from 'react'
import {useParams, useNavigate} from "react-router-dom"

function Reference() {

    let Navigate = useNavigate();

    const {ref_address} = useParams()

    if(ref_address){
        localStorage.setItem("ref_address", ref_address)
        Navigate("/")
    }else{
        Navigate("/")
    }

    console.log("======> ref_adress: ", ref_address)

  return (
    <>
    </>
  )
}

export default Reference