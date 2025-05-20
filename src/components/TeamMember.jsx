const TeamMember = ({ name, email, degree, photo }) => (
    <div className="bg-blue-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
        <img 
          src={photo} 
          alt={`Foto de ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-black">{name}</h3>
        <p className="text-black mt-1">{email}</p>
        <p className="text-black mt-2 font-medium">{degree}</p>
      </div>
    </div>
  );
  
  export default TeamMember;