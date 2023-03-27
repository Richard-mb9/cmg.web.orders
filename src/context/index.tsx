import React, { PropsWithChildren } from 'react';

import IntegrationContext from './integrationsContext';
import StoreDataContext  from './storeData';
import SessionDataContext from './sessionData';

export function GlobalContext({children}: PropsWithChildren<unknown>){
    return (
        <SessionDataContext>
            <IntegrationContext>
                <StoreDataContext>
                    {children} 
                </StoreDataContext>
            </IntegrationContext>  
        </SessionDataContext>        
    )
}