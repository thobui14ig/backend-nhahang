import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'chinhanh'})
export class ChinhanhEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() diachi: string;
    @Column() sdt: string;
    @Column({ default: 0 }) tongsoban: number;


}


