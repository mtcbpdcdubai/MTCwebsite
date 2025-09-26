import about_us1 from "../../src/assets/about_us1.jpg";
import about_us2 from "../../src/assets/about_us2.jpg";

const sections = [
  {
    sectionTitle: "Executive Team",
    members: [
      {
        name: "John Smith",
        position: "President",
        image: about_us1,
        linkLinkedIn: "https://linkedin.com/in/johnsmith",
        linkGitHub: "https://github.com/johnsmith",
      },
      {
        name: "Sarah Johnson",
        position: "Vice President",
        image: about_us2,
        linkLinkedIn: "https://linkedin.com/in/sarahjohnson",
        linkInstagram: "https://instagram.com/sarahjohnson",
      },
    ],
  },
  {
    sectionTitle: "Technical Team",
    members: [
      {
        name: "Michael Chen",
        position: "Technical Lead",
        image: about_us1,
        linkGitHub: "https://github.com/michaelchen",
        linkLinkedIn: "https://linkedin.com/in/michaelchen",
      },
      {
        name: "Emily Rodriguez",
        position: "Web Developer",
        image: about_us2,
        linkGitHub: "https://github.com/emilyrodriguez",
        linkLinkedIn: "https://linkedin.com/in/emilyrodriguez",
      },
    ],
  },
];

export default sections;
