export interface IUserDataDTO {
  id?: string;
  name: string;
  avatar: string;
  email: string;
  currency: string;
  payMethods: string[];
  signId?: string;
  sessionActive?: boolean;
}

export interface IUserFindDTO {
  name?: string;
  email?: string;
}

export interface IUserFindUniqueDTO {
  id?: string;
  signId?: string;
  email?: string;
}
