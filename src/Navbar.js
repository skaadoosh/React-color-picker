import React, { Component } from 'react';
import './Navbar.css'
import Slider from 'rc-slider';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { snack: false }
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(e) {
        this.props.changeFormat(e)
        this.setState({ snack: true })
    }
    handleClose() {
        this.setState({ snack: false })
    }
    render() {

        let show = this.props.showlevel ? 'inline-block' : 'none'
        return (
            <div className='nav'>
                <Link className='logo' to='/'>reactcolorpicker</Link>
                <div className='level' style={{ display: show }}>Level: {this.props.level}</div>
                <div className='slider' style={{ display: show }}>
                    <Slider
                        defaultValue={this.props.level}
                        min={100}
                        max={900}
                        step={100}
                        onChange={this.props.changeLevel}
                        handleStyle={{
                            background: 'green',
                            outline: 'none',
                            border: '2px solid green',
                            boxShadow: 'none',
                            width: '13px',
                            height: '13px',
                        }}
                        trackStyle={{ backgroundColor: 'transparent' }}
                        railStyle={{ height: '5px' }}
                    />
                </div>
                <div className='select-container'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Format</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={this.props.format}
                            label="Format"
                            onChange={this.handleChange}
                        >
                            <MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
                            <MenuItem value={'rgb'}>RGB - rgb(255,255,255)</MenuItem>
                            <MenuItem value={'rgba'}>RGBA - rgba(255,255,255,1.0)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Snackbar
                    open={this.state.snack}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={`Format changed to ${this.props.format}!`}
                    action={(
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                />
            </div>
        );
    }
}

export default Navbar;