export type RegistrationRes = {
  message: string;
  activationToken: string;
};

export type RegistrationReq = {
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
};