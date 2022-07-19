import React from 'react';
import styled from 'styled-components';
import { StyledBox, Colorname } from './styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DraggableStyledBox = styled(StyledBox)`
    cursor: default;
    &:hover .icon{
        color: white;
        transition: 0.2s;
    }
    .icon:hover{
        transform: scale(1.3);
        color: red;
        cursor: pointer
    }
`


function DraggableColorBox(props) {
    const { color, name } = props.color;



    return (
        <DraggableStyledBox color={color} >
            <Colorname style={{ bottom: '-8px' }}>
                {name}
                <IconButton onClick={props.removeColor} disableRipple sx={{ marginLeft: 'auto' }} className='icon'>
                    <DeleteIcon />
                </IconButton>
            </Colorname>
        </DraggableStyledBox >
    );
}

export default DraggableColorBox;