import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courier } from "./Courier";
import { Food } from "./Food";
import { OrderToFood } from "./OrderToFood";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({type:"datetime"})
    orderTime:Date;
    @Column({type:"datetime"})
    deliveryTime:Date;
    @Column()
    address:string;
    @Column()
    note:string;
    // @ManyToMany(type => Food, food => food.orders,{
    //     eager: true,
    //     cascade: true
    // })
    // foods:Food[];
    @ManyToOne(type => Courier, courier => courier.orders)
    courier:Courier;
    @OneToMany(type => OrderToFood, orderToFood => orderToFood.order)
    orderToFoods: OrderToFood[];
}