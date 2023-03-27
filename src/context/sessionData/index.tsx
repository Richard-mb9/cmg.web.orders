import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';


interface ISessionDataContext {
    storeId?: number;
    tableName?: string;
}

export const SessionDataContext = createContext({} as ISessionDataContext)

export default function SessionData({ children }: PropsWithChildren){
    const [storeId, setStoreId] = useState<number>(0);
    const [tableName, setTableName] = useState('');

    

    const getParams = (param: string)=>{
        const url = new URLSearchParams(window.location.search);
        if(url.get(param)){
            return url.get(param);
        }
        if(sessionStorage.getItem(param)){
            return sessionStorage.getItem(param);
        }
    }

    useEffect(()=>{
        const paramStoreId = getParams('storeId');
        const paramTableName = getParams('tableName');
        if(paramStoreId){
            setStoreId(parseInt(paramStoreId));
            sessionStorage.setItem('storeId', paramStoreId);
        }
        if(paramTableName){
            setTableName(tableName);
            sessionStorage.setItem('tableName', paramTableName)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <SessionDataContext.Provider value={
            {
                storeId,
                tableName
            }
        }>
            {children}
        </SessionDataContext.Provider>
    )
}
