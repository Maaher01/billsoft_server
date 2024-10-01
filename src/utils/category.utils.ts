import { client } from "../config/db";
import { Category } from "../models/category";

export const getCategoryById = async (id: string): Promise<Category> => {
  const { rows } = await client.query("SELECT * FROM categories WHERE id=$1;", [
    id,
  ]);
  return rows[0];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const { rows } = await client.query("SELECT * FROM categories;");
  return rows;
};

export const getAllParentCategories = async (): Promise<Category[]> => {
  const { rows } = await client.query(
    "SELECT id, categoryName FROM categories WHERE parentCategory IS NULL"
  );
  return rows;
};

export const getSubCategories = async (
  parentCategory: string
): Promise<Category[]> => {
  const { rows } = await client.query(
    "SELECT id, categoryName FROM categories WHERE parentCategory=$1;",
    [parentCategory]
  );
  return rows;
};

export const createCategory = async (
  categoryName: string,
  parentCategory: number
): Promise<Category> => {
  const { rows } = await client.query(
    "INSERT INTO categories (categoryName, parentCategory) VALUES ($1, $2) RETURNING *;",
    [categoryName, parentCategory]
  );
  return rows[0];
};

export const editCategory = async (
  categoryName: string,
  parentCategory: string,
  categoryId: string
): Promise<Category> => {
  const { rows } = await client.query(
    "UPDATE categories SET categoryName=$1, parentCategory=$2 WHERE id=$3 RETURNING *;",
    [categoryName, parentCategory, categoryId]
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
