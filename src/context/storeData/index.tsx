import React, { createContext, useState, PropsWithChildren } from 'react';
import { useSnackbar } from '../hooks/snackbar';
import axios from 'axios';
import PageLoading from '../../modules/components/PageLoading';
import { useStoreDataApi } from '../hooks/integrations';
import { IAddress, IStoreData, TelephoneType, IProduct, IProductCategories } from '../../utils/interfaces';
import { IInvoice } from '../../utils/interfaces';


interface IStoreDataContext {
    storeData: IStoreData | undefined;
    setStoreData: (value: IStoreData)=>void;
    address: IAddress | undefined;
    setAddress: (value: IAddress)=> void;
    telephones: TelephoneType[];
    setTelephones: (value: TelephoneType[])=>void;
    products: IProduct[];
    setProducts: (value: IProduct[]) => void;
    productCategories: IProductCategories[];
    setProductCategories: (value: IProductCategories[]) => void;
    currentStoreId: number | undefined;
    setCurrentStoreId: (value: number) => void;
    loadAllStoreData: (storeId: number) => Promise<void>;
    invoice?: IInvoice;
    setInvoice: (value: IInvoice) => void;
}

export const StoreDataContext = createContext({} as IStoreDataContext);


export default function ContextData({children}: PropsWithChildren<unknown>){
    const [isLoading, setIsLoading] = useState(false);
    const [storeData, setStoreData] = useState<IStoreData | undefined>();
    const [address, setAddress] = useState<IAddress | undefined>();
    const [telephones, setTelephones] = useState<TelephoneType[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productCategories, setProductCategories] = useState<IProductCategories[]>([]);
    const [currentStoreId, setCurrentStoreId] = useState<number | undefined>();
    const [invoice, setInvoice] = useState<IInvoice>();
    const [openSnackbar] = useSnackbar();

    const { readAllStoreDataByStoreId } = useStoreDataApi();
    const loadAllStoreData = async (storeId: number) => {
        if(currentStoreId && currentStoreId === storeId) return
        try{
            setIsLoading(true);
            const data = await readAllStoreDataByStoreId(storeId);
            if(data){
                setAddress(data.addresses.length ? data.addresses[0] : undefined);
                setTelephones(data.telephones);
                setStoreData(data.store)
                setProducts(data.products);
                setProductCategories(data.productsCategories);
                setCurrentStoreId(data.store.id);
            }
        }
        catch(error: unknown){
            if(axios.isAxiosError(error)){
                openSnackbar("Ocorreu um erro ao busca os seus dados!")
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <StoreDataContext.Provider value={
            {
                storeData, 
                setStoreData,
                address,
                setAddress,
                telephones,
                setTelephones,
                products,
                setProducts,
                productCategories,
                setProductCategories,
                currentStoreId,
                setCurrentStoreId,
                loadAllStoreData,
                invoice,
                setInvoice
            }
        }>
            <PageLoading open={isLoading}/>
            {children}
        </StoreDataContext.Provider>
    )
}
