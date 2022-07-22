import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, IconButton } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Picker from 'emoji-picker-react'

const SavePaletteInput = styled('div')`
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    min-width: 280px;
    & input{
        width: 240px;
    }
`

const StyledDialog = styled(Dialog)({
    '.MuiPaper-root': {
        overflow: 'visible'
    },
    '.dialog-text': {
        backgroundColor: '#f5f5f5',
        padding: '0.7rem',
    },
    '.dialog-content-text': {
        margin: '1rem 0'
    },
    '.dialog-button': {
        marginTop: '1rem',
        width: '100%'
    }
})

const EmojiContainer = styled('div')((props) => ({
    display: !props.emoji ? 'none' : 'inline-block',
    position: 'absolute',
    top: '139px',
    right: '-185px',
    zIndex: 10
}))

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Grow ref={ref} {...props} />;
// });

function FormDialog(props) {
    const [paletteName, setPaletteName] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState('👋');
    const [emojiList, showEmojiList] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        showEmojiList(false)
    };
    const handleSubmit = () => {
        props.toggleDialog(false)
        props.savePalette(paletteName, chosenEmoji)
    }
    return (
        <StyledDialog open={props.open} onClose={() => props.toggleDialog(false)}>

            <DialogTitle className='dialog-text'>Save Palette</DialogTitle>
            <DialogContent>
                <DialogContentText className='dialog-content-text'>
                    Give your palette a name and an emoji
                </DialogContentText>
                <ValidatorForm onSubmit={handleSubmit} style={{ maxWidth: 'fit-content' }}>
                    <SavePaletteInput>
                        <TextValidator
                            label='Palette Name'
                            size='small'
                            value={paletteName}
                            onChange={(e) => setPaletteName(e.target.value)}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['this field is required', 'Palette name already taken']}
                        />
                        <IconButton
                            color='primary'
                            onClick={() => showEmojiList(!emojiList)}>
                            {chosenEmoji}
                        </IconButton>
                    </SavePaletteInput>
                    <EmojiContainer emoji={emojiList}>
                        <Picker disableSkinTonePicker disableAutoFocus disableSearchBar onEmojiClick={onEmojiClick}
                            pickerStyle={{ height: '300px' }}
                        />
                    </EmojiContainer>
                    <Button className='dialog-button' type='submit' variant='contained'>save</Button>
                </ValidatorForm>
            </DialogContent>
        </StyledDialog>
    );
}

export default FormDialog;