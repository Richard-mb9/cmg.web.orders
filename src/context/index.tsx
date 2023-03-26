import React, { PropsWithChildren } from 'react';

import IntegrationContext from './integrationsContext';
import StoreDataContext  from './storeData';

export function GlobalContext({children}: PropsWithChildren<unknown>){
    return (
        <IntegrationContext>
            <StoreDataContext>
                {children} 
            </StoreDataContext>
        </IntegrationContext>            
    )
}