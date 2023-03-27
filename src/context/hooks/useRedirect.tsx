import React, {useContext} from 'react';
import { RedirectContext } from '../redirect';

export function useRedirect(){
    const { navigate } = useContext(RedirectContext)

    const redirect = (path: string, props:object = {}) => {
        navigate(path, props)
    }

    return [redirect]
}