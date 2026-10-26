import { Body,Controller,Get,Post ,Param,ParseIntPipe,Patch,UseGuards} from "@nestjs/common";
import{ UsersService } from "./users.service";
import{ CreateUserDto } from "./Dto/creat-user.dto";
import { UpdateUserRoleDto } from "./Dto/update-user-role.dto";
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.emum';
import { RolesGaurd } from '../auth/roles.guard';

@Controller('users')
@UseGuards(RolesGaurd)
@Roles(Role.ADMIN)
export class UsersController{
    constructor(private readonly usersService: UsersService){}

@Get()
findAll(){
    return this.usersService.findAll();
}
@Post()
create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
}
@Get(':id')
findOne(@Param('id',ParseIntPipe) id:number){
    return this.usersService.findOne(id);   

}
@Patch(':id/deactivate')
deactivateUser(@Param('id',ParseIntPipe) id:number){
    return this.usersService.deactivateUser(id);
}
@Patch(':id/activate')
activateUser(@Param('id',ParseIntPipe) id:number){
    return this.usersService.activateUser(id);
}
@Patch(':id/role')
updateUserRole(@Param('id',ParseIntPipe) id:number, @Body() updateUserRoleDto: UpdateUserRoleDto){
    return this.usersService.updateUserRole(id, updateUserRoleDto);
}}