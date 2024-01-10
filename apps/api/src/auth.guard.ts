import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your authentication logic here
    // For example, you can check if the user is authenticated and has the necessary permissions
    const request = context.switchToWs().getClient().handshake;
    const isAuthenticated = request.headers['authorization'] === 'Bearer YOUR_AUTH_TOKEN';
    console.log("Token", request.headers['authorization']);


    if (!isAuthenticated) {
      throw new Error('Unauthorized');
    }

    return true;
  }
}
