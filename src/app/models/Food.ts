import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Partner } from "./Partner";


export class Food{
    id!:number;
    name!:string;
    price!:number;
    description!:string;
    imageUrl!:string;
    partner!:Partner;
}