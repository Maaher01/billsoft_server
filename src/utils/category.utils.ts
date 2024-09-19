import { client } from "../config/db";
import { Category } from "../models/category";

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const { rows } = await client.query("SELECT * FROM categories WHERE id=$1;", [
    id,
  ]);
  if (rows) {
    return rows[0];
  }
  return null;
};

export const getAllParentCategories = async (): Promise<Category | null> => {
  const { rows } = await client.query(
    "SELECT id, categoryName FROM categories WHERE parentCategory IS NULL"
  );
  if (rows) {
    return rows;
  }
  return null;
};

export const getSubCategories = async (
  parentCategory: number
): Promise<Category | null> => {
  const { rows } = await client.query(
    "SELECT id, categoryName FROM categories WHERE parentCategory=$1;",
    [parentCategory]
  );
  if (rows) {
    return rows;
  }
  return null;
};

export const createCategory = async (
  categoryName: string,
  parentCategory: number
): Promise<Category | null> => {
  const { rows } = await client.query(
    "INSERT INTO categories (categoryName, parentCategory) VALUES ($1, $2);",
    [categoryName, parentCategory]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

export const editCategory = async (
  categoryName: string,
  parentCategory: string,
  categoryId: string
): Promise<Category | null> => {
  const { rows } = await client.query(
    "UPDATE categories SET categoryName=$1, parentCategory=$2 WHERE categoryId=$3 returning *;",
    [categoryName, parentCategory, categoryId]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};

export const deleteCategory = async (id: string): Promise<Category | null> => {
  const { rows } = await client.query(
    "DELETE FROM categories WHERE id=$1 returning id;",
    [id]
  );
  if (rows) {
    return rows[0];
  }
  return null;
};
