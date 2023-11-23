export interface GeneralResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  token?: string;
}

export interface AuthUserI {
  id: number;
  email: string;
  pricingId: number;
}

export interface UserCredentialsI {
  email: string;
  password: string;
}

export interface ProductI {
  id:          number;
  name:        string;
  price:       number;
  description: string;
  urlImage:    string;
  stock:       number;
  status:      boolean;
  quantity:   number;
}
