export type SignInResponseType = {
  token: string;
};

export type SignUpResponseType = {
  id: number;
  name: string;
  email: string;
};

export type SignUpBodyType = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
