import { Mongo } from 'meteor/mongo';

export const Businesses = new Mongo.Collection('businesses');

businesses = [
  {
    businessId            : 0,
    businessName          : "Coffee Cup",
    businessAddressStreet1: "123 1st Ave S",
    businessAddressStreet2: "Suite 2",
    businessAddressCity   : "Seattle",
    businessAddressState  : "WA",
    businessAddressZip    : "98111",
    businessPhone         : "(206) 123-4567",
    businessLogo          : "business1.jpg"
  },
  {
    businessId            : 1,
    businessName          : "Expresso",
    businessAddressStreet1: "456 2nd Ave N",
    businessAddressStreet2: "",
    businessAddressCity   : "Renton",
    businessAddressState  : "WA",
    businessAddressZip    : "98055",
    businessPhone         : "(425) 345-6789",
    businessLogo          : "business2.jpg"
  },
  {
    businessId            : 2,
    businessName          : "Java Jolt",
    businessAddressStreet1: "789 3rd Ave SW",
    businessAddressStreet2: "#12",
    businessAddressCity   : "Federal Way",
    businessAddressState  : "WA",
    businessAddressZip    : "98132",
    businessPhone         : "(253) 678-9012",
    businessLogo          : "business3.jpg"
  }
];