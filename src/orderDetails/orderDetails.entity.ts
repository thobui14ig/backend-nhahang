import { OrderEntity } from "src/order/order.entity";
import { SanphamEntity } from "src/sanpham/sanpham.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'order_details'})
export class OrderDetailsEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() orderId: number;

    @Column() sanphamId: number;
    @Column() soluong: number;

    @ManyToOne(() => OrderEntity, (orderDetails) => orderDetails.orderDetails)
    order: OrderEntity

    @ManyToOne(() => SanphamEntity, (sanpham) => sanpham.orderDetails)
    sanpham: SanphamEntity
}


