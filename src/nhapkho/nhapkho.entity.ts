import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'kho'})
export class KhoEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() sanphamId: number;

    @Column() soluong: number;
    @CreateDateColumn()
    ngaytao?: Date;
}


