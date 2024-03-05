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
import { EventsService } from "./event.service";
import { AttendeesService } from "./attendees.service";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateAttendeeDto } from "./create-attendee.dto";

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
            limit: 6,
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
