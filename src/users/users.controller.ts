
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/creat-user.dto';
import { UpdateUserRoleDto } from './Dto/update-user-role.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('register')
register(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}

  
  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deactivateUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivateUser(id);
  }

  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  activateUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.activateUser(id);
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateUserRole(id, updateUserRoleDto);
  }
}
