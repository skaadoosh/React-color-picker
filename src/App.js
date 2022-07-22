import { useState } from "react";
import Palette from "./routes/palette/Palette";
import seedColor from "./seedColor";
import PaletteList from "./routes/home/PaletteList";
import Morepalette from "./routes/palette/Morepalette";
import NewPaletteForm from "./routes/newpalette/NewPaletteForm";
import './App.css'
import generatePalette from "./colorHelper";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


// function Page(props) => <div className="page"></div> 

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
        element={
          <div className="page">
            <Palette  {...generatePalette(palette[0])} />
          </div>} />
    })
  )

  function addPalette(newPalette) {
    setPalette([...palettes, newPalette])
  }

  const location = useLocation();


  return (
    <div className="App">
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/React-color-picker"
              element={
                <div className="page">
                  <PaletteList palettes={palettes} />
                </div>} />
            <Route path="/newpalette"
              element={
                <div className="page">
                  <NewPaletteForm addPalette={addPalette} palettes={palettes} />
                </div>} />
            <Route path="/palette/:pid/:id"
              element={
                <div className="page">
                  <Morepalette palettes={palettes} />
                </div>} />
            {routes}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
