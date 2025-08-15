const boardMembers = [
  {
    name: "Muhammad Sayyam Akram",
    position: "President, PPS",
    affiliation: "PMAS Arid Agriculture University, Rawalpindi",
    image: "/assets/pic1.jpg", // Removed "public" prefix
  },
  {
    name: "Prof. Dr. Tanveer Ahmad",
    position: "Director, PNAC - PPS",
    affiliation:
      "Professor & Chairman Department of LPM, PMAS Arid Agriculture University, Rawalpindi",
    image: "/assets/pic4.jpg",
  },
  {
    name: "Prof. Dr. Muhammad Kashif Saleemi",
    position: "Director, PHCC - PPS",
    affiliation:
      "Professor & Chairman Department of Pathology, University of Agriculture, Faisalabad",
    image: "/assets/pic2.jpg",
  },
  {
    name: "Dr. Jibran Hussain",
    position: "Director, PPMC - PPS",
    affiliation:
      "Associate Professor & Chairman Department of Poultry Production, University of Veterinary & Animal Sciences, Lahore",
    image: "/assets/pic5.jpg",
  },
  {
    name: "Dr. Nasir Mukhtar",
    position: "Director, PAC - PPS",
    affiliation:
      "Associate Professor of Animal Nutrition PMAS Arid Agriculture University, Rawalpindi",
    image: "/assets/pic3.jpg",
  },
  {
    name: "Dr. Farhan Farooq",
    position: "Director, PIEC - PPS",
    affiliation: "CEO KK Chicks & Pharmaceuticals Industry Representative",
    image: "/assets/pic6.jpg",
  },
];
export default function BoardOfDirectors() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6 sm:px-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Board of Directors
          </h1>
          <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {boardMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              {/* Image container */}
              <div className="w-full h-[350px] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}

                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Content */}
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-1 bg-pink-500 mr-2"></div>
                  <p className="text-sm font-semibold text-pink-600">{member.position}</p>
                </div>
                <p className="text-xs text-gray-600">{member.affiliation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}