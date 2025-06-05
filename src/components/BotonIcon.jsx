/**
 * @file BotonIcon.jsx
 * @author Min Che Kim, ...
 * @description Componente de botón que muestra un icono y un texto.
 */

/**
 * Componente de botón que combina un icono y texto
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClick - Función a ejecutar cuando se hace clic en el botón
 * @param {string} props.className - Clases CSS para estilizar el botón
 * @param {React.ComponentType} props.icon - Componente de icono a renderizar (ej: un icono de react-icons)
 * @param {string} props.iconStyle - Clases CSS para estilizar el icono
 * @param {string} props.nombre - Texto a mostrar junto al icono
 * @returns {JSX.Element} Botón con icono y texto
 */
const BotonIcon = (props) => {
  // console.log(props);
  return (
    <button onClick={props.onClick} className={props.className}>
      <props.icon className={props.iconStyle} /> {props.nombre}
    </button>
  );
};

export default BotonIcon;