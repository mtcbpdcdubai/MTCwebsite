import React, { useState, useEffect, useRef } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import Balatro from "../components/ui/Balatro.jsx";
import {
  CardBody as Card3DBody,
  CardContainer,
  CardItem,
} from "../components/ui/3d-card";
import CardSpotlight from "../components/CardSpotlight.jsx";
import CanvasRevealEffect from "../components/CanvasRevealEffect.jsx";
import CustomPartnershipForm from "../components/CustomPartnerShipForm.jsx";
// import emailjs from "emailjs-com";
import InfiniteScrollTestimonials from "../components/InfiniteScrollTestimonials";

// Import partner logos
import hpLogo from "../assets/Partners/hp.png";
import ciscoLogo from "../assets/Partners/cisco.png";
import lablabAILogo from "../assets/Partners/lablabAI.png";
import weDesiLogo from "../assets/Partners/weDesi.png";
import ubmLogo from "../assets/Partners/UBM.png";
import descoLogo from "../assets/Partners/desco.png";
import sukarLogo from "../assets/Partners/sukar.png";
import burgerLogo from "../assets/Partners/burger.png";
import smartlifeLogo from "../assets/Partners/smartlife.png";

const AnimatedCounter = ({
  targetValue,
  suffix = "",
  label,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetValue, duration]);

  return (
    <div ref={counterRef} className="text-center">
      <Card className="bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-60 md:h-60 rounded-xl border flex items-center justify-center">
        <CardBody className="p-4 text-center flex flex-col items-center justify-center">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-600 dark:text-white mb-2">
            {count}
            {suffix}
          </div>
          <div className="text-neutral-500 dark:text-neutral-300 text-xs md:text-sm whitespace-nowrap">
            {label}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const Partners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { number: 25, suffix: "+", label: "Active Partners" },
    { number: 50, suffix: "+", label: "Projects Delivered" },
    { number: 1000, suffix: "+", label: "Developer Community" },
    { number: 25, suffix: "", label: "Years of Innovation" },
  ];

  const majorEventPartners = [
    {
      id: "urc",
      title: "URC",
      subtitle: "Research",
      stats: "150+ Participants",
      type: "collaboration",
      organization: "University Research Consortium",
      description:
        "Gold Sponsored by Univest Business Machines which is a leading technology solution provider based in Abu Dhabi. Other sponsors include SUKAR, WeDesi, Burger Society",
      achievements: [
        "150+ participants",
        "15+ nationalities",
        "40+ top researchers as judges",
      ],
      impact:
        "This partnership has directly contributed to the advancement of research areas like AI, blockchain, Quantum Computing and IoT technologies, while providing a platform to improve student-led research.",
      duration: "April 2025",
      link: "https://intersys2025.org/#urc",
    },
    {
      id: "hackbot",
      title: "Hack-A-Bot",
      subtitle: "Event Partner",
      stats: "100+ Developers",
      type: "event",
      organization: "Hack-A-Bot Community",
      description:
        "Collaborated with ACM-W BPDC chapter to host Hack-A-Bot which was a large scale community-driven initiative, bringing together developers, designers, and innovators. Sponsers included WeDesi and FLOE",
      achievements: [
        "Organized an event with 100+ active developers",
        "Empowered Women in tech",
        "Brought in 7 Professional Judges working in different sectors",
        "Judges from leading companies like Amazon, FortyGuard, EmiratesNBD",
        "Established mentorship network with industry experts",
      ],
      impact:
        "Hack-A-Bot has democratized access to technology education and created pathways for developers to showcase their skills, find collaborators, and launch innovative projects.",
      duration: "Feb 2025",
      link: "https://www.instagram.com/p/DGKasBTyDDZ/",
    },
    {
      id: "smartlife",
      title: "SmartLife",
      subtitle: "Innovation Partner",
      stats: "200+ Mentees",
      type: "achievement",
      organization: "SmartLife Technologies",
      description:
        "SmartLife partnership focuses on teaching blue collar workers about technology. We collaborated on with SmartLife to provide mentoring sessions and exposure to technology to improve quality of life.",
      achievements: ["Mentored 200+ workers", "Hosted sessions for 3Months+"],
      impact:
        "Our SmartLife initiative has transformed how people see technology by giving them exposure to basic technical solutions needed to make a living.",
      duration: "Feb 2025 - Present",
      link: "https://www.linkedin.com/posts/microsoft-tech-club_mtc-smartlife-smartcomputer-activity-7322230018447736832-YuAR?utm_source=share&utm_medium=member_android&rcm=ACoAAD7lMl8BWpnBHuQORjJ5-hi6FVQN-Lo8b-A",
    },
  ];

  const thankYouPartners = [
    {
      id: "hp",
      logo: hpLogo,
      title: "HP",
      subtitle: "Technology Innovation",
      description: "Computing & Technology Solutions",
    },
    {
      id: "cisco",
      logo: ciscoLogo,
      title: "Cisco",
      subtitle: "Networking Solutions",
      description: "Network Infrastructure & Security",
    },
    {
      id: "lablabAI",
      logo: lablabAILogo,
      title: "lablab.ai",
      subtitle: "AI Innovation Platform",
      description: "Artificial Intelligence & Hackathons",
    },
    {
      id: "WeDesi",
      logo: weDesiLogo,
      title: "WeDesi",
      subtitle: "Culinary Excellence",
      description: "Authentic Indian Food",
    },
    {
      id: "Univest Business Machines",
      logo: ubmLogo,
      title: "Univest Business Machines",
      subtitle: "Technology Solutions Provider",
      description: "Enterprise Technology",
    },
    {
      id: "Desco",
      logo: descoLogo,
      title: "Desco",
      subtitle: "Digital Solutions",
      description: "Software Development",
    },
    {
      id: "Sukar",
      logo: sukarLogo,
      title: "Sukar",
      subtitle: "Sweet Innovation",
      description: "Food & Beverage",
    },
    {
      id: "Burger Society",
      logo: burgerLogo,
      title: "Burger Society",
      subtitle: "Culinary Excellence",
      description: "Food & Hospitality",
    },
  ];

  const testimonials = [
    {
      quote:
        "Their commitment to developer experience mirrors our own. Together, we're building tools that truly make a difference.",
      name: "Alex Kumar",
      initials: "AK",
      position: "Founder, DevTools United",
      company: "DevTools United",
    },
    {
      quote:
        "Smartlife doesn't just provide solutions - they become an extension of your team, invested in your success as much as their own.",
      name: "Jennifer Park",
      initials: "JP",
      position: "VP Innovation, GlobalTech",
      company: "GlobalTech",
    },
    {
      quote:
        "The technical expertise and collaborative spirit of the Smartlife team has been instrumental in our platform's evolution.",
      name: "David Thompson",
      initials: "DT",
      position: "Lead Engineer, CloudSync",
      company: "CloudSync",
    },
    {
      quote:
        "Working with this team has revolutionized how we approach technology partnerships. Their innovation drives our success.",
      name: "Maria Rodriguez",
      initials: "MR",
      position: "CTO, InnovateLabs",
      company: "InnovateLabs",
    },
  ];

  const partnershipOpportunities = [
    {
      title: "Corporate Partnership",
      description:
        "Support our programs and get brand visibility while making a meaningful impact on education.",
      benefits: [
        "Logo placement on materials",
        "Event speaking opportunities",
        "Student networking access",
      ],
    },
    {
      title: "Educational Partnership",
      description:
        "Collaborate with us to provide learning resources and mentoring sessions to students.",
      benefits: [
        "Curriculum development",
        "Organize Guest lectures",
        "Mentorship programs",
      ],
    },
    {
      title: "Technology Partnership",
      description:
        "Provide tools, platforms, or technical expertise to enhance our educational offerings.",
      benefits: [
        "Platform access",
        "Technical workshops",
        "Innovation projects",
      ],
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
        e.target,
        "YOUR_USER_ID" // Replace with your EmailJS User ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          alert("Your partnership inquiry has been sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send your inquiry. Please try again later.");
        }
      );

    e.target.reset();
  };

  return (
    <>
      {/* Balatro Background */}
      <div className="fixed inset-0 -z-10">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#000000"
          color2="#0a0a0a"
          color3="#111111"
        />
      </div>

      <div className="relative min-h-screen text-white">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Together we build,
              <br />
              together we win.
            </h1>
            <Button
              color="default"
              size="lg"
              onPress={() => {
                document.getElementById("partnerships-section").scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="px-8 py-4 text-lg font-medium bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Our Partnerships
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Button>
          </div>
        </section>

        {/* Our Partners Section */}
        <section
          id="partnerships-section"
          className="py-10 md:py-16 px-4 relative z-10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Our Partners
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
              {thankYouPartners.map((partner) => (
                <CardSpotlight key={partner.id} className="h-48 md:h-56">
                  <div className="text-center space-y-4 h-full flex flex-col justify-center">
                    {/* Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center p-3">
                      <img
                        src={partner.logo}
                        alt={partner.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {partner.title}
                      </h3>
                    </div>
                  </div>
                </CardSpotlight>
              ))}
            </div>

            {/* Major Events Partners */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Major Event's Partners
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {majorEventPartners.map((partner, index) => (
                <CardContainer
                  key={partner.id}
                  className="inter-var bg-transparent"
                >
                  <Card3DBody className="bg-black relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[22rem] lg:w-[23rem] h-auto rounded-2xl p-6 flex flex-col items-center justify-center">
                    <CardItem
                      translateZ="50"
                      className="text-2xl font-bold text-neutral-600 dark:text-white mb-4 text-center"
                    >
                      {partner.title}
                    </CardItem>

                    <CardItem
                      translateZ="100"
                      className="w-full mb-4 flex justify-center"
                    >
                      <img
                        src={
                          index === 0
                            ? ubmLogo
                            : index === 1
                            ? weDesiLogo
                            : index === 2
                            ? smartlifeLogo
                            : ""
                        }
                        alt={partner.title}
                        className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-xl"
                      />
                    </CardItem>

                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-neutral-500 text-base max-w-sm mb-4 dark:text-neutral-300 text-left"
                    >
                      {partner.description}
                    </CardItem>

                    <CardItem
                      translateZ="50"
                      className="text-white text-sm mb-1 text-center"
                    >
                      {partner.duration}
                    </CardItem>

                    <CardItem
                      translateZ="50"
                      className="text-gray-400 text-sm mb-4 text-center"
                    >
                      Partners: {partner.stats}
                    </CardItem>
                  </Card3DBody>
                </CardContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-10 md:py-16 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Partnership Opportunities
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 justify-center">
              {partnershipOpportunities.map((opportunity, index) => (
                <CardSpotlight
                  key={index}
                  className="h-64 w-full md:w-[22rem] lg:w-[23rem]"
                >
                  <div className="text-center space-y-4 h-full flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
                      {opportunity.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-300 text-sm">
                      {opportunity.description}
                    </p>
                    <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1">
                      {opportunity.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>

        {/* Join Hands Section */}
        <section className="py-10 md:py-16 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Join Hands.
                <br />
                Make History.
              </h2>
            </div>

            <CustomPartnershipForm onSubmit={sendEmail} />
          </div>
        </section>

        {/* Simple Modal Replacement */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-bladiv70 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 max-w-md w-full mx-4">
              <CardBody className="p-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Partnership Inquiry
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Thank you for your interest in partnering with us! Please
                  contact us at microsofttechclub@dubai.bits-pilani.ac.in to
                  discuss opportunities.
                </p>
                <Button
                  color="primary"
                  onPress={() => setIsModalOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                >
                  Close
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Partners;
