import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from "./users.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: "60m"
                }
            })
        })
    ],
    providers: [LocalStrategy, JwtStrategy, LocalStrategy],
    controllers: [AuthController, UsersController]

})
export class AuthModule{

}