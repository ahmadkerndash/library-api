
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.interface';
import { CreateUserDto } from './Dto/creat-user.dto';
import { UpdateUserRoleDto } from './Dto/update-user-role.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const username = createUserDto.username.trim();

    const existingUser = this.users.find(
      (user) => user.username === username,
    );

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user: User = {
      id:
        this.users.length > 0
          ? Math.max(...this.users.map((user) => user.id)) + 1
          : 1,
      username,
      role: 'member',
      isActive: true,
    };

    this.users.push(user);

    return user;
  }

  deactivateUser(id: number): User {
    const user = this.findOne(id);
    user.isActive = false;
    return user;
  }

  activateUser(id: number): User {
    const user = this.findOne(id);
    user.isActive = true;
    return user;
  }

  updateUserRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): User {
    const user = this.findOne(id);
    user.role = updateUserRoleDto.role;
    return user;
  }
}
