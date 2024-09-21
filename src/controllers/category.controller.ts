import { Request, Response } from "express";
import { Category } from "../models/category";
import {
	getCategoryById,
	getAllParentCategories,
	getSubCategories,
	createCategory,
	deleteCategory,
	editCategory,
} from "../utils/category.utils";

export const displayParentCategories = async (req: Request, res: Response) => {
	try {
		const parentCategories = (await getAllParentCategories()) as Category[];
		if (!parentCategories) {
			return res.status(404).json({
				status: "Failed",
				message: "No parent categories found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: parentCategories,
		});
	} catch {
		return res.status(500).json({
			status: "Failed",
			error: "unexpected error occured",
		});
	}
};

export const displaySubCategories = async (req: Request, res: Response) => {
	const { parentCategory } = req.params;

	try {
		const subCategories = (await getSubCategories(
			parentCategory
		)) as Category[];

		if (subCategories.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "Sub categories not found",
			});
		}

		return res.status(200).json({
			status: "Success",
			data: subCategories,
		});
	} catch {
		return res.status(500).json({
			status: "Failed",
			error: "unexpected error occured",
		});
	}
};

export const categoryEdit = async (req: Request, res: Response) => {
	const { categoryName, parentCategory } = req.body;
	const { id } = req.params;

	try {
		const response = (await editCategory(
			categoryName,
			parentCategory,
			id
		)) as Category;
		if (!response) {
			return res.status(404).json({
				status: "Failed",
				error: "Category not found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: { ...response },
		});
	} catch (error: any) {
		res.status(500).json({
			status: "Failed",
			error: error.message,
		});
	}
};

export const addCategory = async (req: Request, res: Response) => {
	const { categoryName, parentCategory } = req.body;

	try {
		const category = (await createCategory(
			categoryName,
			parentCategory
		)) as Category;

		return res.status(200).json({
			status: "Success",
			data: category,
		});
	} catch (error: any) {
		res.status(500).json({
			status: "Failed",
			error: error.message,
		});
	}
};

export const categoryDelete = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		(await getCategoryById(id)) as Category;
		const response = (await deleteCategory(id)) as Category;
		if (!response) {
			return res.status(404).json({
				status: "Failed",
				error: "Category does not exist",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: { id: response.id },
		});
	} catch (error: any) {
		res.status(500).json({
			status: "Failed",
			error: error.message,
		});
	}
};
