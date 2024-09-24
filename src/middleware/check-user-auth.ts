import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
	userData?: {
		fullname: string;
		userId: string;
	};
}

interface DecodedToken extends JwtPayload {
	UserInfo: {
		fullname: string;
		userId: string;
	};
}

module.exports = (req: CustomRequest, res: Response, next: NextFunction) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		return res.status(401).json({
			message: "Sorry! You are not authorized",
		});
	}

	const token = authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "Token not found in authorization header",
		});
	}

	try {
		const decodedToken = jwt.verify(
			token,
			process.env.TOKEN_SECRET as string
		) as DecodedToken;

		if (!decodedToken) {
			return res.status(401).json({
				message: "Authorization error",
			});
		}

		req.userData = {
			fullname: decodedToken.UserInfo.fullname,
			userId: decodedToken.UserInfo.userId,
		};

		next();
	} catch (err) {
		return res.status(500).json({
			message: "Authorization error",
			error: err,
		});
	}
};
