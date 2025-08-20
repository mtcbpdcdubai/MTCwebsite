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
import Balatro from "../components/ui/Balatro.jsx";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials.jsx";
import { GenerateAllTeams } from "./TeamCard.jsx";
import SplitText from "../components/ui/SplitText.jsx";
import CustomCarousel from "./CustomCarousel.jsx";

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

  const testimonials = [
    {
      quote:
        "This past semester, being the Creative Ambassador at MTC has been an incredibly rewarding experience. It has offered various opportunities for personal growth and skill development. I was able to understand the functioning of the club and collaborate with an amazing team. All the council members were always so supportive and motivating, that working on all the assigned tasks was genuinely enjoyable. Overall, this program has broadened my horizons and bolstered my confidence and I'd highly recommend this program for anyone looking to elevate themselves personally and professionally.",
      name: "Ameiya Wankhede",
      designation: "2nd Year",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I am thrilled to share my experience as a proud member of the Ambassadorship Program of MTC. This opportunity has been an incredible journey filled with many valuable learning experiences, growth and fun moments with the council. I can positively say that the members of the council guided me throughout my shortcomings and profoundly impacted my personal and professional development. I would definitely recommend freshers to join the Ambassadorship Program.",
      name: "Siddhi Mishra",
      designation: "2nd Year",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The MTC ambassadorship programme helped me improve my technical skills & gain practical experience and the confidence I needed by being involved in various events of the club. I got to learn & assist in the development of coding questions & programming puzzles for many different tasks & competitions too.",
      name: "Vania Roy",
      designation: "2nd Year",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

        <div className="max-w-7xl mx-auto px-4 w-full">
          <img
            src={aboutImage}
            alt="About Us"
            className="max-h-[500px] object-cover mb-10 mt-10 rounded-2xl border-2 mx-auto"
          />
        </div>

        <CustomCarousel />

        {/* About Section */}
        {/* <section className="w-full max-w-3xl px-4 flex flex-col items-center text-center mb-12"> */}
        <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-2 mt-4">
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
            text="The Microsoft Tech Club is a student-led organization dedicated to fostering a community of like-minded individuals passionate about technology and innovation."
            className="text-2xl font-semibold text-center mb-4"
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
          <SplitText
            text="Our goal is to provide members with opportunities to learn, grow, and connect with each other. Join us today and become a part of this exciting community!"
            className="text-2xl font-semibold text-center mb-4"
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
        </section>

        <div className="w-full max-w-7xl mx-auto px-4">
          <GenerateAllTeams />
        </div>

        <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-8">
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
                className="font-semibold bg-purple-900 text-white hover:bg-purple-800 transition-colors duration-300 border-2 border-purple-700"
                onPress={onAmbassadorModalOpen}
              >
                Ambassador Program (For First Year Students)
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
                    <h2 className="text-2xl font-bold">Ambassador Program</h2>
                    <p className="text-sm text-gray-400">
                      For First Year Students
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <div className="space-y-4">
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
                    </div>
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
                    <Button
                      color="primary"
                      onPress={onClose}
                      className="bg-purple-900 hover:bg-purple-800 text-white"
                    >
                      Apply Now
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>

        <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-0.5">
          <h2 className="text-3xl md:text-5xl font-bold mb-1 mt-8">
            Past Ambassador Testimonials
          </h2>
          <h2 className="text-3xl md:text-2xl font-bold mb-1 mt-1">
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