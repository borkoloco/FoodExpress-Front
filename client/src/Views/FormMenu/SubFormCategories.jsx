import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const SubFormCategories = ({ isOpen, onRequestClose }) => {
  const especialidades = [
    { idEspecialidad: 1, NombreEspecialidad: "Tradicional" },
    { idEspecialidad: 2, NombreEspecialidad: "Vegetariano" },
    { idEspecialidad: 3, NombreEspecialidad: "Libre de glúten" },
  ];
  //   const [especialidades, setEspecialidades] = useState([]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");

  //   useEffect(() => {
  //     // Obtener las especialidades al cargar el componente
  //     axios
  //       .get("/api/especialidades")
  //       .then((response) => setEspecialidades(response.data))
  //       .catch((error) => console.error(error));
  //   }, []);

  const handleGuardar = async (idEspecialidad, NombreEspecialidad) => {
    try {
      await axios.post("/api/especialidades", {
        idEspecialidad,
        NombreEspecialidad,
      });
      // Vuelve a cargar las especialidades después de guardar/modificar
      const response = await axios.get("/api/especialidades");
      setEspecialidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ejemplo de Modal"
    >
      <div>
        <h1>Especialidades</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad) => (
              <tr key={especialidad.idEspecialidad}>
                <td>{especialidad.idEspecialidad}</td>
                <td>
                  <input
                    type="text"
                    value={especialidad.NombreEspecialidad}
                    onChange={(e) =>
                      handleGuardar(especialidad.idEspecialidad, e.target.value)
                    }
                  />
                </td>
                <td>
                  {/* Puedes agregar botones para otras acciones si es necesario */}
                </td>
              </tr>
            ))}
            <tr>
              <td>Nuevo</td>
              <td>
                <input
                  type="text"
                  value={nuevaEspecialidad}
                  onChange={(e) => setNuevaEspecialidad(e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleGuardar(null, nuevaEspecialidad)}>
                  Guardar Nuevo
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={onRequestClose}>Cerrar modal</button>
      </div>
    </Modal>
  );
};

export default SubFormCategories;
