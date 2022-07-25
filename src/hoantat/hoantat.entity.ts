import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({name: 'hoantat'})
export class HoantatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    orderId: number;

    @Column() 
    tongtien: string;


    @CreateDateColumn()
    ngaytao?: Date;
}


