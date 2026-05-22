import { useEffect, useState } from 'react'
import api from '../services/api'

const ListaPersonas = () => {
  const [personas, setPersonas] = useState([])
  const [cargando, setCargando] = useState(true)

  // ✅ Función segura y bien estructurada
  const cargarPersonas = async () => {
    try {
      setCargando(true)
      const respuesta = await api.get('/personas/')
      setPersonas(respuesta.data) // ✅ Solo actualizamos aquí
    } catch {
      alert('❌ No se pudo cargar la lista de personas')
    } finally {
      setCargando(false) // ✅ Línea 24 CORREGIDA: siempre se ejecuta al final
    }
  }

  // ✅ useEffect llama a una función interna para evitar actualizaciones síncronas en el propio efecto
  useEffect(() => {
    const cargar = async () => {
      await cargarPersonas()
    }

    cargar()
  }, [])

  const eliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta persona?')) return
    try {
      await api.delete(`/personas/${id}`)
      alert('✅ Persona eliminada correctamente')
      cargarPersonas()
    } catch {
      alert('❌ No se pudo eliminar la persona')
    }
  }

  if (cargando) {
    return <p className="text-center text-gray-500 italic py-6">Cargando lista...</p>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">📋 Lista de Personas</h3>

      {personas.length === 0 ? (
        <p className="text-center text-gray-500 italic py-6">Aún no hay personas registradas</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-700">ID</th>
                <th className="p-3 text-left font-medium text-gray-700">Nombre</th>
                <th className="p-3 text-left font-medium text-gray-700">Apellido</th>
                <th className="p-3 text-left font-medium text-gray-700">Correo</th>
                <th className="p-3 text-center font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {personas.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.apellido}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => eliminar(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListaPersonas