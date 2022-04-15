import { Courier } from "./Courier";
import { Food } from "./Food";


export class Order{
    id!:number;
    name!:string;
    foods!:Food[];
    courier!:Courier;
}