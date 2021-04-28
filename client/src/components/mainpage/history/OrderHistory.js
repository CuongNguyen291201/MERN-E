import React, { useContext } from 'react';

import { GlobalState } from '../../../GlobalState';

const OrderHistory = () => {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history

  console.log(history)

  return (
    <div>
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>
    </div>
  )
}

export default OrderHistory
