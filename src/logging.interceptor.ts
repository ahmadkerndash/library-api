
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();

    console.log(`Before: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() => {
        console.log(
          `After: ${request.method} ${request.url} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
