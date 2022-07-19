import { useState } from "react";
import Palette from "./Palette";
import seedColor from "./seedColor";
import PaletteList from "./PaletteList";
import Morepalette from "./Morepalette";
import NewPaletteForm from "./NewPaletteForm";
import './App.css'
import generatePalette from "./colorHelper";
import { Routes, Route } from "react-router-dom";



function App() {

  const [palettes, setPalette] = useState(seedColor)

  function findPalette(pId) {
    return palettes.filter(f => (f.id === pId))
  }

  const routes = (
    palettes.map(p => {
      let id = p.id
      let palette = findPalette(id)
      return <Route key={id} path={`/palette/${id}`}
        element={<Palette  {...generatePalette(palette[0])} />} />
    })
  )

  function addPalette(newPalette) {
    setPalette([...palettes, newPalette])
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/React-color-picker" element={<PaletteList palettes={palettes} />} />
        <Route path="/newpalette" element={<NewPaletteForm addPalette={addPalette} palettes={palettes} />} />
        <Route path="/palette/:pid/:id" element={<Morepalette palettes={palettes} />} />
        {routes}
      </Routes>
    </div>
  );
}

export default App;
