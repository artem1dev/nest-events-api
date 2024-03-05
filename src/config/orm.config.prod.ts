import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from "@nestjs/config";
import { Event } from "src/events/entities/event.entity";
import { Attendee } from "src/events/entities/attendee.entity";
import { Subject } from "src/school/subject.entity";
import { Teacher } from "src/school/teacher.entity";
import { User } from "src/auth/entities/user.entity";
import { Profile } from "src/auth/entities/profile.entity";

export default registerAs(
    "orm.config",
    (): TypeOrmModuleOptions => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event, Attendee, Subject, Teacher, User, Profile],
        synchronize: false,
    }),
);
