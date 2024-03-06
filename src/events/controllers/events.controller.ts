import { CreateEventDto } from "../dto/input/create-event.dto";
import { UpdateEventDto } from "../dto/input/update-event.dto";
import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    HttpCode,
    Param,
    Body,
    ParseIntPipe,
    Logger,
    NotFoundException,
    Query,
    UsePipes,
    ValidationPipe,
    UseGuards,
    ForbiddenException,
    SerializeOptions,
    UseInterceptors,
    ClassSerializerInterceptor,
} from "@nestjs/common";
import { EventsService } from "../services/event.service";
import { ListEvents } from "../dto/input/list.events";
import { CurrentUser } from "./../../auth/current-user.decorator";
import { User } from "./../../auth/entities/user.entity";
import { AuthGuardJwt } from "./../../auth/guards/auth-guard.jwt";

@Controller("events")
@SerializeOptions({ strategy: "excludeAll" })
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(private readonly eventsService: EventsService) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() filter: ListEvents) {
        const events = await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(filter, {
            total: true,
            currentPage: filter.page,
            limit: filter.limit,
        });
        this.logger.debug(`Found ${events} events`);
        return events;
    }

    // @Get("/practice")
    // async practice() {
    //     return await this.repository.find({
    //         where: { id: 3 },
    //     });
    // }

    // @Get("/practice2")
    // async practice2() {
    //     //     return await this.repository.findOne({
    //     //         where: { id: 1 },
    //     //         relations: ['attendees'] });
    //     // }
    //     //     const event = await this.repository.findOne({where: { id: 1 }});
    //     //     const attendee = new Attendee();
    //     //     attendee.name = "Jerry";
    //     //     attendee.event = event;
    //     //     await this.attendeeRepository.save(attendee);
    //     //     return event;
    //     // }
    // //     const event = await this.repository.findOne({ where: { id: 1 } });
    // //     const attendee = new Attendee();
    // //     attendee.name = "Jerry";
    // //     event.attendees.push(attendee);
    // //     await this.repository.save(event);
    // //     return event;
    // // }

    //     return await this.repository.createQueryBuilder("e")
    //     .select(["e.id", "e.name"])
    //     .orderBy("e.id", "ASC")
    //     .take(3)
    //     .getMany();
    // }

    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param("id", ParseIntPipe) id) {
        const event = await this.eventsService.getEventWithAttendeeCount(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() input: CreateEventDto, @CurrentUser() user: User) {
        return await this.eventsService.createEvent(input, user);
    }

    @Patch(":id")
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Param("id", ParseIntPipe) id, @Body() input: UpdateEventDto, @CurrentUser() user: User) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }

        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to change this event`);
        }

        return await this.eventsService.updateEvent(event, input);
    }

    @Delete(":id")
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(@Param("id", ParseIntPipe) id, @CurrentUser() user: User) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to remove this event`);
        }
        await this.eventsService.deleteEvent(id);
    }
}
