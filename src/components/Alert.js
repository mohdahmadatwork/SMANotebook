import React ,{useContext} from 'react'
import contextValue from '../context/alert/AlertContext';

export default function Alert(props) {
  const context = useContext(contextValue)
  const {alert} = context;
  return (
    alert && <div>
         <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{alert.type.charAt(0).toUpperCase()+alert.type.slice(1)}</strong> {alert.msg}
        </div>
    </div>
  )
}
