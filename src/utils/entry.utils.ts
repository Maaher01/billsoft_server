import { client } from "../config/db";
import { Entry } from "../models/entry";

export const createEntry = async (
	year: string,
	month: string,
	amount: number,
	categoryid: number
): Promise<Entry> => {
	const { rows } = await client.query(
		"INSERT INTO entries (year, month, amount, categoryid) VALUES ($1, $2, $3, $4) RETURNING *;",
		[year, month, amount, categoryid]
	);
	return rows[0];
};

export const editEntry = async (id: string, amount: number): Promise<Entry> => {
	const { rows } = await client.query(
		"UPDATE entries SET amount=$1 WHERE id=$2 RETURNING *;",
		[amount, id]
	);
	return rows[0];
};
