import { Courier } from "./Courier";
import { Food } from "./Food";


export class Order{
    id!:number;
    address!:string;
    orderTime!:Date;
    deliveryTime!:Date;
    note!:string;
    foods!:Food[];
    courier!:Courier;
}