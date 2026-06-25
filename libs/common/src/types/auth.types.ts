export type SignUpResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
