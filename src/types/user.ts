export type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  birthDate: string;
  address: {
    postalcode: number;
    prefecture: string;
    address1: string;
    address2?: string;
  };
};
