import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Event } from "./../../events/entities/event.entity";
import { Expose } from "class-transformer";
import { Attendee } from "./../../events/entities/attendee.entity";

@Entity()
export class User {
    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ unique: true })
    @Expose()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    @Expose()
    email: string;

    @Column()
    @Expose()
    firstName: string;

    @Column()
    @Expose()
    lastName: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    @Expose()
    profile: Profile;

    @OneToMany(() => Event, (event) => event.organizer)
    @Expose()
    organized: Event[];

    @OneToMany(() => Attendee, (attendee) => attendee.user)
    attendee: Attendee[];
}
