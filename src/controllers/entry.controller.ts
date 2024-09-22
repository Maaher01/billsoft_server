import { Request, Response } from "express";
import { Entry } from "../models/entry";
import { createEntry, editEntry } from "../utils/entry.utils";

export const entryEdit = async (req: Request, res: Response) => {
	const { amount } = req.body;
	const { id } = req.params;

	try {
		const response = (await editEntry(id, amount)) as Entry;

		if (!response) {
			return res.status(404).json({
				status: "Failed",
				message: "Entry not found",
			});
		}

		return res.status(200).json({
			status: "Success",
			data: { ...response },
		});
	} catch (error: any) {
		res.status(500).json({
			status: "Failed",
			message: error.message,
		});
	}
};

export const addEntry = async (req: Request, res: Response) => {
	const { year, month, amount, categoryid } = req.body;

	try {
		const entry = (await createEntry(year, month, amount, categoryid)) as Entry;

		return res.status(200).json({
			status: "Success",
			data: entry,
		});
	} catch (error: any) {
		res.status(500).json({
			status: "Failed",
			error: error.message,
		});
	}
};
