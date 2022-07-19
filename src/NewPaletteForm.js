import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Button, ButtonGroup } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChromePicker } from 'react-color';
import DraggableContainer from './DraggableContainer';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Picker from 'emoji-picker-react'

import { useNavigate } from 'react-router-dom';

const drawerWidth = 290;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 72px)',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({

    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
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



export default function NewPaletteForm(props) {


    const navigate = useNavigate();
    const theme = useTheme();


    const [open, setOpen] = React.useState(true);
    const [color, setColor] = React.useState('#fff');
    const [palette, setPalette] = React.useState([
        { color: "pink", name: "pink" },
        { color: "#273c75", name: "MazarineBlue" },
        { color: "#ffb142", name: "MandarinSorbet" },
        { color: "#006266", name: "TurkishAqua" },
        { color: "#8e44ad", name: "Wisteria" },
        { color: "#d35400", name: "Pumpkin" },
        { color: "#d1ccc0", name: "CrocodileTooth" },
        { color: "#fbc531", name: "Rise-N-Shine" },
        { color: "#B53471", name: "VerryBerry" },
        { color: "#ff7979", name: "PinkGlamour" },
        { color: "#ED4C67", name: "BaraRose" }
    ]);
    const [newName, setName] = React.useState('');
    const [dialogOpen, toggleDialog] = React.useState(false);
    const [paletteName, setPaletteName] = React.useState('');
    const [isFull, toggleIsFull] = React.useState(false);
    const [chosenEmoji, setChosenEmoji] = React.useState(null);
    const [emojiList, showEmojiList] = React.useState(false);



    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        console.log(chosenEmoji)
    };




    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (color, e) => {
        setColor(color)
    }

    const handleSubmit = () => {
        let newColor = { color: color.hex, name: newName }
        setPalette([...palette, newColor])
    }

    const savePalette = () => {
        let newPaletteName = paletteName
        const newPalette = {
            colors: palette,
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            emoji: '😍'
        }
        props.addPalette(newPalette)
        navigate('/React-color-picker', { replace: true })
    }

    const removeColor = (color) => {
        setPalette(palette.filter(c => c.color !== color))
    }

    const randColor = () => {
        let newColor = props.palettes[Math.floor(Math.random() * 8)].colors[Math.floor(Math.random() * 18)]
        setPalette([...palette, newColor])
    }

    const handleDialogClick = () => {
        if (palette.length !== 20)
            toggleIsFull(false)
        else
            toggleDialog(true)
    }

    const clearPalette = () => {
        setPalette([])
    }

    const onSort = (sortedPalette) => {
        setPalette(sortedPalette)
    }

    React.useEffect(() => {

        ValidatorForm.addValidationRule('isNameUnique', (value) => {
            return palette.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        });
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            let currColor = color
            return palette.every(({ color }) => color !== currColor.hex)
        });
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            let currPName = paletteName
            return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== currPName.toLowerCase())
        });
        ValidatorForm.addValidationRule('isColorSelected', (value) => {
            return color !== '#fff'
        });

        if (palette.length === 20)
            toggleIsFull(true)
        else
            toggleIsFull(false)

    }, [palette, color, paletteName, props.palettes])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color='default' open={open}>
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Create Palette
                        </Typography>
                    </div>
                    <div>
                        <Button color={!isFull ? 'secondary' : 'primary'}
                            variant='contained' onClick={handleDialogClick}>
                            {!isFull ? 'Add 20 Colors to save' : 'Save Palette'}
                        </Button>
                        <Button
                            sx={{ marginLeft: '1rem' }}
                            color='success'
                            variant='contained' onClick={() => navigate('/React-color-picker')}>
                            go back
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <ColorPickerContainer>
                    <Typography style={{ marginBottom: '1rem' }} variant='h5'>Design Your Palette</Typography>

                    <div style={{ display: 'flex', height: '2rem' }}>
                        <ButtonGroup size='small' variant='contained'>
                            <Button onClick={clearPalette} color='error'>Clear palette</Button>
                            <Button disabled={isFull} onClick={randColor} color='primary'>Random color</Button>
                        </ButtonGroup>
                    </div>

                    <div style={{ margin: '1.4rem' }}>
                        <ChromePicker style={{ margin: '1rem' }} disableAlpha color={color.rgb} onChange={handleChange} />
                    </div>

                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label='Color Name'
                            size='small'
                            value={newName}
                            onChange={(e) => setName(e.target.value)}
                            validators={['required', 'isNameUnique', 'isColorUnique', 'isColorSelected']}
                            errorMessages={['this field is required', 'this name is already taken', 'this color is already used', 'select a color']}
                        />
                        <ColorPickerButton type='submit' disabled={isFull} hex={color.hex} variant='contained'>
                            Add Color
                        </ColorPickerButton>
                    </ValidatorForm>

                </ColorPickerContainer>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                <DraggableContainer
                    palette={palette}
                    removeColor={removeColor}
                    onSort={onSort}
                />

                <Dialog open={dialogOpen} onClose={() => toggleDialog(false)}>
                    <DialogTitle sx={{ backgroundColor: '#f5f5f5', padding: '0.7rem' }}>Save Palette</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ marginTop: '1rem' }}>
                            Give your palette a name.
                        </DialogContentText>
                        <ValidatorForm onSubmit={savePalette}>
                            <TextValidator
                                size='small'
                                value={paletteName}
                                onChange={(e) => setPaletteName(e.target.value)}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['this field is required', 'Palette name already taken']}
                            />
                            {/* <IconButton onClick={() => showEmojiList(true)}>
                                <EmojiEmotionsIcon />
                            </IconButton>
                            <div style={{ display: !emojiList ? 'none' : 'inline-block' }}>
                                <Picker disableSkinTonePicker disableAutoFocus disableSearchBar onEmojiClick={onEmojiClick} />
                            </div> */}
                            <Button sx={{ marginTop: '1rem', width: '100%' }} type='submit' variant='contained'>save</Button>
                        </ValidatorForm>
                    </DialogContent>
                </Dialog>
            </Main>
        </Box>
    );
}
