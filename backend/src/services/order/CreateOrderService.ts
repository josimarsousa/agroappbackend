import prismaClient from "../../prisma";

interface OrderRequest{
    client: string
    description: string
}

class CreateOrderService{
    async execute({ client, description}: OrderRequest){

        const order = await prismaClient.order.create({
            data:{
                client: client,
                description: description
            }
        })

        return order
    }
}

export { CreateOrderService }