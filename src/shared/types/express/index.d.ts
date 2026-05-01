import { JwtPayload } from "../../auth/types/auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      request_id?: string;
    }
  }
}
