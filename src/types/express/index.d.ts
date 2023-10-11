export interface UserReq {
  userName: string;
  id: number;
}

export interface RolesReq {
  roles: number[];
}
declare module "express-serve-static-core" {
  interface Request {
    user?: UserReq;
    roles?: number[];
  }
}
