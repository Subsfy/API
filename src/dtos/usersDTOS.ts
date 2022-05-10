export interface IUserDataDTO {
  id?: string;
  name: string;
  avatar: string;
  email: string;
  currency: string;
  payMethods: string[];
}

export interface IUserFindDTO {
  name?: string;
  email?: string;
}
