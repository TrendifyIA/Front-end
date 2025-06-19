/**
 * @file AboutUsPage.jsx
 * @author Pablo Alonso
 * @description Página "Sobre Nosotros" que muestra la misión, visión, fortalezas y miembros del equipo.
 *
 * @component
 * @returns {JSX.Element} Componente de la página "Sobre Nosotros".
 *
 * @example
 * // Uso en rutas de React Router
 * <Route path="/about" element={<AboutUsPage />} />
 *
 * @remarks
 * Este componente importa y utiliza los componentes MissionVision, Strengths y TeamMember para mostrar la información relevante del equipo.
 * Las imágenes de los miembros del equipo se importan desde la carpeta de assets.
 */
import MissionVision from "../components/MissionVision";
import Strengths from "../components/Strengths";
import TeamMember from "../components/TeamMember";
// Imagenes de los miembros del equipo
import YaelPhoto from "../assets/images/Yael.png";
import EduardoPhoto from "../assets/images/Eduardo.png";
import MinChePhoto from "../assets/images/MinChe.png";
import AndreaPhoto from "../assets/images/Andrea.png";
import KevinPhoto from "../assets/images/Kevin.png";
import FernandaPhoto from "../assets/images/Fernanda.png";
import SandraPhoto from "../assets/images/Sandra.png";
import IanPhoto from "../assets/images/Alexei.png";
import PabloPhoto from "../assets/images/Pablo.png";
import JennyferPhoto from "../assets/images/Jennyfer.png";
import IgnacioPhoto from "../assets/images/Ignacio.png";

const AboutUsPage = () => {
  const team = [
    {
      name: "Yael Octavio Pérez Méndez",
      email: "A01799842@tec.mx",
      degree: "ITC",
      photo: YaelPhoto,
    },
    {
      name: "José Eduardo Rosas Ponciano",
      email: "A01784461@tec.mx",
      degree: "ITC",
      photo: EduardoPhoto,
    },
    {
      name: "Min Che Kim",
      email: "A01750338@tec.mx",
      degree: "ITC",
      photo: MinChePhoto,
    },
    {
      name: "Andrea Doce Murillo",
      email: "A01799931@tec.mx",
      degree: "ITC",
      photo: AndreaPhoto,
    },
    {
      name: "Kevin Santiago Castro Torres",
      email: "A01798925@tec.mx",
      degree: "ITC",
      photo: KevinPhoto,
    },
    {
      name: "Fernanda Ponce Maciel",
      email: "A01799293@tec.mx",
      degree: "ITC",
      photo: FernandaPhoto,
    },
    {
      name: "Sandra Paulina Herrera Rebolledo",
      email: "A01798452@tec.mx",
      degree: "ITC",
      photo: SandraPhoto,
    },
    {
      name: "Ian Alexei Martínez Armendáriz",
      email: "A01753288@tec.mx",
      degree: "ITC",
      photo: IanPhoto,
    },
    {
      name: "Pablo Alonso Galván",
      email: "A01748288@tec.mx",
      degree: "ITC",
      photo: PabloPhoto,
    },
    {
      name: "Jennyfer Nahomi Jasso Hernández",
      email: "A01749898@tec.mx",
      degree: "ITC",
      photo: JennyferPhoto,
    },
    {
      name: "Ignacio Solís Montes",
      email: "A01751213@tec.mx",
      degree: "ITC",
      photo: IgnacioPhoto,
    },
  ];

  return (
    <div className="bg-blue-200 min-h-screen py-16 px-4 text-black">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-6xl font-bold text-center mb-16">Nosotros</h1>

        <MissionVision />
        <Strengths />

        <section className="mt-20">
          <h2 className="text-6xl font-bold mb-12 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                email={member.email}
                degree={member.degree}
                photo={member.photo}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
