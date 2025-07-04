export interface Store {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  manager: {
    email: string;
    fullname: string;
  };
}

