export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    { 
      name: 'userId',
      title: 'UserID',
      type: 'string',
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    { 
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    { 
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'string',
      options: {
        source: 'email',
        maxLength: 90,
      }
    },
    { 
      name: 'product',
      title: 'Product',
      type: "reference",
      to: [{type: 'product'}],
    },
  ]
}