export type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate: string;
  address: {
    postalcode: string;
    prefecture: string;
    address1: string;
    address2?: string;
  };
};
