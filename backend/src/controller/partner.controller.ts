import { getRepository, Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Partner } from "../entity/Partner";

export class PartnerController extends Controller{
    repository: Repository<Partner> = getRepository("Partner");
}