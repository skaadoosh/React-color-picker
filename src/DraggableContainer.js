import React, { Component } from 'react';
import { Grid } from '@mui/material';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

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
                    removeColor={props.onRemove}
                    index={i}
                    key={`${color.name}-${i}`}
                    color={color} />
            )}
        </Grid>
    )
})

class DraggableContainer extends Component {
    onRemove = (color) => {
        this.props.removeColor(color)
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        let sorted = arrayMoveImmutable(this.props.palette, oldIndex, newIndex)
        this.props.onSort(sorted);
    };
    render() {
        return (
            <DraggableGrid onRemove={this.onRemove} axis='xy' palette={this.props.palette} onSortEnd={this.onSortEnd} />
        );
    }
}

export default DraggableContainer;