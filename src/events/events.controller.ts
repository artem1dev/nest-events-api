import { CreateEventDto } from "./input/create-event.dto";
import { UpdateEventDto } from "./input/update-event.dto";
import { Event } from "./event.entity";
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
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendee } from "./attendee.entity";
import { EventsService } from "./event.service";
import { ListEvents } from "./input/list.events";

@Controller("/events")
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>,
        private readonly eventsService: EventsService
    ) {}

    @Get()
    @UsePipes(new ValidationPipe( { transform: true } ))
    async findAll(@Query() filter: ListEvents) {
        this.logger.debug(`Hit the findAll route`);
        const events = await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(filter, {
            total: true,
            currentPage: filter.page,
            limit: 10
        });
        this.logger.debug(`Found ${events} events`);
        return events;
    }

    @Get("/practice")
    async practice() {
        return await this.repository.find({
            where: { id: 3 },
        });
    }

    @Get("/practice2")
    async practice2() {
        //     return await this.repository.findOne({
        //         where: { id: 1 },
        //         relations: ['attendees'] });
        // }
        //     const event = await this.repository.findOne({where: { id: 1 }});
        //     const attendee = new Attendee();
        //     attendee.name = "Jerry";
        //     attendee.event = event;
        //     await this.attendeeRepository.save(attendee);
        //     return event;
        // }
    //     const event = await this.repository.findOne({ where: { id: 1 } });
    //     const attendee = new Attendee();
    //     attendee.name = "Jerry";
    //     event.attendees.push(attendee);
    //     await this.repository.save(event);
    //     return event;
    // }

        return await this.repository.createQueryBuilder("e")
        .select(["e.id", "e.name"])
        .orderBy("e.id", "ASC")
        .take(3)
        .getMany();
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }

    @Patch(":id")
    async update(@Param("id", ParseIntPipe) id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);
        if (!event) {
            throw new NotFoundException();
        }
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when,
        });
    }

    @Delete(":id")
    @HttpCode(204)
    async remove(@Param("id", ParseIntPipe) id) {
        const result = await this.eventsService.deleteEvent(id);
        if (result?.affected !== 1) {
            throw new NotFoundException();
        }
    }
}
