import { useContext } from 'react';

import { InvoiceIntegrationContext } from '../integrationsContext/invoice';
import { StoreDataIntegrationContext } from '../integrationsContext/storeData';

export const useInvoicesApi = () => useContext(InvoiceIntegrationContext);

export const useStoreDataApi = () => useContext(StoreDataIntegrationContext);

