import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { AppJapanService } from "./app.japan.service";
import { AppDummy } from "./app.dummy";
import { ConfigModule } from "@nestjs/config";
import ormConfig from "./config/orm.config";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.env.NODE_ENV}.env`,
            load: [ormConfig],
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: ormConfig,
        }),
        AuthModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: AppService,
            useClass: AppJapanService,
        },
        {
            provide: "APP_NAME",
            useValue: "NEST EVENTS BACKEND!",
        },
        {
            provide: "MESSAGE",
            inject: [AppDummy],
            useFactory: (app) => `${app.dummy()} Factory!`,
        },
        AppDummy,
    ],
})
export class AppModule {}
