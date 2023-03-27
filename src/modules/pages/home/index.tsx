import React from 'react';
import { useSessionData } from '../../../context/hooks/sessionData';

export default function Home(){
    const { storeId } = useSessionData();

    return(
        <h1>{(storeId) ? storeId.toString() : 'Nada'}</h1>
    )
}