import MissionVision from '../components/MissionVision';
import Strengths from '../components/Strengths';
import TeamMember from '../components/TeamMember';

// Imagenes de los miembros del equipo
import YaelPhoto from '../assets/images/profile.jpg';
import EduardoPhoto from '../assets/images/profile.jpg';
import MinChePhoto from '../assets/images/profile.jpg';
import AndreaPhoto from '../assets/images/profile.jpg';
import KevinPhoto from '../assets/images/profile.jpg';
import FernandaPhoto from '../assets/images/profile.jpg';
import SandraPhoto from '../assets/images/profile.jpg';
import IanPhoto from '../assets/images/profile.jpg';
import PabloPhoto from '../assets/images/profile.jpg';
import JennyferPhoto from '../assets/images/profile.jpg';
import IgnacioPhoto from '../assets/images/profile.jpg';

const AboutUsPage = () => {
  const team = [
    { name: "Yael Octavio Pérez Méndez", email: "A01700000@tec.mx", degree: "ITC", photo: YaelPhoto },
    { name: "José Eduardo Rosas Ponciano", email: "A01700000@tec.mx", degree: "ITC", photo: EduardoPhoto },
    { name: "Min Che Kim", email: "A01700000@tec.mx", degree: "ITC", photo: MinChePhoto },
    { name: "Andrea Doce Murillo", email: "A01700000@tec.mx", degree: "ITC", photo: AndreaPhoto },
    { name: "Kevin Santiago Castro Torres", email: "A01700000@tec.mx", degree: "ITC", photo: KevinPhoto },
    { name: "Fernanda Ponce Maciel", email: "A01700000@tec.mx", degree: "ITC", photo: FernandaPhoto },
    { name: "Sandra Paulina Herrera Rebolledo", email: "A01700000@tec.mx", degree: "ITC", photo: SandraPhoto },
    { name: "Ian Alexei Martínez Armendáriz", email: "A01700000@tec.mx", degree: "ITC", photo: IanPhoto },
    { name: "Pablo Alonso Galván", email: "A01700000@tec.mx", degree: "ITC", photo: PabloPhoto },
    { name: "Jennyfer Nahomi Jasso Hernández", email: "A01700000@tec.mx", degree: "ITC", photo: JennyferPhoto },
    { name: "Ignacio Solís Montes", email: "A01700000@tec.mx", degree: "ITC", photo: IgnacioPhoto },
  ];

  return (
    <div className="bg-blue-200 min-h-screen py-16 px-4 text-black">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-6xl font-bold text-center mb-16">Nosotros</h1>
        
        <MissionVision />
        <Strengths />

        <section className="mt-20">
          <h2 className="text-6xl font-bold mb-12 text-center">Nuestro Equipo</h2>
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