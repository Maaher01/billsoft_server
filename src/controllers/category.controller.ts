import { Request, Response } from "express";
import { Category } from "../models/category";
import { createCategory } from "../utils/category.utils";

export const addCategory = async (req: Request, res: Response) => {
  const { categoryName, parentCategory } = req.body;

  try {
    const category = (await createCategory(
      categoryName,
      parentCategory
    )) as Category;
    return res.status(200).json({
      status: "Success",
      data: { ...category },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};
