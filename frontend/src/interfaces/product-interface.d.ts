export interface IProducts{
    ID: number
    Name: string
    Desc: string
    Price: number
    ImgUrl: string
}

export interface IProductCart extends IProducts{
    Quantity: number
}

export interface ICart{
    TotalPrice: number
    Products: IProductCart[]
}