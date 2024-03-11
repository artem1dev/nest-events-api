import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    SerializeOptions,
    UseInterceptors,
} from "@nestjs/common";
import { AttendeesService } from "../services/attendees.service";

@Controller("events/:eventId/attendees")
@SerializeOptions({ strategy: "excludeAll" })
@UseInterceptors(ClassSerializerInterceptor)
export class EventAttendeesController {
    constructor(private readonly attendeesService: AttendeesService) {}

    @Get()
    async findAll(@Param("eventId", ParseIntPipe) eventId: number) {
        return await this.attendeesService.findByEventId(eventId);
    }
}
