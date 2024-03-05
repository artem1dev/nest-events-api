import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { EventsController } from "./controllers/events.controller";
import { Attendee } from "./entities/attendee.entity";
import { EventsService } from "./services/event.service";
import { AttendeesService } from "./services/attendees.service";
import { EventAttendeesController } from "./controllers/event-attendees.controller";
import { EventsOrganizedByUserController } from "./controllers/events-organized-by-user.controller";
import { CurrentUserEventAttendanceController } from "./controllers/current-user-event-attendance.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Event, Attendee])],
    controllers: [
        EventsController,
        EventAttendeesController,
        EventsOrganizedByUserController,
        CurrentUserEventAttendanceController,
    ],
    providers: [EventsService, AttendeesService],
})
export class EventsModule {}
