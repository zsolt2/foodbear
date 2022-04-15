import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./Food";

@Entity()
export class Partner{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column()
    tel:string;
    @Column()
    taxNumber:number;
    @Column()
    adress:string;
    @OneToMany(type => Food, food => food.partner)
    foods:Food[];
}