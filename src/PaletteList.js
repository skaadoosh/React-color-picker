import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette';
import './PaletteList.css'
import Grid from '@mui/material/Grid'
import { PaletteListContainer, PaletteListTitle, MiniPaletteContainer } from './styles';




class PaletteList extends Component {
    render() {
        const links = (this.props.palettes.map(palette => {
            return (
                <Grid key={palette.id} item xs={12} md={6} lg={4} zeroMinWidth>
                    <Link to={palette.id} style={{ textDecoration: 'none', width: '100%' }} className='hvr-grow'>
                        <Minipalette {...palette} />
                    </Link>
                </Grid>)
        }))
        return (
            <PaletteListContainer>
                <MiniPaletteContainer>

                    <PaletteListTitle>
                        <h1>react<span>colors</span></h1>
                        <Link to='/newpalette'>New Palette</Link>
                    </PaletteListTitle>
                    <Grid container spacing={3}>
                        {links}
                    </Grid>
                </MiniPaletteContainer>
            </PaletteListContainer>


        );
    }
}

export default PaletteList;