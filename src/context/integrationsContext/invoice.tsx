import React, { createContext, useContext, PropsWithChildren, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from '../hooks/snackbar';
import { BaseApiContext } from './baseApi';
import { IInvoice } from '../../utils/interfaces';
import PageLoading from '../../modules/components/PageLoading';


interface ICreateInvoiceRequest {
    tableName: string;
}

interface ICreateInvoiceResponse {
    id: number;
}

interface IListBySoreIdParams {
    invoiceId?: number;
    tableName?: string;
}


interface IAddItemToInvoiceRequestItem {
    productId: number;
    quantity: number;
}

interface IAddItemToInvoiceRequest {
    items: IAddItemToInvoiceRequestItem[];
}

interface IAddItemToInvoiceResponse {
    price: number
}

interface IInvoiceIntegrationContext {
    createInvoice: (storeId: number, data: ICreateInvoiceRequest) => Promise<ICreateInvoiceResponse | undefined>;
    listByStoreId: (storeId: number, params: IListBySoreIdParams) => Promise<IInvoice[]>;
    addItemToInvoice: (invoiceId: number, items: IAddItemToInvoiceRequest) => Promise<IAddItemToInvoiceResponse | undefined>;
}

export const InvoiceIntegrationContext = createContext({} as IInvoiceIntegrationContext);

export default function InvoiceIntegration({children}: PropsWithChildren<unknown>){
    const [isLoading, setIsLoading] = useState(false);
    const { api } = useContext(BaseApiContext);
    const [openSnackbar] = useSnackbar();

    async function createInvoice(storeId: number, data: ICreateInvoiceRequest){
        setIsLoading(true);
        try{
            const response = await api.post<ICreateInvoiceResponse>(`/invoices/stores/${storeId}`, data);
            return response.data
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos criar a sua fatura");
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    async function listByStoreId(storeId: number, params: IListBySoreIdParams){
        setIsLoading(true)
        try{
            const response = await api.get<IInvoice[]>(`/invoices/stores/${storeId}`, {params})
            return response.data
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 403){
                    openSnackbar("Você não tem permissão para listar as faturas");
                }
                else{
                    openSnackbar("Não conseguimos listar as faturas");
                }
            }
        }
        finally{
            setIsLoading(false);
        }
        return [];
    }

    async function addItemToInvoice(invoiceId: number, items: IAddItemToInvoiceRequest){
        setIsLoading(true);
        try{
            const response = await api.post<IAddItemToInvoiceResponse>(`/invoices/${invoiceId}/items`, items)
            openSnackbar("Pedido Feito!", {color: 'success'});
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar os dados");
            }
        }
        finally{
            setIsLoading(false);
        }
        
    }

    return (
        <InvoiceIntegrationContext.Provider
            value={{
                listByStoreId,
                addItemToInvoice,
                createInvoice
            }}
        >
            <PageLoading open={isLoading}/>
            {children}
        </InvoiceIntegrationContext.Provider>
    )
}