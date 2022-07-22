import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette';
import './PaletteList.css'
import Grid from '@mui/material/Grid'
import { PaletteListContainer, PaletteListTitle, MiniPaletteContainer } from '../../styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = { palettes: props.palettes }
        this.removePalette = this.removePalette.bind(this)
    }

    removePalette(paletteId) {
        this.setState(st => ({ palettes: st.palettes.filter(p => p.id !== paletteId) }))
    }
    render() {
        const links = (this.state.palettes.map(palette => {
            return (
                <CSSTransition key={palette.id} classNames='fade' timeout={300}>
                    <Grid key={palette.id} item xs={12} md={6} lg={4} zeroMinWidth>
                        <Minipalette removePalette={this.removePalette}  {...palette} />
                    </Grid>
                </CSSTransition>
            )
        }))
        return (
            <PaletteListContainer>
                <MiniPaletteContainer>

                    <PaletteListTitle>
                        <h1>react<span>colors</span></h1>
                        <Link to='/newpalette'>New Palette</Link>
                    </PaletteListTitle>
                    <Grid container spacing={3}>
                        <TransitionGroup component={null}>
                            {links}
                        </TransitionGroup>
                    </Grid>
                </MiniPaletteContainer>
            </PaletteListContainer>


        );
    }
}

export default PaletteList;