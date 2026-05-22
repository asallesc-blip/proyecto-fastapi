import { useState } from 'react'
import api from '../services/api'

const PersonaForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/personas/', form)
      alert('✅ Persona guardada correctamente')
      // Limpiar formulario después de guardar
      setForm({ nombre: '', apellido: '', email: '', telefono: '', fecha_nacimiento: '' })
      // Actualizar lista automáticamente
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error)
      alert('❌ Error: ' + (error.response?.data?.detail || 'Revisa los datos ingresados'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Agregar Nueva Persona</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="fecha_nacimiento"
          value={form.fecha_nacimiento}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Guardar Persona
      </button>
    </form>
  )
}

export default PersonaForm