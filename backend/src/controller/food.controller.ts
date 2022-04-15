import { getRepository, Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Food } from "../entity/Food";

export class FoodController extends Controller{
    repository: Repository<Food> = getRepository("Food");
}