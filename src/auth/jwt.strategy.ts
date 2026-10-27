
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from './roles.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: {
    sub: number;
    username: string;
    role: Role;
  }) {
    if (!payload?.sub || !payload?.username || !payload?.role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
