import { Repository } from "typeorm";
import { Attendee } from "../entities/attendee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AttendeesService {
    constructor(
        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>,
    ) {}

    public async findByEventId(eventId: number): Promise<Attendee[]> {
        return await this.attendeeRepository.find({
            where: {
                event: {
                    id: eventId,
                },
            },
        });
    }

    public async findByEventIdAndUserId(eventId: number, userId: number): Promise<Attendee | undefined> {
        return await this.attendeeRepository.findOneBy({
            event: {
                id: eventId,
            },
            user: {
                id: userId,
            },
        });
    }

    public async createOrUpdate(input: any, eventId: number, userId: number): Promise<Attendee> {
        const attendee = (await this.findByEventIdAndUserId(eventId, userId)) ?? new Attendee();
        attendee.evenId = eventId;
        attendee.userId = userId;
        attendee.answer = input.answer;
        return await this.attendeeRepository.save(attendee);
    }
}
