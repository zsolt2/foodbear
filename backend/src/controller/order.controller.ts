import { getRepository, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { Controller } from "./base.controller";
import { Order } from "../entity/Order";
import { Courier } from "../entity/Courier";
import { validationResult } from "express-validator";

export class OrderController extends Controller {
    repository: Repository<Order> = getRepository("Order");

    getOrdersByPartnerId = async (req, res, next) => {
        try {
            const partnerId = req.params.id;

            let result = await this.repository
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                .leftJoin("orderToFoods.food", "foods")
                .addSelect(["foods.id", "foods.partner"])
                .leftJoin("foods.partner", "partner")
                .where("foods.partner = :id", { id: partnerId })
                .getMany();

            if (!result) {
                return res.status(404).json({
                    message: "No orders found"
                });
            } else if (result.length > 0) {
                let result2 = await this.repository
                    .createQueryBuilder("order")
                    .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                    .addSelect(["orderToFoods.food", "orderToFoods.amount"])
                    .leftJoin("orderToFoods.food", "foods")
                    .addSelect(["foods.id", "foods.name", "foods.price", "foods.partner"])
                    .leftJoin("order.courier", "courier")
                    .addSelect(["courier.id", "courier.name"])
                    .leftJoin("foods.partner", "partner")
                    .addSelect(["partner.id", "partner.name"])
                    .where("order.id IN (:...ids)", { ids: result.map(x => x.id) })
                    .getMany();
                res.json(result2);
            } else {
                res.json([]);
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
                .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                .leftJoin("orderToFoods.food", "foods")
                .where("orderToFoods.food = :id", { id: foodId })
                .getMany();

            if (!result) {
                return res.status(404).json({
                    message: "No orders found"
                });
            } else if (result.length >= 1) {
                let result2 = await this.repository
                    .createQueryBuilder("order")
                    .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                    .addSelect(["orderToFoods.food", "orderToFoods.amount"])
                    .leftJoin("orderToFoods.food", "foods")
                    .addSelect(["foods.id", "foods.name", "foods.price", "foods.partner"])
                    .leftJoin("order.courier", "courier")
                    .addSelect(["courier.id", "courier.name"])
                    .leftJoin("foods.partner", "partner")
                    .addSelect(["partner.id", "partner.name"])
                    .where("order.id IN (:...ids)", { ids: result.map(x => x.id) })
                    .getMany();
                if (!result2) {
                    return res.status(404).json({
                        message: "No orders found"
                    });
                }
                res.json(result2);
            } else {
                res.json([]);
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            let result = await this.repository
                .createQueryBuilder("order")
                .where("order.id = :id", { id })
                .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                .leftJoin("orderToFoods.food", "foods")
                .addSelect(["foods.id", "foods.name", "foods.price", "foods.partner"])
                .leftJoin("foods.partner", "partner")
                .addSelect(["partner.id", "partner.name"])
                .leftJoinAndSelect("order.courier", "courier")
                .getOne();
            console.log(result.orderToFoods[0].food);
            if (!result) {
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

    getAll = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const date = req.query.date;
        console.log(date);
        if (!date) {
            return this.getAllFronDb(req, res);
        }else{
            return this.getByDate(req, res);
        }
    }

    getAllFronDb = async (req, res) => {
        try {
            let result = await this.repository
                .createQueryBuilder("order")
                .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                .leftJoin("orderToFoods.food", "foods")
                .addSelect(["foods.id", "foods.name", "foods.price", "foods.partner"])
                .leftJoin("foods.partner", "partner")
                .addSelect(["partner.id", "partner.name"])
                .leftJoinAndSelect("order.courier", "courier")
                .getMany();
            if (!result) {
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

    getByDate = async (req, res) => {
        try {
            const dateString = req.query.date;
            if (!dateString) {
                return res.status(400).json({
                    message: "Date is required"
                });
            }
            const date = new Date(dateString);
            const nextDay = new Date();
            nextDay.setDate(date.getDate() + 1);
            let result = await this.repository
                .createQueryBuilder("order")
                .andWhere("order.orderTime >= :date", { date })   
                .andWhere("order.orderTime < :nextDay", { nextDay })
                .leftJoinAndSelect("order.orderToFoods", "orderToFoods")
                .leftJoin("orderToFoods.food", "foods")
                .addSelect(["foods.id", "foods.name", "foods.price", "foods.partner"])
                .leftJoin("foods.partner", "partner")
                .addSelect(["partner.id", "partner.name"])
                .leftJoinAndSelect("order.courier", "courier")
                
                .getMany();
            if (!result) {
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


    create = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            //Search for available courier
            let order = req.body;
            let amount = 0;
            order.orderToFoods.forEach(x => amount += x.amount);
            const courierRepository = await getRepository(Courier);
            let courier = await courierRepository.findOne({
                where: {
                    isAvailable: true,
                    capacity: MoreThanOrEqual(amount)
                }
            });
            if (!courier) {
                return res.status(404).json("No available couriers");
            }

            order.courier = courier;
            order.orderTime = new Date();
            //save the order
            let result = await this.repository.save(order);
            courier.isAvailable = false;
            await courierRepository.save(courier);
            if (!result) {
                return res.status(404).json("Failed to save order");
            }
            return res.json(result);

        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    delete = async (req, res) => {
        let entityId = req.params.id;


        try {
            let orderToFoodsRepo = await getRepository("OrderToFood");
            const connections = await orderToFoodsRepo.createQueryBuilder("orderToFoods")
                .leftJoin("orderToFoods.order", "order")
                .addSelect("order.id")
                .where("order.id = :id", { id: entityId })
                .getMany();
            if (connections) {
                await orderToFoodsRepo.remove(connections);
            }


            const entity = await this.repository.findOne(entityId, {
                relations: ["courier"]
            });
            let courierRepo = await getRepository("Courier");
            courierRepo.update(entity.courier.id, { isAvailable: true });
            if (!entity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

    deliver = async (req, res) => {
        let orderId = req.params.id;
        try {
            let order = await this.repository.findOne({
                where: {
                    id: orderId
                },
                relations: ["courier"]
            });
            if (!order) {
                return res.status(404).json("No order found");
            }
            let courierRepo = await getRepository("Courier");

            order.delivered = true;
            order.deliveryTime = new Date();

            let result = await this.repository.save(order);
            courierRepo.update(order.courier.id, { isAvailable: true });
            if (!result) {
                return res.status(404).json("Failed to deliver order");
            }
            res.status(200).json(result);


        } catch (err) {
            return res.status(500).json(err.message);
        }

    }
}