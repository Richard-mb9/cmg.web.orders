export interface IAddress {
    id: number;
    userId: number;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    country: string;
}

export interface IStoreData {
    id: number;
    userId: number;
    cnpj?: string;
    corporateName?: string;
    description?: string;
    imageUrl?: string;
    name?: string;
}

export interface IAddress {
    id: number;
    userId: number;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    country: string;
}

export interface TelephoneType {
    id: number;
    ddd: string;
    number: string;
}

export interface IProductCategories {
    id: number;
    name: string;
    storeId: number;
}

export interface IProduct {
    id: number;
    storeId: number;
    imageUrl?: string;
    name: string;
    price: number;
    description?: string;
    availableDelivery: boolean;
    availableStore: boolean;
    categories: IProductCategories[];
}

export interface IInvoiceItem {
    orderId: number;
    productId: number;
    quantity: number;
    unityPrice: number;
    delivered: boolean;
    productName: string;
    productImageUrl: string;
}

export interface IInvoice {
    id: number;
    storeId: number;
    tableName: string;
    opened: boolean;
    total: number;
    items: IInvoiceItem[];
}
