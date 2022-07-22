import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { StyledBox, CopyOverlay, CopyMsg, Copymsgh1, Copymsgp, More, Colorname, Btn } from '../../styles'


class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {

        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }
    render() {
        const { hex, name, rgb, rgba, id, paletteId, showlink } = this.props;
        let text = this.props.format === 'hex' ? hex : rgb;
        if (this.props.format === 'rgba') {
            text = rgba
        }
        const { copied } = this.state;
        const isDark = chroma(hex).luminance() < 0.095

        return (
            <CopyToClipboard text={text} onCopy={this.changeCopyState}>
                <StyledBox color={hex} isSinglePalette={!showlink}>
                    <CopyOverlay color={hex} isCopied={copied} />
                    <CopyMsg isCopied={copied}>
                        <Copymsgh1 isDark={isDark}>Copied!</Copymsgh1>
                        <Copymsgp isDark={isDark}>{text}</Copymsgp>
                    </CopyMsg>
                    <div className='copy-container'>
                        <Colorname isDark={isDark}>{name}</Colorname>
                        {/* <button className={isDark ? 'copy-button' : 'copy-button dark-button'}>Copy</button> */}
                        <Btn isDark={isDark}>Copy</Btn>
                    </div>
                    {showlink ? <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                        <More isDark={isDark}>More</More>
                    </Link > : null}
                </StyledBox >
            </CopyToClipboard >
        );
    }
}

export default ColorBox;