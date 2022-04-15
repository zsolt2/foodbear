import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courier } from "./Courier";
import { Food } from "./Food";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @ManyToMany(type => Food, {
        cascade: true
    })
    @JoinTable()
    foods:Food[];
    @ManyToOne(type => Courier, courier => courier.orders)
    courier:Courier;
}