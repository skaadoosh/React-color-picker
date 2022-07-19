import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    const newPalette = {
        ...starterPalette,
        colors: {}
    };
    for (let level of levels) {
        newPalette.colors[level] = []
    }
    for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse()
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')
            })
        }
    }
    return newPalette
}

function getRange(hexColor) {
    return [
        chroma(hexColor).darken(1.5).hex(),
        hexColor,
        '#fff'
    ]
}

function generateScale(hexColor, numberofScales) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberofScales)
}

export default generatePalette