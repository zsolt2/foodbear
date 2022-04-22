import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courier } from "./Courier";
import { Food } from "./Food";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    address:string;
    @Column()
    note:string;
    @ManyToMany(type => Food, food => food.orders,{
        eager: true,
        cascade: true
    })
    foods:Food[];
    @ManyToOne(type => Courier, courier => courier.orders)
    courier:Courier;
}