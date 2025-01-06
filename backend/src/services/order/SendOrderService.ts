import prismaClient from "../../prisma";

interface SendRequest{
    order_id: string
}

class SendOrderService{
    async execute({ order_id }: SendRequest){
        
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: false,
                draft: false
            }
        })

        return order
    }
}

export { SendOrderService }