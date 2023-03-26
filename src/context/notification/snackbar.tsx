import React, { createContext, useState, PropsWithChildren } from 'react';
import Snackbar from '@mui/material/Snackbar';

export interface IConfig {
  duration?: number;
  color?: "error" | "success" | "alert";
}

const defaultValueContext = {
    openSnackbar: (message: string, config?: IConfig) => {},
    closeSnackbar: () => {}
}

const defaultColor = "error";

const defaultDuration = 10000;

export const SnackbarContext = createContext(defaultValueContext);

export default function SnackBar({children}: PropsWithChildren<unknown>){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [duration, setDuration] = useState(defaultDuration)
    const [color, setColor] = useState(defaultColor);

    const triggerSnackbar = (message: string, config?: IConfig) => {
        setMessage(message)
        setDuration(config?.duration || defaultDuration)
        setColor(config?.color || 'error');
        setOpen(true)
      }

    const openSnackbar = (message: string, config?: IConfig) => {
        if (open === true) {
          setOpen(false)
        } else {
          triggerSnackbar(message, config)
        }
      }

    const closeSnackbar = () => {
        setOpen(false)
      }
    
    return (
        <SnackbarContext.Provider value={{openSnackbar, closeSnackbar}}>
            {children}
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={closeSnackbar}
            message={message}
            autoHideDuration={duration}
            ContentProps={{
                sx: {
                    backgroundColor: color === 'error' ? 'orangered' : 'green'
                }
            }}
      />
        </SnackbarContext.Provider>
    )

} 
