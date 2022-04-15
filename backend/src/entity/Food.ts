import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Partner } from "./Partner";

@Entity()
export class Food{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    price:number;
    @Column("text")
    description:string;
    @Column("text")
    imageUrl:string;
    @ManyToOne(type => Partner, partner => partner.foods)
    partner:Partner;
}