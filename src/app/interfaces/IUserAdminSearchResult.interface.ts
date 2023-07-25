import { IUserAdmin } from "./UserAdmin.iterface";

export interface IUserAdminSearchResult {
    users: IUserAdmin[];
    total: number;
  }