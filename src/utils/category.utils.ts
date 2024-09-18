import { client } from "../config/db";
import { Category } from "../models/category";

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
