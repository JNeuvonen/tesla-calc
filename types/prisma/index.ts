export type UserType = {
  ID: number;
  type: string;
  UUID: string;
  email: string;
  password: string;
  address: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type Address = {
  address: string;
  lat: any;
  lng: any;
};
