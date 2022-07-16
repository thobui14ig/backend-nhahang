import { OrderDetailsEntity } from './../orderDetails/orderDetails.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'sanpham'})
export class SanphamEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() name: string;
    @Column({ default: 0 }) gia: string;

    @Column() danhmucId: number;
    @Column({ default: 0 }) soluong: number;
    @Column() donvi: string;

    @OneToMany(() => OrderDetailsEntity, (orderDetail) => orderDetail.sanpham)
    orderDetails: OrderDetailsEntity[]
}


