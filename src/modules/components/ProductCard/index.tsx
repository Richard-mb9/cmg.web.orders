import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardMedia from "@mui/material/CardMedia";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';


import defaultImage from '../../../static/images/semImagem.png';
import { IProduct } from '../../../utils/interfaces';

const style = {
    maxWidth: 550 ,
    minWidth: 300,
    display: 'flex', 
    padding: 1, 
    margin: 2,
    flexWrap: 'no-wrap',
}

const styleImage = {
    '@media screen and (min-width: 900px)':{
        maxWidth: '150px', 
        maxHeight: '110px',
    },
    '@media screen and (max-width: 899px)':{
        maxWidth: '150px', 
        maxHeight: '150px',
        margin: 'auto',
    }
}

interface IProps {
    product: IProduct
}



export default function ProductCard(props: IProps){
    const { product } = props;
    const { id, availableDelivery, availableStore, price, name } = product;

    const description = (product.description || '').length <= 55
        ? product.description
        : (product.description || '').substring(0,55) + "..."
    return (
        <Link to={`/store/${product.storeId}/product/${id}` }
            style={{
                textDecoration: 'none', 
            }} 
        >
            <Card sx={style}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{flexGrow: 3}}>
                        <Typography sx={{marginTop:1}} component="div" variant="subtitle1">
                            {name}
                        </Typography>
                        <Typography sx={{marginTop:1, color: '#777', fontSize: 14}} component="div" variant="subtitle1">
                            {description}
                        </Typography>
                    </Box>
                    
                    <Divider />
                    <Typography sx={{marginTop:1}} component="div" variant="subtitle1">
                        {`R$ ${price.toFixed(2)}`}
                    </Typography>
                </Box>
                    <CardMedia
                        component="img"
                        className='productImageCard'
                        sx={{ ...styleImage}}
                        src={product.imageUrl || defaultImage}
                        alt="Live from space album cover"
                    />
            </Card>
        </Link>
    )
}