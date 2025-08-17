import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import sections from "../content/members_2025_26/MembersAndSections";
import aboutImage from "./assets/about_us2.jpg";

const About = () => {
  return (
    <div className="flex flex-col items-center text-center bg-[#1e1e1e] text-white">
      {/* Banner Image */}
      <img
        src={aboutImage}
        alt="About Us"
        className="w-full min-w-[300px] mb-10"
      />

      {/* About Content */}
      <div className="px-4 bg-[#1e1e1e]">
        <ReactTyped
          strings={["About Us"]}
          typeSpeed={100}
          startDelay={100}
          className="text-[2.5rem] md:text-[5rem] mb-10 font-bold"
        />
        <p className="text-lg md:text-2xl text-gray-300 my-5 md:mx-[15%]">
          The Microsoft Tech Club is a student-led organization that is
          dedicated to fostering a community of like-minded individuals who are
          passionate about technology and innovation.
        </p>
        <p className="text-lg md:text-2xl text-gray-300 my-5 md:mx-[15%]">
          Our goal is to provide members with opportunities to learn, grow, and
          connect with each other. Join us today and become a part of this
          exciting community!
        </p>
      </div>

      {/* Council Heading */}
      <h2 className="text-[1.8rem] md:text-[3.5rem] mb-10 mt-14">
        MTC Council 2025-26
      </h2>

      {/* Sections */}
      {sections.map((section) => (
        <div
          className="mb-10 flex flex-col items-center w-full px-4"
          key={section.sectionTitle}
        >
          <h3 className="text-xl md:text-2xl mb-5">{section.sectionTitle}</h3>

          {/* Members Grid */}
          <div
            className={`flex flex-wrap justify-center items-stretch gap-5 max-w-full`}
          >
            {section.members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center w-[150px] md:w-[270px] bg-[#2a2a2a] p-4 rounded-lg transition-colors hover:bg-[#393939]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
                <h4 className="text-sm md:text-lg mt-3">{member.name}</h4>
                <p className="text-sm md:text-lg mt-1">{member.position}</p>

                {/* Social Icons */}
                <div className="flex gap-3 mt-2">
                  {member.linkInstagram && (
                    <a
                      href={member.linkInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-[#0078D7] transition-colors"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.linkLinkedIn && (
                    <a
                      href={member.linkLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-[#0078D7] transition-colors"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {member.linkGitHub && (
                    <a
                      href={member.linkGitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-[#0078D7] transition-colors"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
