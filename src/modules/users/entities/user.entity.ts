import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UserDto } from '../dtos/user.dto';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserDeletedEvent } from '../events/impl/user-deleted.event';
import { UserUpdatedEvent } from '../events/impl/user-updated.event';
import { UserWelcomedEvent } from '../events/impl/user-welcomed.event';

@Entity({ name: 'users' })
export class User extends AbstractEntity<UserDto> {
    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true, nullable: true })
    email: string;

    dtoClass = UserDto;

    create() {
        this.apply(new UserCreatedEvent(this.toDto()));
    }

    update() {
        this.apply(new UserUpdatedEvent(this.toDto()));
    }

    welcome() {
        this.apply(new UserWelcomedEvent(this.toDto()));
    }

    delete() {
        this.apply(new UserDeletedEvent(this.toDto()));
    }

}
