import React, { useState } from 'react'
import { MiniPalette, MiniColor, MiniTitle, Emoji } from '../../styles'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogTitle, DialogActions, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

const DialogButton = styled(IconButton)(props => ({
    "&:hover": {
        backgroundColor: !props.clear ? '#ff000063' : '#00800063'
    }
}))


function Minipalette(props) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const handleClose = (e) => {
        e.stopPropagation()
        setOpen(false)
    }

    const handleRemove = (e) => {
        e.stopPropagation()
        setOpen(false)
        setTimeout(() => props.removePalette(props.id), 100)
    }

    return (
        <MiniPalette onClick={() => navigate(`/palette/${props.id}`)} className='hvr-grow'>
            <div className='delete' onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
                // props.removePalette(props.id)
            }}>
                <DeleteIcon className='delete-icon' />
            </div>
            <div className='minicolors-container'>
                {props.colors.map(c => {
                    return <MiniColor key={c.color} color={c.color} />
                })}
            </div>
            <MiniTitle>
                {props.paletteName}
                <Emoji>{props.emoji}</Emoji>
            </MiniTitle>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color='primary'>Delete this palette?</DialogTitle>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <DialogButton clear={true} onClick={handleClose}>
                        <ClearIcon />
                    </DialogButton>
                    <DialogButton clear={false} onClick={handleRemove}>
                        <CheckIcon />
                    </DialogButton>
                </DialogActions>
            </Dialog>
        </MiniPalette>
    )
}

export default Minipalette;