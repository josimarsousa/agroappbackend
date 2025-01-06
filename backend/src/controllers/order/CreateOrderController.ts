import { Response, Request } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";
import prismaClient from "../../prisma";


class CreateOrderController{
    async handle(req: Request, res: Response){

        const { client, description } = req.body

        const createOrderService = new CreateOrderService()

        const order = await prismaClient.order.create({
            data:{
                client,
                description
            }
        })

        return res.json(order)
    }
}

export { CreateOrderController }