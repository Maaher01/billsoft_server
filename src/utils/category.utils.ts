import { client } from "../config/db";
import { Category } from "../models/category";

export const getCategoryById = async (id: string): Promise<Category> => {
	const { rows } = await client.query("SELECT * FROM categories WHERE id=$1;", [
		id,
	]);
	return rows[0];
};

export const getAllCategories = async (): Promise<Category[]> => {
	const { rows } = await client.query(`
		SELECT c1.id, c1.categoryname, c1.status, c1.parentcategory, c2.categoryname as parentcategoryname
		FROM categories c1
		LEFT JOIN categories c2 ON c1.parentCategory = c2.id
		ORDER BY c1.id DESC`);
	return rows;
};

export const getAllParentCategories = async (): Promise<Category[]> => {
	const { rows } = await client.query(
		"SELECT id, categoryName, status FROM categories WHERE parentCategory IS NULL"
	);
	return rows;
};

export const getSubCategories = async (
	parentCategory: string
): Promise<Category[]> => {
	const { rows } = await client.query(
		"SELECT id, categoryName, status FROM categories WHERE parentCategory=$1;",
		[parentCategory]
	);
	return rows;
};

export const createCategory = async (
	categoryName: string,
	parentCategory: number,
	status: number
): Promise<Category> => {
	const { rows } = await client.query(
		"INSERT INTO categories (categoryName, parentCategory, status) VALUES ($1, $2, $3) RETURNING *;",
		[categoryName, parentCategory, status]
	);
	return rows[0];
};

export const editCategory = async (
	categoryName: string,
	parentCategory: number,
	status: number,
	id: string
): Promise<Category> => {
	const { rows } = await client.query(
		"UPDATE categories SET categoryName=$1, parentCategory=$2, status=$3 WHERE id=$4 RETURNING *;",
		[categoryName, parentCategory, status, id]
	);

	return rows[0];
};

export const deleteCategory = async (id: string): Promise<Category> => {
	const { rows } = await client.query(
		"DELETE FROM categories WHERE id=$1 RETURNING id;",
		[id]
	);
	return rows[0];
};
