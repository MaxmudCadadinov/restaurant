import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum weeks_day{
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
}

export enum MonthDays{
    First = '1',
    Second = '2',
    Third = '3',
    Fourth = '4',
    Fifth = '5',
    Sixth = '6',
    Seventh = '7',
    Eighth = '8',
    Ninth = '9',
    Tenth = '10',
    Eleventh = '11',
    Twelfth = '12',
    Thirteenth = '13',
    Fourteenth = '14',
    Fifteenth = '15',
    Sixteenth = '16',
    Seventeenth = '17',
    Eighteenth = '18',
    Nineteenth = '19',
    Twentieth = '20',
    TwentyFirst = '21',
    TwentySecond = '22',
    TwentyThird = '23',
    TwentyFourth = '24',
    TwentyFifth = '25',
    TwentySixth = '26',
    TwentySeventh = '27',
    TwentyEighth = '28',
    TwentyNinth = '29',  
    Thirtieth = '30',
    ThirtyFirst = '31',       
}


@Entity('smena')
export class Smena {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 50, unique: true})
    name: string

    @Column({type: 'simple-array', nullable: true})
    week_days: weeks_day[]

    @Column({type: 'simple-array', nullable: true})
    month_days: MonthDays[]

    @Column({type: 'time'})
    time_start: string

    @Column({type: 'time'})
    time_finish: string


}