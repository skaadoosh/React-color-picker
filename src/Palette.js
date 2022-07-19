import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid } from '@mui/material';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(e) {
        const format = e.target.value
        this.setState(st => ({ ...st, format }))
    }

    render() {
        const ColorBoxes = this.props.colors[this.state.level].map(color => (
            <Grid item xs={15} md={5} lg={3}>
                <ColorBox key={color.id} id={color.id} {...color} paletteId={this.props.id} format={this.state.format} showlink={true} />
            </Grid>
        ))
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Navbar
                    changeLevel={this.changeLevel}
                    level={this.state.level}
                    format={this.state.format}
                    changeFormat={this.changeFormat}
                    showlevel={true}
                    snack={this.state.snack}
                />
                <div style={{ height: '100%' }}>
                    <Grid container columns={15} style={{ height: '100%' }}>
                        {ColorBoxes}
                    </Grid>
                </div>
                <Footer paletteName={this.props.paletteName} emoji={this.props.emoji} />
            </div>
        );
    }
}

export default Palette;