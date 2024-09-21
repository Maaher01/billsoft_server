import { client } from "../config/db";
import { UserResponse } from "../models/user";

export const getUser = async (fullname: string): Promise<UserResponse> => {
	const { rows } = await client.query("SELECT * FROM users WHERE fullname=$1", [
		fullname,
	]);
	return rows[0];
};

export const createUser = async (
	fullname: string,
	role: string,
	password: string
): Promise<UserResponse> => {
	const { rows } = await client.query(
		"INSERT INTO users (fullname, role, password) VALUES ($1, $2, $3) RETURNING *;",
		[fullname, role, password]
	);
	return rows[0];
};
