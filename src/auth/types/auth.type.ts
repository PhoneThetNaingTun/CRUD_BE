import { Role } from "@prisma/client";

export interface UserPayload {
  id: string;
  email: string;
}

export interface AccessTokenPayload {
  id: string;
  role: Role;
}
