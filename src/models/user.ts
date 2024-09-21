export interface User {
	fullname: string;
	role: string;
	password: string;
}

export interface UserResponse extends User {
	id: number;
}
