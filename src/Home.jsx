import { useState } from "react";
import Spline from "@splinetool/react-spline";
import React from "react";

// Assets
import imgOffer_workshops from "./assets/home/offer_workshops.jpg";
import imgOffer_speakerSessions from "./assets/home/offer_speaker_sessions.jpg";
import imgOffer_technicalBlogs from "./assets/home/offer_technical_blogs.jpg";
import imgOffer_competitions from "./assets/home/offer_competitions.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

// Components
import LinkButton from "./components/ui/LinkButton.jsx";

import BlurText from "./components/ui/BlurText.jsx";
import { CardBody, CardContainer, CardItem } from "./components/ui/3d-card.jsx";
import Balatro from "./components/ui/Balatro.jsx";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import RotatingText from "./components/ui/RotatingText.jsx";
import MTClogo from "./assets/MTClogo.png";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const [size, setSize] = React.useState("md");
  const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "full",
  ];

  const backdrops = ["blur"];

  const handleOpen = (backdrop, size) => {
    setBackdrop(backdrop);
    setSize(size);
    onOpen();
  };

  return (
    <div className="bg-transparent text-white flex flex-col items-center relative">
      {/* Banner */}
      {/* <div className="h-screen w-full overflow-hidden relative">
        <Spline scene="https://draft.spline.design/LWpJVH6Z3lriwJZk/scene.splinecode" />
      </div> */}
      <div className="h-screen w-full overflow-hidden relative flex flex-col items-center justify-center text-4xl font-semibold">
        <p className="text-6xl">Microsoft Tech Club</p>
        <p className="text-6xl pb-2 font-normal">BITS Pilani Dubai Campus</p>
        <div className="flex items-center pt-10 flex-row">
          <p>Build </p>
          <RotatingText
            className="bg-white text-black mx-2 rounded-lg px-2 py-1"
            texts={["Projects", "Skills", "Connections"]}
          />
        </div>
        <div className="flex items-center mt-10 gap-2 bg-white text-black rounded-3xl px-4 py-3 text-xl">
          <span className="mr-2">Contact Us</span>
          <a
            href="mailto:mtc@bpdc.org"
            className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors rounded-3xl p-2"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://instagram.com/mtcbpdc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors rounded-3xl p-2"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors rounded-3xl p-2"
          >
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>
      </div>
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

      <section className="pt-20 px-4 text-center flex flex-col items-center text-white max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl">
        <BlurText
          text="Why Microsoft Tech Club?"
          className="text-4xl md:text-6xl font-semibold w-full leading-[1]"
          delay={100}
        />
        {/* <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1}
          blurStrength={10}
          containerClassName="mt-6 md:mx-[15%] text-gray-300 text-sm md:text-md"
          // textClassName="text-gray-300 text-2xl md:text-3xl"
        >
          Microsoft Tech Club fosters collaboration through workshops,
          competitions, and events. Whether you’re into web development,
          programming, or data analysis, there’s something here for you.
        </ScrollReveal> */}
        <BlurText
          text="Microsoft Tech Club fosters collaboration through workshops, competitions, and events. Whether you’re into web development, programming, or data analysis, there’s something here for you."
          className="text-2xl md:text-3xl font-normal max-w-7xl leading-[1] p-2"
          delay={150}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 justify-center mx-auto max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl">
          {/* Previous grid layout: grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-x-5 */}
          {[
            {
              img: imgOffer_workshops,
              title: "Workshops",
              link: "/workshops",
            },
            {
              img: imgOffer_speakerSessions,
              title: "Speaker Sessions",
              link: "https://mtcbpdc.org",
            },
            {
              img: imgOffer_technicalBlogs,
              title: "Technical Blogs",
              link: "https://medium.com/@microsofttechclub",
            },
            {
              img: imgOffer_competitions,
              title: "Competitions",
              link: "https://mtcbpdc.org",
            },
          ].map((card, idx) => (
            <CardContainer className="inter-var bg-transparent" key={idx}>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[16rem] lg:w-[17rem] h-auto rounded-2xl p-4 border-2">
                {/* Previous card width: sm:w-[20rem] lg:w-[21rem] */}
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {/* Previous title size: text-2xl */}
                  {card.title}
                </CardItem>

                <CardItem translateZ="100" className="w-full mt-4">
                  {/* Previous image height: h-64 */}
                  <img
                    src={card.img}
                    height="1000"
                    width="1000"
                    className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={card.title}
                  />
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {/* Previous description text size: text-lg */}
                  Explore our {card.title.toLowerCase()} to level up your skills
                  and connect with like-minded individuals.
                </CardItem>

                <div className="flex justify-between items-center">
                  {card.link.startsWith("http") ? (
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={card.link}
                      target="_blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Learn more →
                    </CardItem>
                  ) : (
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      <LinkButton
                        to={card.link}
                        className="w-full h-full cursor-pointer"
                      >
                        Learn more →
                      </LinkButton>
                    </CardItem>
                  )}
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Ambassador Section */}
      <section className="py-20 px-4 text-center flex flex-col items-center bg-transparent rounded-t-lg text-white max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl">
        <BlurText
          text="Student Ambassador Program"
          className="text-4xl md:text-6xl font-semibold w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl"
        />
        {/* <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={1}
          blurStrength={10}
          containerClassName="mt-6 md:mx-[15%] text-gray-300 text-sm md:text-md"
          // textClassName="text-gray-300 text-2xl md:text-3xl"
        >
          MTC Student Ambassador program provides an invaluable opportunity for
          first-year students to actively participate in MTC by assuming the
          role of a council member in your chosen domain.
        </ScrollReveal> */}
        <BlurText
          text="MTC Student Ambassador program provides an invaluable opportunity for first-year students to actively participate in MTC by assuming the role of a council member in your chosen domain."
          className="text-2xl md:text-3xl font-normal max-w-7xl leading-[1] p-2"
          delay={150}
        />

        <LinkButton
          to="/workshops"
          className="mt-10 bg-white text-black px-8 py-4 rounded-lg text-lg transition hover:bg-black hover:text-white hover:scale-105"
        >
          Learn More ➔
        </LinkButton>
        {/* <div className="flex flex-wrap gap-3">
          {backdrops.map((b) => (
            <Button
              key={b}
              className="mt-10 bg-white text-black px-8 py-4 rounded-lg text-lg transition hover:bg-black hover:text-white hover:scale-105"
              color="warning"
              variant="flat"
              onPress={() => handleOpen(b)}
            >
              Learn More ➔
            </Button>
          ))}
        </div>
        <Modal
          backdrop={backdrop}
          size="full"
          isOpen={isOpen}
          onClose={onClose}
          className="bg-black text-gray-100 rounded-xl w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[90vw] max-h-[70vh] z-[1100]"
          classNames={{
            wrapper: "z-[1100]",
            backdrop: "z-[1050]",
            base: "z-[1100]",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h1><span className="text-2xl font-bold">MTC Ambassador Program</span></h1>
                </ModalHeader>
                <ModalBody className="overflow-y-auto custom-scroll flex flex-col">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    className="hover:bg-stone-800 text-red-400 rounded-xl"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal> */}
      </section>

      {/* FAQ section */}
      <BlurText
        text="Frequently Asked Questions"
        className="text-4xl md:text-6xl font-semibold max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl"
      />
      <Accordion
        className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl w-full rounded-xl border border-neutral-700 shadow-lg backdrop-blur-lg mt-5"
        variant="shadow" // You can also try "splitted" or "bordered"
        size="lg"
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="What is Microsoft Tech Club?"
          className="border-b border-neutral-700"
        >
          <p className="text-gray-300 text-lg md:text-xl p-4">
            Microsoft Tech Club is a student community that promotes technology
            learning through events, workshops, and mentorship programs.
          </p>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Who can join MTC?"
          className="border-b border-neutral-700"
        >
          <p className="text-gray-300 text-lg md:text-xl p-4">
            Any student who is passionate about technology, regardless of their
            year or department, is welcome to join.
          </p>
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="How can I participate in events?"
          className="border-b border-neutral-700"
        >
          <p className="text-gray-300 text-lg md:text-xl p-4">
            You can register for upcoming events through our website or follow
            us on social media to stay updated on announcements.
          </p>
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="Accordion 4"
          title="What resources are available for learning?"
          className="border-b border-neutral-700"
        >
          <p className="text-gray-300 text-lg md:text-xl p-4">
            We offer a variety of resources including online courses, workshops,
            and mentorship programs to help you learn and grow in your tech
            journey.
          </p>
        </AccordionItem>

        <AccordionItem
          key="5"
          aria-label="Accordion 5"
          title="How can I get involved with MTC?"
          className="border-b border-neutral-700"
        >
          <p className="text-gray-300 text-lg md:text-xl p-4">
            You can get involved with MTC by attending our events, joining our
            workshops, and participating in our online community.
          </p>
        </AccordionItem>
      </Accordion>

      {/* Social Media Cards */}
      <section className="mt-20 px-4 text-center rounded-t-lg">
        <BlurText
          text="Follow Us"
          className="text-4xl md:text-6xl font-semibold max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl"
        />
        <p className="text-lg md:text-2xl text-gray-300 my-6 md:mx-[15%]">
          Stay ahead in the tech world with MTC’s dynamic social media lineup!
        </p>
      </section>
    </div>
  );
}
