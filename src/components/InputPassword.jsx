/**
 * @file InputPassword.jsx
 * @author Eduardo Rosas
 * @description Se usa para poder ver la contraseña cuando se necesite
 */

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * InputPassword es un componente controlado para campos de contraseña con un botón para mostrar u ocultar la contraseña.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.value - El valor actual del campo de contraseña.
 * @param {function} props.onChange - Función de devolución de llamada para manejar los cambios en el valor del input.
 * @returns {JSX.Element} El componente de entrada de contraseña renderizado con funcionalidad para mostrar/ocultar.
 */
const InputPassword = ({ value, onChange }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="relative">
      <input
        name="password"
        type={mostrar ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Contraseña"
        className="w-full px-4 py-2 border rounded pr-10"
        required
      />
      <button
        type="button"
        onClick={() => setMostrar(!mostrar)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {mostrar ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default InputPassword;