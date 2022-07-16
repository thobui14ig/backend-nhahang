import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'danhmuc'})
export class DanhmucEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() name: string;
}
