import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import generatePalette from './colorHelper';
import Navbar from './Navbar';
import Footer from './Footer';
import ColorBox from './ColorBox';
import { Back, Backbtn } from './styles';
import { Grid } from '@mui/material';

function Morepalette(props) {
    const [format, setFormat] = useState('hex');
    const { pid, id } = useParams()
    function getPalette(pid) {
        let palette = props.palettes.filter(p => p.id === pid)
        return palette[0];
    }
    function getColors(pid, id) {
        let color = []
        let palette = getPalette(pid)
        let colors = generatePalette(palette).colors
        for (let shade in colors) {
            for (let i of colors[shade])
                if (i.id === id)
                    color.push(i)
        }
        return color
    }
    const color = getColors(pid, id).slice(1);
    const palette = getPalette(pid)
    return (
        <div style={{ height: '100%' }}>

            <Navbar
                format={format}
                changeFormat={(e) => setFormat(e.target.value)}
                showlevel={false}
            />
            <Grid container columns={15} style={{ height: '84%' }}>
                {color.map(shade =>
                    <Grid item xs={15} md={5} lg={3}>
                        <ColorBox
                            {...shade}
                            format={format}
                            showlink={false}
                        />
                    </Grid>
                )}
                <Grid item xs={15} md={5} lg={3}>
                    <Link to={`/palette/${palette.id}`}>
                        <Back>
                            <Backbtn>Back</Backbtn>
                        </Back>
                    </Link>
                </Grid>
            </Grid>
            <Footer paletteName={palette.paletteName} emoji={palette.emoji} />

        </div>
    )
}

export default Morepalette;