import prismaClient from "../../prisma";

interface RemoveRequest{
    order_id: string
}

class RemoveOrderService{
    async execute({ order_id }: RemoveRequest){

        const order = await prismaClient.order.delete({
            where:{
                id: order_id
            }
        })

        return order
    }
}

export { RemoveOrderService }