import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({name: 'hoantat'})
export class HoantatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    orderId: number;

    @CreateDateColumn()
    ngaytao?: Date;
}


