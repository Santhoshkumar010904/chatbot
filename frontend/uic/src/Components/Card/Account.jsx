import React from 'react'
import './Account.css';
import { getIntials } from '../../helper';

const Account = ({onLogout}) => {

  return (
    <div className='name'>
      <div className='round'>{getIntials("Chat Bot")}</div>
      <div >

<button className='logout-button' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Account