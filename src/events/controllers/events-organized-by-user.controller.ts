import {
    ClassSerializerInterceptor,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Query,
    SerializeOptions,
    UseInterceptors,
} from "@nestjs/common";
import { EventsService } from "../services/event.service";
import { LIMIT } from "src/config/constants";

@Controller("events-organized-by-user/:userId")
@SerializeOptions({ strategy: "excludeAll" })
@UseInterceptors(ClassSerializerInterceptor)
export class EventsOrganizedByUserController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async findAll(
        @Param("userId", ParseIntPipe) userId: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1,
    ) {
        return await this.eventsService.getEventsOrganizedByUserIdPaginated(userId, { currentPage: page, limit: LIMIT });
    }
}
