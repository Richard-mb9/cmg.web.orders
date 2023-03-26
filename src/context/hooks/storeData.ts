import { useContext } from 'react';
import { StoreDataContext } from '../storeData';

const useStoreData = ()=> useContext(StoreDataContext)


export default useStoreData;
