
import {
  Controller,
  Post,
  ParseIntPipe,
  Param,
  Get,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

import { BorrowingService } from './borrowing.service';
import { Borrowing } from './borrowing.inerface';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

interface AuthenticatedUser {
  id: number;
  username: string;
  role: Role;
}

@Controller('borrowings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post('books/:bookId')
  @Roles(Role.MEMBER, Role.ADMIN)
  borrowBook(
    @CurrentUser() user: AuthenticatedUser,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.borrowingService.borrowBook(user.id, bookId);
  }

  @Post('books/:bookId/return')
  @Roles(Role.MEMBER, Role.ADMIN)
  returnBook(
    @CurrentUser() user: AuthenticatedUser,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.borrowingService.returnBook(user.id, bookId);
  }

  @Get('my')
  @Roles(Role.MEMBER, Role.ADMIN)
  findMyBorrowings(@CurrentUser() user: AuthenticatedUser): Borrowing[] {
    return this.borrowingService.fiindByUser(user.id);
  }

  @Get()
  @Roles(Role.LIBRARIAN, Role.ADMIN)
  findAll(): Borrowing[] {
    return this.borrowingService.findAll();
  }
}
