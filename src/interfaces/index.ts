export interface ISpending {
    id?: number,
    name: string,
    price: number,
    status: string,
    time: any,
}

export interface TotalSpending {
    food: number,
    coffee: number,
    hangOUt: number,
    oil: number,
    waste: number,
    good: number,
    bad: number,
    other: number
}
