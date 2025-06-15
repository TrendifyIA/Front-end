/**
 * @file CampoTutorial.jsx
 * @author Jennyfer Jasso, Pablo Alonso
 * @description Componente auxiliar utilizado para mostrar información estática en formato de etiqueta-valor,
 *              dentro del flujo de tutorial. Soporta campos de una o varias líneas.
 */

/**
 * Componente CampoTutorial
 *
 * @param {Object} props
 * @param {string} props.label - Etiqueta descriptiva del campo.
 * @param {string|number} props.valor - Valor asociado al campo.
 * @param {boolean} [props.multiline=false] - Si es true, se muestra en bloque multilinea.
 * @param {number} [props.cols=1] - Número de columnas a ocupar (1 o 2).
 * @returns {JSX.Element} Campo formateado visualmente.
 */

const CampoTutorial = ({ label, valor, multiline = false, cols = 1 }) => {
  return (
    <div className={`col-span-${cols}`}>
      <label className="block text-sm font-medium mb-1">{label}:</label>
      {multiline ? (
        // Campo multilinea con scroll
        <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 whitespace-pre-wrap overflow-auto max-h-60">
          {valor}
        </div>
      ) : (
        // Campo de una sola línea con truncamiento si es muy largo
        <div
          className="w-full border rounded px-3 py-2 text-sm bg-gray-50 truncate"
          title={valor}
        >
          {valor}
        </div>
      )}
    </div>
  );
};

export default CampoTutorial;
