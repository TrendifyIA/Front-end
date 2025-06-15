/**
 * @file Campo.jsx
 * @description Componente de campo de texto reutilizable, editable o solo lectura, con soporte para multilinea y estilos dinámicos.
 * 
 * @author Jennyfer Jasso
 */

/**
 * @param {Object} props
 * @param {string} props.label - Etiqueta descriptiva del campo.
 * @param {string|number} props.valor - Valor asociado al campo.
 * @param {boolean} [props.multiline=false] - Si es true, se muestra en bloque multilinea.
 * @param {number} [props.cols=1] - Número de columnas a ocupar (1 o 2).
 * @param {boolean} [props.editable=false] - Si es true, el campo es editable.
 * @param {boolean} [props.cambio=false] - Si es true, aplica estilos de cambio.
 * @param {string} [props.name] - Nombre del campo (para formularios).
 * @param {function} [props.onChange] - Manejador de cambio para campos editables.
 * @returns {JSX.Element} Campo formateado visualmente.
 */

const Campo = ({
  label,
  valor,
  multiline = false,
  cols = 1,
  editable = false,
  cambio = false,
  name,
  onChange,
  type,
}) => {
  let input;

  const inputClassname = `border-2 rounded-[5px] p-2 w-full transition-all duration-200 focus:outline-none focus:[border-color:#02245a]
            ${type === "number" ? "pl-8 pr-3 py-2" : ""}
            ${
              cambio
                ? "[border-color:#02245a] bg-blue-50"
                : "border-neutral-400 bg-white"
            }
          `;

  if (type === "number") {
    input = (
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
          $
        </span>
        <input
          name={name}
          value={valor}
          onChange={onChange}
          type="number"
          min="0"
          step="0.01"
          className={inputClassname}
          placeholder="0.00"
        />
      </div>
    );
  } else if (type === "date") {
    input = (
      <input
        name={name}
        value={valor}
        onChange={onChange}
        className={inputClassname}
        type="date"
      />
    );
  } else {
    input = (
      <input
        name={name}
        value={valor}
        onChange={onChange}
        className={inputClassname}
        style={{
          minHeight: "40px",
          maxHeight: "80px",
        }}
      />
    );
  }

  return (
    <div className={`col-span-${cols} h-full flex flex-col`}>
      <label className="font-medium mb-2 block">{label}:</label>
      {editable && multiline ? (
        // Campo editable multilinea con detección de cambios
        <textarea
          name={name}
          value={valor}
          onChange={onChange}
          className={`border-2 rounded-[5px] p-2 w-full resize-y transition-all duration-200 focus:outline-none focus:[border-color:#02245a]
            ${
              cambio
                ? "[border-color:#02245a] bg-blue-50"
                : "border-neutral-400 bg-white"
            }
          `}
          style={{
            minHeight: "170px",
            maxHeight: "180px",
          }}
        />
      ) : editable ? (
        // Campo editable de una sola línea con detección de cambios
        input
      ) : multiline ? (
        // Visualización de campo multilinea
        <div
          className="border-2 border-neutral-400 p-2 rounded-[5px] bg-gray-50 w-full overflow-auto whitespace-pre-wrap"
          style={{
            minHeight: "170px",
            maxHeight: "180px",
          }}
        >
          {valor}
        </div>
      ) : (
        // Visualización de campo de una sola línea
        <div
          className="border-2 border-neutral-400 p-2 rounded-[5px] bg-gray-50"
          title={valor}
          style={{
            minHeight: "40px",
            maxHeight: "120px",
          }}
        >
          {valor}
        </div>
      )}
    </div>
  );
};

export default Campo;
