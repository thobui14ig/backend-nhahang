import { BanEntity } from 'src/ban/ban.entity';
import { OrderDetailsEntity } from './../orderDetails/orderDetails.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'order'})
export class OrderEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() banId: number;

    @OneToMany(() => OrderDetailsEntity, (orderDetail) => orderDetail.order)
    orderDetails: OrderDetailsEntity[]

    @OneToOne(() => BanEntity, (ban) => ban.order) // specify inverse side as a second parameter
    @JoinColumn({ name: "banId" })
    ban: BanEntity
}


