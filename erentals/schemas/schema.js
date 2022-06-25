import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner';
import user from './user';
import owners from './owners';
import orders from './orders';
import payments from './payments';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ product, banner, user, owners, orders, payments ]),
})
  