export interface User {
  name: string;
  password: string;
}

export interface UserResponse extends User {
  id: number;
}
