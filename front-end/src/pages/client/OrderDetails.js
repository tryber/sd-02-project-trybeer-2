import React from 'react';

const OrderDetails = ({ match: { params: id } }) => {
  console.log(id);
  return (
    <div>
      Order Details
    </div>
  );
};

export default OrderDetails;
