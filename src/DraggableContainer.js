import React from 'react';
import { Grid } from '@mui/material';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { useRef } from 'react';

const DraggableItem = SortableElement(props => {

    const { color } = props
    return (
        <Grid item style={{ height: 'calc((100vh - 72px) / 4)' }} xs={15} md={5} lg={3}>
            <DraggableColorBox
                id={color.name}
                removeColor={() => props.removeColor(color.color)}
                color={color} />
        </Grid>
    )
})

const DraggableGrid = SortableContainer(props => {
    const { palette } = props
    return (
        <Grid container columns={15} style={{ maxHeight: '100%' }}>
            {palette.map((color, i) =>
                <DraggableItem
                    ref={props.noderef}
                    removeColor={props.onRemove}
                    index={i}
                    key={`${color.name}-${i}`}
                    color={color} />
            )}
        </Grid>
    )
})

function DraggableContainer(props) {
    const noderef = useRef(null)
    const onRemove = (color) => {
        props.removeColor(color)
    }
    const onSortEnd = ({ oldIndex, newIndex }) => {
        let sorted = arrayMoveImmutable(props.palette, oldIndex, newIndex)
        props.onSort(sorted);
    };
    return (
        <DraggableGrid noderef={noderef} onRemove={onRemove} axis='xy' palette={props.palette} onSortEnd={onSortEnd} />
    );

}

export default DraggableContainer;