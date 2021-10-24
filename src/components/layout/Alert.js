import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext';


const Alert = () => {
  const aCtx = useContext(AlertContext);
  const { alert } = aCtx;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    )
  )
}

export default Alert
