import { getRepository, Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Partner } from "../entity/Partner";

export class PartnerController extends Controller {
    repository: Repository<Partner> = getRepository("Partner");

    getFullJoined = async (req, res, next) => {
        try {
            const partnerId = req.params.id;

            let result = await this.repository
                .createQueryBuilder("partner")
                .where("partner.id = :id", { id: partnerId })
                .leftJoinAndSelect("partner.foods", "foods");
           const partialResult = await result.getMany();
            if ( partialResult && partialResult[0].foods.length > 0 ){
                await result.leftJoinAndSelect("foods.orderToFoods", "orderToFoods")
                        .leftJoinAndSelect("orderToFoods.order", "order")
                        .getOne();
            }
            const data = await result.getMany();
            res.json(data[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    }
}