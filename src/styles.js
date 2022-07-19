import styled from "styled-components"

export const StyledBox = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -3.5px;
    background: ${props => props.color}
`



export const Btn = styled.button`
    width: 100px;
    height: 30px;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -15px;
    text-align: center;
    outline: none;
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0,0,0,0.3)'};
    font-size: 1rem;
    line-height: 30px;
    color: white;
    text-transform: uppercase;
    border: none;
    opacity: 0;
    ${StyledBox}:hover &{
        opacity: 1;
        transition: 0.5s;
    }
`

export const More = styled.span`
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
    position: absolute;
    border: none;
    right: 0px;
    bottom: 0px;
    color: white;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-transform: uppercase;
`

export const CopyOverlay = styled.div`
    opacity: ${props => props.isCopied ? '1' : '0'};
    z-index: ${props => props.isCopied ? '10' : '0'};
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    transform: ${props => props.isCopied ? 'scale(50)' : 'scale(0.1)'};
    position: ${props => props.isCopied ? 'absolute' : null};
    background: ${props => props.color};
`

export const CopyMsg = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 4rem;
    transform: ${props => props.isCopied ? 'scale(1)' : 'scale(0.1)'};
    opacity: ${props => props.isCopied ? '1' : '0'};
    color: white;
    z-index: ${props => props.isCopied ? '25' : '0'};
    transition: ${props => props.isCopied ? 'all 0.4s ease-in-out' : null};
    transition-delay: ${props => props.isCopied ? '0.2s' : null};
`
export const Copymsgh1 = styled.h1`
    font-weight: 400;
    text-shadow: 1px 2px black;
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.34)'};
    color: white;
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    padding: 1rem;
    text-transform: uppercase;

`

export const Copymsgp = styled.p`
    color: ${props => props.isDark ? 'white' : 'black'};
    font-size: 2rem;
    font-weight: 100;
`

export const Colorname = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
    padding: 10px;
    color: ${props => props.isDark ? 'white' : 'black'};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
`

export const MiniPalette = styled.div`
    height: 30%;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 8px solid white;
    border-radius: 5px;
    box-shadow: 6px 4px 21px -10px rgba(0,0,0,0.75);
`;

export const MiniColor = styled.div`
    width: 25%;
    height: 1.8rem;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -3.5px;
    background-color: ${props => props ? props.color : ''}
`;

export const MiniTitle = styled.div`
    color: black;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0.5rem;
    font-size: 1.1rem;
`;
export const Emoji = styled.span`
    margin-right: 1rem;
    font-size: 1.2rem;
`;

export const Back = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -3.5px;
    background-color: rgba(0, 0, 0, 0.865);
    transition: 0.5s;
    &:hover{
        background-color: black;
    }
`

export const Backbtn = styled.button`
    width: 100px;
    height: 30px;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -15px;
    text-align: center;
    outline: none;
    background: none;
    font-size: 1rem;
    line-height: 30px;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    opacity: 1;
    cursor:pointer;
`



export const PaletteListContainer = styled.div` 
    min-height: 100vh;
    width: 100vw;
    background-repeat: repeat;
    background-image: linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% );
    overflow: visible;
    box-sizing: border-box;
    
`

export const MiniPaletteContainer = styled.div`
    width: 55%;
    margin: 0 auto;
    padding: 1.5em 0;
    
`

export const PaletteListTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.671);
    margin-bottom: 1em;
    margin-top: 0;
    font-family: cursive;
    font-size: 1rem;
    & h1{
        margin: 0;
        font-size: 1.6rem;
        display: inline-block;
    }
    & h1 span{
        color: black;
    }
    & a{
        position: relative;
        left: -20px;
        text-decoration: none;
        color: black;
    }
`