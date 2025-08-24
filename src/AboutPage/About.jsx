import aboutImage from "../assets/about_us2.jpg";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import Balatro from "../components/ui/Balatro.jsx";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials.jsx";
import { GenerateAllTeams } from "./TeamCard.jsx";
import SplitText from "../components/ui/SplitText.jsx";
import CustomCarousel from "./CustomCarousel.jsx";
import amintaPhoto from "./mtc-members-photos/testemonial-photos/Aminta.jpg";
import chhaviPhoto from "./mtc-members-photos/testemonial-photos/Chhavi.jpg";
import priyanshuPhoto from "./mtc-members-photos/testemonial-photos/Priyanshu.jpg";
import smredhiPhoto from "./mtc-members-photos/testemonial-photos/Smredhi.jpeg";
import surajPhoto from "./mtc-members-photos/testemonial-photos/Suraj.jpg";
import tanishaPhoto from "./mtc-members-photos/testemonial-photos/Tanisha.jpg";

const About = () => {
  const {
    isOpen: isCouncilModalOpen,
    onOpen: onCouncilModalOpen,
    onOpenChange: onCouncilModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAmbassadorModalOpen,
    onOpen: onAmbassadorModalOpen,
    onOpenChange: onAmbassadorModalOpenChange,
  } = useDisclosure();

  // Handle hash scrolling on page load
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          // Use multiple attempts to ensure scrolling works on mobile
          const scrollToElement = (attempt = 0) => {
            setTimeout(() => {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              // Additional fallback for mobile
              setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                window.scrollTo({
                  top: elementTop - 100, // Account for any fixed headers
                  behavior: "smooth",
                });
              }, 100);
            }, 200 + attempt * 100);

            // Retry if not scrolled properly
            if (attempt < 3) {
              setTimeout(() => {
                const currentPos = window.scrollY;
                const targetPos = element.offsetTop - 100;
                if (Math.abs(currentPos - targetPos) > 50) {
                  scrollToElement(attempt + 1);
                }
              }, 500 + attempt * 200);
            }
          };

          scrollToElement();
        }
      }
    };

    // Handle hash on initial load
    handleHashScroll();

    // Handle hash changes (if user navigates with hash)
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const testimonials = [
    {
      quote:
        "Being part of the program was an amazing experience. At first, stepping out of my comfort zone felt daunting, but it quickly became worthwhile. I enjoyed making content, drafting social media posts, and trying out new platforms. Working on different tasks boosted my confidence and creativity with tools. The best part was being part of a friendly, supportive group where I made new friends and gained skills that I will use for a long time. I highly recommend this program to anyone looking to grow and make great friends :)",
      name: "Aminta Binu Thomas",
      designation: "Marketing Ambassador",
      src: amintaPhoto,
    },
    {
      quote:
        "The Ambassadorship Program gave me a front-row seat to understanding how a club truly functions. I used to think it was all about professionalism, but being an MTC Ambassador felt more like being part of a close-knit friend group than just a tech club — it felt like family. I gained hands-on experience that helped me grow both personally and professionally.",
      name: "Chhavi",
      designation: "Technical & Creative Ambassador",
      src: chhaviPhoto,
    },
    {
      quote:
        "As a first year student, working as the Creative Ambassador helped me not only improve my skills in the creative role, but also gave me a chance to explore skills outside it.  The Council was extremely supportive and provided me with the right feedback and encouragement that pushed me to go into other roles throughout my time as a fresher. I would always be grateful for MTC and their Ambasadorship Program for helping me find my way through college clubs/events as a first year!!",
      name: "Smredhi Shankar",
      designation: "Creative Ambassador",
      src: smredhiPhoto,
    },
    {
      quote:
        "The Ambassadorship Program gave me the chance to represent my club, learn leadership skills and connect with amazing people. It’s a great way to grow personally and professionally.",
      name: "Tanisha Handa",
      designation: "Technical Ambassador",
      src: tanishaPhoto,
    },
    {
      quote:
        "I am thrilled to share my experience as a proud member of the Ambassadorship Program of MTC. This opportunity has been an incredible journey filled with many valuable learning experiences, growth and fun moments with the council. I can positively say that the members of the council guided me throughout my shortcomings and profoundly impacted my personal and professional development. I would definitely recommend freshers to join the Ambassadorship Program.",
      name: "Suraj Kumar Singh ",
      designation: "Marketing Ambassador",
      src: surajPhoto,
    },
    {
      quote:
        "The MTC ambassadorship programme helped me improve my technical skills & gain practical experience and the confidence I needed by being involved in various events of the club. I got to learn & assist in the development of coding questions & programming puzzles for many different tasks & competitions too.",
      name: "Priyanshu Kumar Singh ",
      designation: "Technical Ambassador",
      src: priyanshuPhoto,
    },
  ];

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white overflow-hidden">
      {/* // <div className="relative min-h-screen w-full overflow-hidden"> */}
      <div className="fixed inset-0 z-0 h-screen w-full opacity-100">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#000000"
          color2="#0a0a0a"
          color3="#111111"
        />
      </div>
      {/* Banner Image */}
      <div className="relative z-10 w-full bg-transparent flex flex-col items-center">
        {/* <div className="max-w-7xl mx-auto px-4 w-full">
          <img
            src={aboutImage}
            alt="About Us"
            className="max-h-[500px] object-cover mb-10 mt-10 rounded-2xl border-2 mx-auto"
          />
        </div> */}

        {/* About Section */}
        {/* <section className="w-full max-w-3xl px-4 flex flex-col items-center text-center mb-12"> */}
        <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-2 mt-20">
          <SplitText
            text="About Us"
            className="text-6xl font-bold text-center mb-4"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            // onLetterAnimationComplete={handleAnimationComplete}
          />
          <SplitText
            text="The Microsoft Tech Club is a student-led organization dedicated to fostering a community of like-minded individuals passionate about technology and innovation. Our goal is to provide members with opportunities to learn, grow, and connect with each other. Join us today and become a part of this exciting community!"
            className="text-2xl font-light text-center"
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
          {/* <SplitText
            text="Meet the minds driving innovation and community at Microsoft Tech Club."
            className="text-2xl font-semibold text-center pt-10"
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
          /> */}
        </section>

        {/* <CustomCarousel /> */}

        <div className="w-full max-w-7xl mx-auto px-4">
          <GenerateAllTeams />
        </div>

        <section
          id="AmbassadorSection"
          className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-10 mt-10">
            Your journey starts here — council or ambassador, take the gear.
          </h2>
          <div className="flex flex-row gap-x-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{
                y: 2,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >
              <Button
                radius="full"
                className="w-full sm:w-auto border border-white focus:ring-2 focus:outline-none focus:ring-white/40 font-semibold transition-colors duration-300 ease-in-out bg-white text-black px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 rounded-lg text-sm sm:text-base md:text-lg hover:bg-black hover:text-white hover:scale-105"
                onPress={onAmbassadorModalOpen}
              >
                <span className="hidden sm:inline">
                  Ambassador Program (For First Year Students)
                </span>
                <span className="sm:hidden">Ambassador Program</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{
                y: 2,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >
              {/* <Button
                radius="full"
                className="font-semibold bg-purple-900 text-white hover:bg-purple-800 transition-colors duration-300 border-2 border-purple-700"
                onPress={onCouncilModalOpen}
              >
                Join Council
              </Button> */}
            </motion.div>
          </div>

          {/* Ambassador Program Modal */}
          <Modal
            isOpen={isAmbassadorModalOpen}
            onOpenChange={onAmbassadorModalOpenChange}
            size="2xl"
            backdrop="blur"
            className="bg-black text-white"
            classNames={{
              wrapper: "z-[1100]",
              backdrop: "z-[1050]",
              base: "z-[1100] bg-black border border-white/20",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-center">Ambassador Program</h2>
                    <p className="text-sm text-gray-400 text-center">
                      For First Year Students
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    {/* <div className="space-y-4">
                      <p className="text-gray-300">
                        The Microsoft Tech Club Ambassador Program provides an
                        invaluable opportunity for first-year students to
                        actively participate in MTC by assuming the role of a
                        council member in your chosen domain.
                      </p>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          What you'll get:
                        </h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>
                            Leadership experience in your chosen technical
                            domain
                          </li>
                          <li>
                            Direct mentorship from current council members
                          </li>
                          <li>Opportunity to organize events and workshops</li>
                          <li>
                            Build your professional network within the tech
                            community
                          </li>
                          <li>
                            Certificate of participation and recommendation
                            letters
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          Requirements:
                        </h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>Must be a first-year student</li>
                          <li>Passionate about technology and innovation</li>
                          <li>Commitment to attend weekly meetings</li>
                          <li>
                            Willingness to learn and contribute to club
                            activities
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    <p className="text-center text-xl">Coming Soon..</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="text-red-400 hover:bg-red-400/10"
                    >
                      Close
                    </Button>
                    {/* <Button
                      color="primary"
                      onPress={onClose}
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      Apply Now
                    </Button> */}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>

        <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-1 mt-8">
            Past Ambassador Testimonials
          </h2>
          <h2 className="text-3xl md:text-2xl font-medium mb-1 mt-1">
            Don’t take our word for it. Take theirs:
          </h2>
          <div>
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
