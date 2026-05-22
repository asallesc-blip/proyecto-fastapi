import { useState } from 'react'
import PersonaForm from './components/PersonaForm'
import ListaPersonas from './components/ListaPersonas'

function App() {
  const [actualizar, setActualizar] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Gestión de Personas 📋</h1>

      <PersonaForm onSuccess={() => setActualizar(prev => prev + 1)} />
      <ListaPersonas key={actualizar} />
    </div>
  )
}

export default App