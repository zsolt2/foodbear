import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique(["email","name","id"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    isAdmin: boolean;

}
