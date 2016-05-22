import { Mongo } from 'meteor/mongo';

export const Businesses = new Mongo.Collection('businesses');

export const Schemas = {};

Schemas.Address = new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat        : {
    type   : Number,
    decimal: true
  },
  lng        : {
    type   : Number,
    decimal: true
  },
  geometry   : {
    type    : Object,
    blackbox: true
  },
  placeId    : {
    type: String
  },
  street     : {
    type: String,
    max : 100
  },
  city       : {
    type: String,
    max : 50
  },
  state      : {
    type : String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip        : {
    type : String,
    regEx: /^[0-9]{5}$/
  },
  country    : {
    type: String
  }
});

Schemas.Business = new SimpleSchema({
  userId        : {
    type    : String,
    autoform: {
      omit: true,
      type: 'hidden'
    }
  },
  businessName  : {
    type    : String,
    autoform: {
      label: 'Business Name'
    }
  },
  location      : {
    type    : Schemas.Address,
    autoform: {
      label      : false,
      placeholder: 'Business Address'
    }
  },
  businessPhone : {
    type    : String,
    autoform: {
      label: 'Business Phone'
    }
  },
  dateRegistered: {
    type    : Date,
    autoform: {
      omit: true,
      type: 'hidden'
    }
  }
});

Businesses.attachSchema(Schemas.Business);