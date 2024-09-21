import bcrypt from "bcrypt";

export function hashPassword(password: string) {
	return bcrypt.hash(password, 9);
}

export function comparePassword(password: string, hashedPassword: string) {
	return bcrypt.compare(password, hashedPassword);
}
