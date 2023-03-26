import {useContext} from 'react';
import { IConfig, SnackbarContext } from '../notification/snackbar';

export function useSnackbar(){
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)

    const open = (message: string, config?: IConfig) => {
        openSnackbar(message, config)
    }

    return [open, closeSnackbar]
}