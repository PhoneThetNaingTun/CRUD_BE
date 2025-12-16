import { JwtPayload as JwtPayloadType } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadType;
    }
  }
}
