import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from "@nestjs/config";
import { Event } from "./../events/entities/event.entity";
import { Attendee } from "./../events/entities/attendee.entity";
import { User } from "./../auth/entities/user.entity";
import { Profile } from "./../auth/entities/profile.entity";

export default registerAs(
    "orm.config",
    (): TypeOrmModuleOptions => (process.env.NODE_ENV !== "production" ? 
    {
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event, Attendee, User, Profile],
        synchronize: true,
        dropSchema: true,
    }: {
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event, Attendee, User, Profile],
        synchronize: false,
        dropSchema: false,
    }),
);
