import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersController } from "./controllers/users.controller";
import { AuthService } from "./auth.service";
import JWT_CONFIG from "../config/jwt.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: JWT_CONFIG,
        }),
    ],
    controllers: [AuthController, UsersController],
    providers: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
