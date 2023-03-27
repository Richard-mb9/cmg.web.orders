import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';

import defaultImage from '../../../static/images/semImagem.png'
import ProductCard from '../../components/ProductCard';
import useStoreData from '../../../context/hooks/storeData';
import InputSearch from '../../components/InputSearch';
import { IProduct } from '../../../utils/interfaces';
import { useInvoicesApi } from '../../../context/hooks/integrations';
import { useSessionData } from '../../../context/hooks/sessionData';

const styleImage = {
    '@media screen and (min-width: 900px)':{
        maxWidth: '150px', 
        maxHeight: '110px',
    },
    '@media screen and (max-width: 899px)':{
        maxHeight: '150px',
        margin: 'auto',
    }
}

export default function StoreProducts(){
    const { storeId, tableName } = useSessionData();

    const [search, setSearch] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);

    const { 
        products: productsFromContext,
        storeData,
        loadAllStoreData,
        setInvoice,
    } = useStoreData();

    const { listByStoreId } = useInvoicesApi();

    const handleSearch = ()=>{
        const normalize = (text: string) =>{
            return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }
        const newPreview = productsFromContext.filter((p)=>(
            normalize(p.name).includes(normalize(search))
            || normalize((p.description || '')).includes(normalize(search))
        ));
        setDisplayedProducts(newPreview)
    }

    useEffect(()=>{
        setDisplayedProducts(productsFromContext);
    }, [productsFromContext])

    const loadInvoice = async ()=>{
        const invoice = await listByStoreId(parseInt((storeId || '0') as string), {tableName: tableName as string});
        if(invoice.length === 1){
            setInvoice(invoice[0]);
        }
    }

    useEffect(()=>{
        if(!!!productsFromContext.length){
            Promise.all([
                loadAllStoreData(parseInt((storeId || '0') as string)),
                loadInvoice()
            ].map(async (f)=> f));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);

    return(
        <Box>
            <CardMedia
                component="img"
                className='productImageCard'
                sx={{ ...styleImage}}
                src={storeData?.imageUrl || defaultImage}
                alt="Live from space album cover"
            />
            <Typography 
                sx={{padding: '0px 20px', marginTop: 5, fontSize: 20, fontWeight: 'bolder'}} 
                component="div"
            >
                {storeData?.name || ''}
            </Typography>
            <Box sx={{padding: 2}}>
                <InputSearch 
                    value={search}
                    onChange={(event)=>setSearch(event.target.value)}
                    placeholder="Pesquise por um prato"
                    onSearch={handleSearch}
                    onSelect={handleSearch}
                />
            </Box>
            
            {displayedProducts.map((product)=> <ProductCard key={product.id} product={product}/>)}
        </Box>
    )
}