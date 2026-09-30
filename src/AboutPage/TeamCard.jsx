import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import { councilSections } from "./MemberNames";
import SplitText from "../components/ui/SplitText.jsx";

const teamComponents = councilSections.map((section) => ({
  name: section.name,
  component: () => generateTeamByName(section.name),
}));

// Destructure into individual components
const [
  CoreTeamComponent,
  TechnicalTeamComponent,
  DevOpsTeamComponent,
  EventsTeamComponent,
  MediaOperationsTeamComponent,
  MarketingTeamComponent,
  CreativeTeamComponent,
  OutreachTeamComponent,
  CommunitySandboxTeamComponent,
  FacultyInChargeComponent,
] = teamComponents.map((item) => item.component);

// Create AllTeams array
const AllTeams = teamComponents.map((item) => item.component);

const getInitials = (name) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const MemberCard = ({ member }) => {
  return (
    <CardContainer className="inter-var border-3 rounded-2xl">
      <CardBody className="bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-64 h-84 rounded-xl p-4 border flex flex-col items-center">
        <CardItem translateZ="100" className="w-full flex justify-center mb-3">
          {member.image ? (
            <img
              src={member.image}
              height="160"
              width="160"
              className="h-44 w-44 object-cover rounded-full group-hover/card:shadow-xl border-2"
              style={{
                borderColor: `#${member.borderColor}`,
                objectPosition: member.imagePosition || "center",
              }}
              alt={member.title}
            />
          ) : (
            <div
              className="h-44 w-44 rounded-full border-2 flex items-center justify-center text-3xl font-bold text-white group-hover/card:shadow-xl"
              style={{ borderColor: `#${member.borderColor}`, background: member.gradient }}
            >
              {getInitials(member.title)}
            </div>
          )}
        </CardItem>

        <CardItem
          translateZ="50"
          className="text-lg font-bold text-white text-center mb-0"
        >
          {member.title}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-base font-semibold text-center mb-4 flex-grow"
        >
          {member.subtitle}
        </CardItem>

        <CardItem
          translateZ="80"
          className="flex justify-center space-x-4 mt-auto"
        >
          {member.instagram && (
            <a
              href={member.instagram}
              className="text-neutral-600 dark:text-neutral-300 hover:text-purple-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={22} />
            </a>
          )}
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              className="text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={22} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              className="text-neutral-600 dark:text-neutral-300 hover:text-gray-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={22} />
            </a>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export const generateTeamByName = (teamName) => {
  const section = councilSections.find((s) => s.name === teamName);
  if (!section) {
    return <div className="text-white text-center">Team not found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      {" "}
      {/* Centered container with padding */}
      <h2 className="text-4xl font-bold text-white text-center mb-10 w-full">
        {teamName}
      </h2>
      <div className="w-full flex flex-col items-center px-4 ">
        <div className="flex flex-wrap justify-center gap-6 max-w-7xl">
          {section.team.map((member, index) => (
            <div key={index}>
              {" "}
              {/* Centered cell */}
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GenerateAllTeams = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-2 py-8">
      <SplitText
            text="Meet the minds driving innovation and community at Microsoft Tech Club."
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="lines"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            // onLetterAnimationComplete={handleAnimationComplete}
          />
      {councilSections.map((section) => (
        <div key={section.name} className="w-full">
          {generateTeamByName(section.name)}
        </div>
      ))}
    </div>
  );
};

export default generateTeamByName;
