import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ObjectID, ObjectIdColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

//IMPORTS
import { IsNotEmpty, IsDateString } from "class-validator";
import { User } from '../user/User';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nameProject: string
    
    @Column()
    @IsNotEmpty()
    aboutProject: string

}
