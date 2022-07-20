import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, Typography, ButtonGroup, Button, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { styled, useTheme } from '@mui/material/styles'

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const ColorPickerContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .drawer-title{
        margin-bottom: 1rem;
    }
    .drawer-title span{
        font-size: 1rem;
        font-style: italic;
        color: #0000009c;
    }
    .drawer-btn-grp{
        display: flex; 
        height: 2rem; 
    }
    .drawer-color-picker{
        margin: 1.4rem; 
    }
`
const ColorPickerButton = styled(Button)((props) => ({
    backgroundColor: props.hex,
    margin: '1rem 0',
    width: '100%',
    height: '2.8rem',
    "&:hover": {
        backgroundColor: props.hex,
    }
}))

function FormDrawer(props) {
    const [color, setColor] = useState('#fff');
    const [newName, setName] = useState('');

    const { drawerWidth, open, isFull, palette } = props
    const theme = useTheme();

    useEffect(() => {

        ValidatorForm.addValidationRule('isNameUnique', (value) => {
            return palette.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        });

        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            let currColor = color.hex
            return palette.every(({ color }) => color !== currColor)
        });

        ValidatorForm.addValidationRule('isColorSelected', (value) => {
            return color !== '#fff'
        });
    })


    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={props.close}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />

            <ColorPickerContainer>
                <Typography className='drawer-title' variant='h5'>
                    Design Your Palette <br />
                    <span>Drag colors to align them as you like</span>
                </Typography>

                <div className='drawer-btn-grp' >
                    <ButtonGroup size='small' variant='contained'>
                        <Button onClick={props.clearPalette} color='error'>Clear palette</Button>
                        <Button disabled={isFull} onClick={props.randColor} color='primary'>Random color</Button>
                    </ButtonGroup>
                </div>

                <div className='drawer-color-picker'>
                    <ChromePicker disableAlpha color={color.rgb}
                        onChange={(color) => setColor(color)} />
                </div>

                <ValidatorForm onSubmit={() => props.addColor(color, newName)}>
                    <TextValidator
                        label='Color Name'
                        size='small'
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                        validators={['required', 'isNameUnique', 'isColorUnique', 'isColorSelected']}
                        errorMessages={['this field is required', 'this name is already taken', 'this color is already used', 'select a color']}
                    />
                    <ColorPickerButton type='submit' disabled={props.isFull} hex={color.hex} variant='contained'>
                        Add Color
                    </ColorPickerButton>
                </ValidatorForm>

            </ColorPickerContainer>

        </Drawer>
    );
}

export default FormDrawer;