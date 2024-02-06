import React, {useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom'; 
import loadergif from '../../../images/loader.gif'

const Loader = () =>{
    return(
        <>
        <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
			<img className='align-items-center' src={loadergif} alt="loader" />
			</div>    
        </>
    )
}
export default Loader;