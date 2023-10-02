export interface UserReq {
  userName: string;
  id: number;
}


export interface RolesReq {
  roles: string[];
}
declare module "express-serve-static-core" {
  interface Request {
    user?: UserReq;
    roles?: RolesReq;
  }
}
