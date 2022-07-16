import { OrderEntity } from 'src/order/order.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'ban'})
export class BanEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() name: string;
    @Column({ default: false }) active: boolean;
    @OneToOne(() => OrderEntity, (order) => order.ban) // specify inverse side as a second parameter
    order: OrderEntity
}


