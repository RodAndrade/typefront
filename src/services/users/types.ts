export type UsersResponse = UserType[];

export type UserType = {
  id: number;
  name: string;
  email: string;
  status: 'PENDING' | 'ACCEPTED' | 'DENIED';
  isSupport: boolean;
  updatedAt: string;
  createdAt: string;
};
