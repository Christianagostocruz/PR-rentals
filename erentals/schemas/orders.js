export default {
  name: 'orders',
  title: 'Orders',
  type: 'document',
  
  fields: [
    { 
      name: 'orderId',
      title: 'OrderId',
      type: 'string',
    },
    { 
      name: 'user',
      title: 'User',
      type: "reference",
      to: [{type: 'user'}],
    },
  ]
}