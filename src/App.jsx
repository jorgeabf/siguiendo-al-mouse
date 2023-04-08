import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(()=>{
   document.body.classList.toggle('no-cursor',enabled)
   return ()=>{
      document.body.classList.remove('no-cursor')
   }
  },[enabled])

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) { window.addEventListener('pointermove', handleMove) }

    return () => {
      window.removeEventListener('pointermove', handleMove)
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])

  return (
    <main>
      <div className='ball' style={{ transform: `translate(${position.x}px,${position.y}px)` }} />
      <h1>{enabled ? 'Estás' : 'No estás'} siguiendo al mouse</h1>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} Puntero Mouse
      </button>
    </main>
  )
}

export default App
