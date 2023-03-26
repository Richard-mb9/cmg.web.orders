import React, { createContext ,useContext, PropsWithChildren } from 'react';
import { BaseApiContext } from './baseApi';
import { IAddress, IStoreData, IProduct, IProductCategories, TelephoneType } from '../../utils/interfaces';
import axios from 'axios';
import { useSnackbar } from '../hooks/snackbar';

interface ICreateAndUpdateStoreData {
    cnpj?: string;
    corporateName?: string;
    name?: string;
    description?: string;
}

interface IAllStoreData {
    addresses: IAddress[];
    telephones: TelephoneType[];
    store: IStoreData;
    products: IProduct[];
    productsCategories: IProductCategories[];
}


interface IStoreDataIntegrationContext {
    readStoreData: (id: number)=> Promise<IStoreData | undefined>;
    readAllStoreDataByStoreId: (userId: number) => Promise<IAllStoreData | undefined>;
}

export const StoreDataIntegrationContext = createContext({} as IStoreDataIntegrationContext);

export default function StoreDataIntegration({children}: PropsWithChildren<unknown>){
    const { api } = useContext(BaseApiContext);
    const [openSnackbar] = useSnackbar();
    
    const readStoreData = async (userId: number) => {
        try{
            const response = await api.get<IStoreData>(`/stores/user/${userId}`);
            return response.data;
        }
        catch(error: unknown){
            openSnackbar("Houve um erro ao carregar os dados desta loja");
        }
        
    }
    

    async function readAllStoreDataByStoreId(StoreId: number){
        try{
            const response = await api.get<IAllStoreData>(`/stores/${StoreId}/all-data`)
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos buscar os seus dados")
            }
        }
    }

    return (
        <StoreDataIntegrationContext.Provider
            value={{
                readStoreData,
                readAllStoreDataByStoreId
            }}
        >
            {children}
        </StoreDataIntegrationContext.Provider>
    )
}

