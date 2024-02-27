import React, { useState, useEffect } from 'react';
import AtomicSpinner from 'atomic-spinner';
import '../Css/LoadingPage.css'
const LoadingPage = () => {


  return (
    <div className='container-fluid text-center atom'>
  
      <div className="atomdiv">
      <AtomicSpinner electronColorPalette={ [ '#0081C9', '#5BC0F8', '#86E5FF' ]} displayElectronPaths={false} atomSize={350}  />
  
     </div>
    </div>
  );
};

export default LoadingPage;
