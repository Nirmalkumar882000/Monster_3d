import './App.css'
import { Canvas } from '@react-three/fiber'
import Experiance from './componets/Experiance'

function App() {


  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experiance/>
    </Canvas>
    
  )
}

export default App
