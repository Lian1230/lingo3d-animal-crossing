import { RefObject, useRef, useState } from 'react'
import { World, Cube, Model, OrbitCamera, useLoop } from 'lingo3d-react'
import './App.css'

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [isWalking, setIsWalking] = useState(false)
  const modelRef = useRef(null)

  const handleClick = (evt) => {
    evt.point.y = 0
    setPosition(evt.point)
    setIsWalking(true)
    modelRef.current.lookAt(evt.point)
  }

  const handleIntersect = () => {
    setIsWalking(false)
  }

  useLoop(() => {
    modelRef.current.moveForward(-1)
  }, isWalking)

  return (
    <World>
      <Cube width={9999} depth={9999} y={-100} onClick={handleClick} />
      <Model
        ref={modelRef}
        src="Fox.fbx"
        animations={{ idle: 'Fox-Idle.fbx', walking: 'Walking.fbx' }}
        animation={isWalking ? 'walking' : 'idle'}
        intersectIDs={['destination']}
        onIntersect={handleIntersect}
      />
      <OrbitCamera active />
      <Cube id="destination" scale={0.5} color="orange" {...position} />
    </World>
  )
}

export default App
