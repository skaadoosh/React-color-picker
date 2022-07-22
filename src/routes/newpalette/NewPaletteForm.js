import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Button } from '@mui/material';
import DraggableContainer from './DraggableContainer';
import { ValidatorForm } from 'react-material-ui-form-validator';
import FormDialog from './FormDialog'
import FormDrawer, { DrawerHeader } from './FormDrawer';
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


export default function NewPaletteForm(props) {


    const navigate = useNavigate();


    const [open, setOpen] = React.useState(true);
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
    const [isFull, toggleIsFull] = React.useState(false);
    const [dialogOpen, toggleDialog] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addColor = (color, name) => {
        let newColor = { color: color.hex, name }
        setPalette([...palette, newColor])
    }

    const savePalette = (paletteName, chosenEmoji) => {
        const newPalette = {
            colors: palette,
            paletteName: paletteName,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            emoji: chosenEmoji
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

        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            let currPName = value
            return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== currPName.toLowerCase())
        });


        if (palette.length === 20)
            toggleIsFull(true)
        else
            toggleIsFull(false)

    }, [palette, props.palettes])


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

            <FormDrawer
                drawerWidth={drawerWidth}
                open={open}
                isFull={isFull}
                close={handleDrawerClose}
                clearPalette={clearPalette}
                randColor={randColor}
                addColor={addColor}
                palette={palette}
            />

            <Main open={open}>
                <DrawerHeader />

                <DraggableContainer
                    palette={palette}
                    removeColor={removeColor}
                    onSort={onSort}
                />

                <FormDialog open={dialogOpen} toggleDialog={toggleDialog} savePalette={savePalette} />

            </Main>
        </Box>
    );
}
