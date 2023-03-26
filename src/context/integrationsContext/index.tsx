import React, { PropsWithChildren } from 'react';

import BaseApiProvider from './baseApi';
import InvoiceProvider from './invoice';
import StoreDataIntegrationProvider from './storeData'

export default function IntegationContext({children}: PropsWithChildren<unknown>){
    return (
        <BaseApiProvider>
            <StoreDataIntegrationProvider>
                <InvoiceProvider>
                    {children}
                </InvoiceProvider>
            </StoreDataIntegrationProvider>
        </BaseApiProvider>
    )
}