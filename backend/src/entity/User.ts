import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(["email","name","id"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    isAdmin: boolean;

    @Column()
    password: string;

}
