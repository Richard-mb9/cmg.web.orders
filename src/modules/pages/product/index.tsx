import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';


import defaultImage from '../../../static/images/semImagem.png';
import useContextData from '../../../context/hooks/storeData';
import { IProduct } from '../../../utils/interfaces';
import { useInvoicesApi } from '../../../context/hooks/integrations';


const styleImage = {
    '@media screen and (min-width: 900px)':{
        maxWidth: '100vw', 
        maxHeight: '50vh',
    },
    '@media screen and (max-width: 899px)':{
        maxHeight: '150px',
        margin: 'auto',
    }
}




export default function Product(){
    const [quantity, setQuantity] = useState('1');
    const [product, setProduct] = useState<IProduct>();
    const {tableName, productId, storeId} = useParams();
    

    const { products, loadAllStoreData, setInvoice, invoice } = useContextData();

    const {listByStoreId, addItemToInvoice, createInvoice} = useInvoicesApi();

    useEffect(()=>{
        const currentProduct = products.find((p)=>p.id === parseInt(productId as string));
        setProduct(currentProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const getCategories = ()=> {
        const categoriesNames = product?.categories.map(c=>c.name);

        return categoriesNames?.join(', ');
    }

    const loadInvoice = async ()=>{
        const invoice = await listByStoreId(parseInt(storeId as string), {tableName: tableName as string});
        if(invoice.length === 1){
            setInvoice(invoice[0]);
        }
    }

    const addItem = async ()=>{
        const add = async ()=>{
            if(invoice){
                await addItemToInvoice(invoice.id, {
                    items: [{productId: parseInt(productId as string), quantity: parseInt(quantity)}]
                })
            }
        }
        if(!invoice){
            const response = await createInvoice(
                parseInt(storeId as string),
                {tableName: tableName as string}
            );
            if(response){
                await loadInvoice();
            }
        }
        await add();
    }

    window.onload = async ()=>{
        if(!products.length){
            Promise.all([
                loadAllStoreData(parseInt(storeId as string)),
                loadInvoice()
            ].map(async (f)=> f));
        }
    }


    return (
        <Box>
            <CardMedia
                component="img"
                className='productImageCard'
                sx={{ ...styleImage}}
                src={product?.imageUrl || defaultImage}
                alt="Live from space album cover"
            />
            <Box sx={{padding: 3}}>
                <Typography sx={{fontSize: 20, fontWeight: 'Bolder'}} component="div" variant="subtitle1">
                    {(product?.name)}
                </Typography>
                <Typography sx={{ color: '#555', fontSize: 14}} component="div" variant="subtitle1">
                    {product?.description}
                </Typography>
                <Typography sx={{marginTop:1, color: '#555', fontSize: 14, fontWeight: 'bolder'}} component="div" variant="subtitle1">
                    {`R$ ${product?.price.toFixed(2)}`}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{padding: 2}}>
                <TextField
                    id="note"
                    label="Alguma Observação?"
                    multiline
                    rows={4}
                    placeholder='Ex: Tirar o alface, ponto da carne'
                />
            </Box>
            <Box sx={{padding: 2}}>
                <Typography sx={{ color: '#555', fontSize: 14}} component="div">
                    {getCategories()}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'nowrap', position: 'fixed', bottom: 0, width: '100%'}}>
                <Box sx={{display: 'flex',alignItems: 'center'}}>
                    <IconButton
                        onClick={()=>{if(parseInt(quantity)  > 1) setQuantity((parseInt(quantity) - 1).toString())}}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography sx={{fontSize: 15, margin: '0px 5px'}} component="div">
                        {quantity}
                    </Typography>
                    <IconButton
                        onClick={()=>setQuantity((parseInt(quantity) + 1).toString())}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                <Button 
                    onClick={addItem}
                    sx={{margin: 1, flexGrow: 2}} variant="contained"
                    color='error'
                >
                    PEDIR
                </Button>
            </Box>
        </Box>
        
    )

}