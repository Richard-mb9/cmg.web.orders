import React, { CSSProperties, FormEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


interface IProps {
  value: string;
  styles?: CSSProperties;
  placeholder?: string;
  onSearch?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: ()=> void;
}

const stylesDefault = {
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center',
    '@media screen and (max-width: 599px)':{
        width: '100%'
    },
    '@media screen and (min-width: 600px)':{
        width: 400
    }
}


export default function InputSearch(props: IProps) {
  const { styles, placeholder, onChange, onSearch, onSelect, value } = props;

  const handleOnselect = (event: ChangeEvent<HTMLInputElement>) =>{
    if(onSelect){
      onSelect();
    }
  }

  const handleSearch = ()=> {
    if(onSearch){
      onSearch();
    }
  }
  
  return (
    <Paper
      component="form"
      sx={{ ...stylesDefault, ...styles }}
      onSubmit={(e: FormEvent<HTMLFormElement>)=>{e.preventDefault(); handleSearch()}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || "Procurar"}
        inputProps={{ 'aria-label': 'Procurar' }}
        value={value}
        onChange={onChange}
        onSelect={handleOnselect}
      />
      <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}


/* import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#eee',
    '&:hover': {
        backgroundColor: '#ddd',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function () {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Procurar…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
} */