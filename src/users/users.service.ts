
import {
  Injectable,
  ConflictException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.interface';
import { UserResponse } from './user-response.interface';
import { CreateUserDto } from './Dto/creat-user.dto';
import { UpdateUserRoleDto } from './Dto/update-user-role.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  async onModuleInit(): Promise<void> {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error(
        'ADMIN_PASSWORD must be configured before starting the application',
      );
    }

    const existingAdmin = this.users.find(
      (user) => user.username === adminUsername,
    );

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      this.users.push({
        id: 1,
        username: adminUsername,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      });
    }
  }

  private toUserResponse(user: User): UserResponse {
    const { password, ...userResponse } = user;
    return userResponse;
  }

  findAll(): UserResponse[] {
    return this.users.map((user) => this.toUserResponse(user));
  }

  findOne(id: number): UserResponse {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toUserResponse(user);
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(
      (user) => user.username === username.trim(),
    );
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
  const username = createUserDto.username.trim();

 
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  
  const existingUser = this.users.find((user) => user.username === username);

  if (existingUser) {
    throw new ConflictException('Username already exists');
  }

  const nextId =
    this.users.length > 0
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 1;

  const user: User = {
    id: nextId,
    username,
    password: hashedPassword,
    role: 'member',
    isActive: true,
  };

  this.users.push(user);

  return this.toUserResponse(user);
}

  deactivateUser(id: number): UserResponse {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;
    return this.toUserResponse(user);
  }

  activateUser(id: number): UserResponse {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = true;
    return this.toUserResponse(user);
  }

  updateUserRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
  ): UserResponse {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = updateUserRoleDto.role;
    return this.toUserResponse(user);
  }
}
