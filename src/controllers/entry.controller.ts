import { Request, Response } from "express";
import { Entry } from "../models/entry";
import { createEntry } from "../utils/entry.utils";

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
