import React from 'react'
import { MiniPalette, MiniColor, MiniTitle, Emoji } from './styles'


function Minipalette(props) {

    return (
        <MiniPalette>
            <div className='minicolors-container'>
                {props.colors.map(c => {
                    return <MiniColor id={c.color} color={c.color} />
                })}
            </div>
            <MiniTitle>
                {props.paletteName}
                <Emoji>{props.emoji}</Emoji>
            </MiniTitle>
        </MiniPalette>)
}

export default Minipalette;