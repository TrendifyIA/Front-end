/**
 * @file InputPassword.jsx
 * @author Eduardo Rosas
 * @description Se usa para poder ver la contraseña cuando se necesite
 */

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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