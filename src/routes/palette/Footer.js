import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer className='palette-footer'>
                <span className='footer-text'>{this.props.paletteName}</span>
                <span className='footer-emoji'>{this.props.emoji}</span>
            </footer>
        );
    }
}

export default Footer;