import React from "react";

const boardOfDirectors = [
  {
    name: "Muhammad Sayyam Akram",
    title: "President, PPS",
    affiliation: "PMAS Arid Agriculture University, Rawalpindi",
    img: "/assets/pic1.jpg",
  },
  {
    name: "Prof. Dr. Tanveer Ahmad",
    title: "Director, PNAC - PPS",
    affiliation:
      "Professor & Chairman Department of LPM, PMAS Arid Agriculture University, Rawalpindi",
    img: "/assets/pic4.jpg",
  },
  {
    name: "Prof. Dr. Muhammad Kashif Saleemi",
    title: "Director, PHCC - PPS",
    affiliation:
      "Professor & Chairman Department of Pathology, University of Agriculture, Faisalabad",
    img: "/assets/pic2.jpg",
  },
  {
    name: "Dr. Jibran Hussain",
    title: "Director, PPMC - PPS",
    affiliation:
      "Associate Professor & Chairman Department of Poultry Production, University of Veterinary & Animal Sciences, Lahore",
    img: "/assets/pic5.jpg",
  },
  {
    name: "Dr. Nasir Mukhtar",
    title: "Director, PAC - PPS",
    affiliation: "Associate Professor of Animal Nutrition PMAS Arid Agriculture University, Rawalpindi",
    img: "/assets/pic3.jpg",
  },
  {
    name: "Dr. Farhan Farooq",
    title: "Director, PIEC - PPS",
    affiliation: "CEO KK Chicks & Pharmaceuticals Industry Representative",
    img: "/assets/pic6.jpg",
  },
];

const executiveBoard = [
  {
    name: "Muhammad Sayyam Akram",
    title: "President, PPS",
    affiliation: "PMAS Arid Agriculture University, Rawalpindi",
    img: "/assets/pic1.jpg",
  },
  {
    name: "Muhammad Umair Asghar",
    title: "Secretary General, PPS",
    affiliation: "PhD Scholar, Wroclaw University of Life and Environmental Sciences, Poland",
    img: "/assets/pic66.jpg",
  },
  {
    name: "Ahmad Zaib",
    title: "Secretary Finance, PPS",
    affiliation: "DVM, University of Agriculture, Peshawar",
    img: "/assets/pic22.jpg",
  },
  {
    name: "Aneeqa Imtiaz",
    title: "Research & Academic Coordinator",
    affiliation: "MSc Scholar, Yangzhou University, China",
    img: "/assets/centerpic.jpg",
  },
  {
    name: "Muhammad Hasnat Sajjad",
    title: "Membership & Media Coordinator, PPS",
    affiliation: "Bahauddin Zakariya University, Multan",
    img: "/assets/pic77.jpg",
  },
];

const PersonCard = ({ person, isDirector = true }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={person.img}
        alt={person.name}
        className="w-20 h-20 object-cover rounded-md border border-gray-300"
      />
      <div className="leading-tight">
        <h3 className="font-bold text-sm">
          {person.name}
        </h3>
        <p
          className={`text-red-500 font-semibold text-xs ${
            isDirector ? "uppercase" : ""
          }`}
        >
          {person.title}
        </p>
        <p className="text-xs max-w-[250px]">{person.affiliation}</p>
      </div>
    </div>
  );
};

export default function BoardPage() {
  return (
    <div className="max-w-5xl mx-auto border border-black rounded-lg p-6 font-sans select-none">
      {/* Title Board of Directors */}
      <h2 className="text-center font-bold text-lg mb-8 tracking-widest bg-red-100 py-2 rounded text-red-600">
        BOARD OF DIRECTORS
      </h2>

      {/* Board of Directors Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
        {/* Left column persons */}
        <div>
          {boardOfDirectors
            .filter((_, i) => i % 2 === 0)
            .map((person, idx) => (
              <PersonCard key={idx} person={person} isDirector />
            ))}
        </div>

        {/* Right column persons */}
        <div>
          {boardOfDirectors
            .filter((_, i) => i % 2 === 1)
            .map((person, idx) => (
              <PersonCard key={idx} person={person} isDirector />
            ))}
        </div>
      </div>

      {/* Executive Board Title */}
      <h2 className="text-center font-bold text-lg mb-6 tracking-widest bg-red-100 py-2 rounded text-red-600">
        EXECUTIVE BOARD
      </h2>

      {/* Executive Board Grid */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-8 justify-center">
        {executiveBoard.map((person, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <img
              src={person.img}
              alt={person.name}
              className="w-28 h-28 object-cover rounded-md border border-gray-300 mb-2"
            />
            <h3 className="font-bold text-sm">{person.name}</h3>
            <p className="text-red-500 font-semibold text-xs mb-1">{person.title}</p>
            <p className="text-xs max-w-[200px]">{person.affiliation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
