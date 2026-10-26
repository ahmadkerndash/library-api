import { IsIn } from "class-validator";//IsIn تتحقق ان قيمه واحدة من القيم المحدده في المصفوفه

export class UpdateUserRoleDto {
  @IsIn(['member', 'librarian', 'admin'])
  role:'member' | 'librarian' | 'admin';
}