import { getRepository, Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Order } from "../../../src/app/models/Order";

export class OrderController extends Controller{
    repository: Repository<Order> = getRepository("Order");

    getOrdersByPartnerId = async (req, res, next) => {
        try {
            const partnerId = req.params.id;

            console.log(partnerId);

            let result = await this.repository
                .createQueryBuilder("order")
                .leftJoin("order.foods", "foods")
                .select(["order", "foods.id", "foods.name", "foods.price", "foods.partner"])
                .leftJoin("foods.partner", "partner")
                .addSelect("partner.id")
                .where("partner.id = :id", { id: partnerId })
                .leftJoin("order.courier", "courier")
                .addSelect(["courier.id", "courier.name"])
                //.where("order.partner = :partnerId", { partnerId })
                //.leftJoinAndSelect("foods.partner", "partner")
                .getMany();
            if(!result){
                return res.status(404).json({
                    message: "No orders found"
                });
            } else {
            //console.log("partnerelkwarj" , result[0].foods[0].partner);
                console.log(result[0])
                res.json(result);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err.message);
        }
    }

    getOrderByFoodId = async (req, res, next) => {
        try {
            const foodId = req.params.id;
            let result = await this.repository
                .createQueryBuilder("order")
                .leftJoin("order.foods", "foods")
                .where("foods.id = :id", { id: foodId })
                .select(["order", "foods.id", "foods.name", "foods.price", "foods.partner"])
                .leftJoin("order.courier", "courier")
                .addSelect(["courier.id", "courier.name"])
                //.where("order.partner = :partnerId", { partnerId })
                //.leftJoinAndSelect("foods.partner", "partner")
                .getMany();
            if(!result){
                return res.status(404).json({
                    message: "No orders found"
                });
            } else {
                res.json(result);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}