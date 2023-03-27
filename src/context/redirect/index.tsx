import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { Navigate, BrowserRouter } from 'react-router-dom';


interface IRedirectContext {
    navigate: (path: string, props?: object) => void;
    redirect: boolean;
    setRedirect: (value: boolean)=>void;
}

export const RedirectContext = createContext({} as IRedirectContext);


const useReactPath = () => {
    const [path, setPath] = React.useState(window.location.pathname);
    const listenToPopstate = () => {
      const winPath = window.location.pathname;
      setPath(winPath);
    };
    React.useEffect(() => {
      window.addEventListener("popstate", listenToPopstate);
      return () => {
        window.removeEventListener("popstate", listenToPopstate);
      };
    }, []);
    return path;
  };

export default function SnackBar({children}: PropsWithChildren<unknown>){
    const [path, setPath] = useState("/");
    const [redirect, setRedirect] = useState(false);
    const [props, setProps] = useState({})

    const location = useReactPath();

    const navigate = (newPath: string, sendProps: object= {})=>{
        setPath(newPath);
        setProps(sendProps)
        setRedirect(true);
    }

    useEffect(()=>{
        setRedirect(false);
    }, [path, location]);

    
    return (
        <RedirectContext.Provider value={{navigate, redirect, setRedirect}}>
            { redirect ? (
                <BrowserRouter>
                    <Navigate to={path} state={props}/>
                </BrowserRouter>
            ): children }
        </RedirectContext.Provider>
    )

} 
