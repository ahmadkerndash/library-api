import { CanActivate,ExecutionContext,Injectable,ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.emum";
import { ROLES_KEY } from "./roles.decorator";
import { Observable } from "rxjs";
@Injectable()
export class RolesGaurd implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()]);//قراءة الادوار المطلوبه
        if(!requiredRoles){
            return true;
        }
        const request=context.switchToHttp().getRequest();//كاىن الطلب 
        const user =request.users;//يحتوي معلومات المستحدم
        if(!user || !requiredRoles.includes(user.role)){
            throw new ForbiddenException('you do not have permission');
        }
        return true;
    }}
