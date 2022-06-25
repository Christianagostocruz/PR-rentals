export default {
    name: 'payments',
    title: 'Payments',
    type: 'document',
    
    fields: [
      { 
        name: 'paymentId',
        title: 'PaymentId',
        type: 'string',
      },
      { 
        name: 'orders',
        title: 'Orders',
        type: "reference",
        to: [{type: 'orders'}],
        to: [{type: 'user'}],
      },
    ]
  }