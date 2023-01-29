import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectID, ObjectIdColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//IMPORTS
import { IsNotEmpty, MinLength, IsEmail, IsOptional, IsDateString } from "class-validator";
import * as bcrypt from 'bcryptjs';
import { Project } from '../projects/Project';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string

    @Column()
    @IsNotEmpty()
    lastName: string

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string
    
    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    @IsOptional()
    photo: string;

    @Column()
    @IsOptional()
    isTrainer: boolean;


    @Column()
    activityDate: Date;

    @Column()
    @IsOptional()
    status: boolean;

    @Column()
    @IsOptional()
    resetToken: string;
    
    @Column()
    @IsOptional()
    activationCode: string;

    @Column()
    @IsOptional()
    country: string;

    @Column()
    @IsOptional()
    gender: string;

    @Column()
    @IsOptional()
    role: string;

    @Column()
    @IsOptional()
    whatsapp: string;

    @Column()
    @IsOptional()
    linkedin: string;

    @Column()
    @IsOptional()
    github: string;

    @Column()
    @IsOptional()
    about: string;

    @ManyToMany(() => Project)
    @JoinTable()
    project: Project[]
    
    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
