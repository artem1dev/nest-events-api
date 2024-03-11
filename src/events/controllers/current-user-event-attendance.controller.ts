import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    DefaultValuePipe,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Put,
    Query,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { EventsService } from "../services/event.service";
import { AttendeesService } from "../services/attendees.service";
import { AuthGuardJwt } from "./../../auth/guards/auth-guard.jwt";
import { CurrentUser } from "./../../auth/current-user.decorator";
import { User } from "./../../auth/entities/user.entity";
import { CreateAttendeeDto } from "../dto/create-attendee.dto";
import { LIMIT } from "src/config/constants";

@Controller("events-attendance")
@SerializeOptions({ strategy: "excludeAll" })
@UseGuards(AuthGuardJwt)
@UseInterceptors(ClassSerializerInterceptor)
export class CurrentUserEventAttendanceController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly attendeesService: AttendeesService,
    ) {}

    @Get()
    async findAll(@CurrentUser() user: User, @Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1) {
        return await this.eventsService.getEventsOrganizedByUserIdPaginated(user.id, {
            currentPage: page,
            limit: LIMIT,
        });
    }

    @Get(":eventId")
    async findOne(@Param("eventId", ParseIntPipe) eventId: number, @CurrentUser() user: User) {
        const attendee = await this.attendeesService.findByEventIdAndUserId(eventId, user.id);
        if (!attendee) {
            throw new NotFoundException();
        }
        return attendee;
    }

    @Put(":eventId")
    async createOrUpdate(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Body() input: CreateAttendeeDto,
        @CurrentUser() user: User,
    ) {
        return this.attendeesService.createOrUpdate(input, eventId, user.id);
    }
}
