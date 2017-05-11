/* Defines the product entity */
export interface IProduct {
    ProductID: number;
    ProductName: string;    
    QuantityPerUnit:string;
    UnitPrice:number;
    UnitsInStock:number;
    UnitsOnOrder:number;
    ReorderLevel:number;
    Discontinued:boolean;
    SupplierID:number;
    CategoryID:number;    
}

