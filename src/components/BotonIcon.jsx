/**
 * @file BotonIcon.jsx
 * @author Min Che Kim, ...
 * @description Componente de botón que muestra un icono y un texto.
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