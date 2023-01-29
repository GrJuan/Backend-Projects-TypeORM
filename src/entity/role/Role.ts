import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

//IMPORTS
import { IsNotEmpty, IsDateString } from "class-validator";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nameRole: string
    
    @Column()
    activityDate: Date;

}
