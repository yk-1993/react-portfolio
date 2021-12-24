export type User = {
  uid: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone?: string | null;
  birthDate: string | null;
  address: {
    postalcode: string | null;
    prefecture: string | null;
    address1: string | null;
    address2: string | null;
    address3?: string | null;
  };
};
