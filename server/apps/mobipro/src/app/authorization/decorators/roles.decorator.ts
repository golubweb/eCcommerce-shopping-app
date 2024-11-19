import { SetMetadata } from "@nestjs/common";
import { ERoles } from "../../../../../../shared/enums/role.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERoles[]) => SetMetadata(ROLES_KEY, roles);