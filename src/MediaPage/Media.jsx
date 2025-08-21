import React, { useState } from "react";
import BlurText from "../components/ui/BlurText.jsx";
import image1 from "../assets/unused/typingContest.jpg";
import image2 from "../assets/unused/DataScience.jpg";
import image3 from "../assets/unused/GW-1.jpg";
import image4 from "../assets/unused/ambassador_program_old.jpg";
import image5 from "../assets/unused/background.jpg";
import image6 from "../assets/unused/Orientation-5.jpg";
import image7 from "../assets/unused/Orientation-5_new.jpg";
import image8 from "../assets/unused/Timeseries1_new.jpg";
import image9 from "../assets/about_us1.jpg";
import image10 from "../assets/about_us2.jpg";
import image11 from "../assets/MTClogo.png";
import image12 from "../assets/ThinkAi'24.jpg";


import Balatro from "../components/ui/Balatro.jsx";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.jsx";
import IdeaSubmissionForm from "./MediaForm.jsx";
import Modal from "../components/ui/Modal.jsx";
import FocusCard from "../components/ui/FocusCard.jsx";
import article1 from "../assets/articles/article_2025-08-09.webp";
import article2 from "../assets/articles/article_2025-04-17.jpg"; /*Maybe Our Phones Should Be Dumber*/
import article3 from "../assets/articles/article_2025-03-03.png";
import article4 from "../assets/articles/article_2025-02-07.png"; /*ChatGPT’s White Whale is China’s Golden Goose*/
import article5 from "../assets/articles/article_2023-08-10.jpg"; /*Do Employers Dream of AI Sheep?*/
import article6 from "../assets/unused/Timeseries1_new.jpg";
import article7 from "../assets/articles/article_2025-08-20.webp";



import ShinyButton from "../components/ui/ShinyButton.jsx";
export default function Media() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  const handleImageClick = (idx) => {
    // Only toggle on mobile devices
    if (window.innerWidth < 640) {
      setActiveImageIdx(activeImageIdx === idx ? null : idx);
    }
  };

  const handleOpenGallery = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonRect(rect);
    setIsGalleryOpen(true);
  };
  const staticImages = [
    {
      src: image1,
      title: "Typing Contest",
      desc: "Showcasing our annual speed typing event and its winners.",
    },
    {
      src: image2,
      title: "Data Science Workshop",
      desc: "Hands-on learning session on data science and analytics.",
    },
    {
      src: image3,
      title: "Guest Webinar",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
  ];
  const galleryImages = [
    {
      src: image1,
      title: "Typing Contest",
      desc: "Showcasing our annual speed typing event and its winners.",
    },
    {
      src: image2,
      title: "Data Science Workshop",
      desc: "Hands-on learning session on data science and analytics.",
    },
    {
      src: image3,
      title: "Guest Webinar",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image4,
      title: "4",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image5,
      title: "5",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image6,
      title: "6",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image7,
      title: "7",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image8,
      title: "8",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image9,
      title: "9",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image10,
      title: "10",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image11,
      title: "11",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
        {
      src: image12,
      title: "12",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
  ];
  return (
    <div className="bg-transparent text-white min-h-screen py-20 px-4">
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#000000"
        color2="#0a0a0a"
        color3="#111111"
      ></Balatro>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-6xl font-bold md:text-6xl text-center mb-8 flex justify-center">
          <BlurText text="Media" delay={200}></BlurText>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Pixels speek louder than words
        </p>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <div className="flex gap-8 w-full justify-center">
            {staticImages.map((img, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? "relative group overflow-hidden rounded-lg flex-1 block sm:block"
                    : "relative group overflow-hidden rounded-lg flex-1 hidden sm:block"
                }
                onClick={() => handleImageClick(i)}
              >
<img
  src={img.src}
  alt={img.title}
  className={`w-full h-80 object-cover transition duration-500
    ${
      (activeImageIdx === i && window.innerWidth < 640)
        ? "blur-sm brightness-75"
        : "group-hover:blur-sm group-hover:brightness-75"
    }
  `}
/>
                {/* Info for desktop (hover) and mobile (touch) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out
                    ${
                      // Show on hover for desktop, or if active on mobile
                      (activeImageIdx === i && window.innerWidth < 640)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                    }
                  `}
                  style={{ pointerEvents: "none" }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{img.title}</h3>
                  <p className="text-white max-w-xs">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
                    {/* Gallery button */}
<div className="text-center mt-12 mb-8">
  <ShinyButton onClick={handleOpenGallery}>
    Gallery
  </ShinyButton>
</div>
        </div>

        <Modal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          title="Gallery"
          maxWidth="max-w-7xl"
          originRect={buttonRect}
        >
          <div className="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-3">
            {galleryImages.map((img, idx) => (
              <FocusCard
                key={idx}
                src={img.src}
                title={img.title}
                desc={img.desc}
              />
            ))}
          </div>
        </Modal>

        {/* Info line */}
<div className="mb-8">
  <h2 className="text-4xl font-bold text-white text-center w-full">
    <BlurText text="Articles"/>
  </h2>
</div>
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          <BlurText text ="Explore recent trends in technology with our monthly blog posts on Medium"/>
        </p>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              {
                title: (<>I Agree…<br />Now What?</>),
                img: article7,
                desc: "clicks, “Yes, I Agree”, a small and rather insignificant experience you and I have when we open a website",
                date: "August 20, 2025",
                author: "Vaibhav Krishnan",
                url: "https://medium.com/@microsofttechclub/i-agree-now-what-c9a9affeb04d",
              },
              {
                title: "Sure, Autocorrect. That’s EXACTLY What I Meant",
                img: article1,
                desc: "I didn’t signup for this chaos. Its silent and sneaky.",
                date: "August 9, 2025",
                author: "Saanvi Dutta",
                url: "https://medium.com/@microsofttechclub/sure-autocorrect-thats-exactly-what-i-meant-139dc7a08ab0",
              },
              {
                title: "Maybe Our Phones Should Be Dumber",
                img: article2,
                desc: "Maybe your mom was right; it is all because of that phone.",
                date: "April 17, 2025",
                author: "MTC Team",
                url: "https://medium.com/@microsofttechclub/maybe-our-phones-should-be-dumber-511ad2da46dc",
              },
              {
                title: "And I Am Become Death, Destroyer Of Phones…",
                img: article3,
                desc: "Planned Obsolescence. Your smartphone will die in 2 years.",
                date: "March 3, 2025",
                author: "Diya Freddy",
                url: "https://medium.com/@microsofttechclub/and-i-am-become-death-destroyer-of-phones-ca7eb40ed4c9",
              },
              {
                title: "ChatGPT’s White Whale is China’s Golden Goose",
                img: article4,
                desc: "The deepseek story.                          ",
                date: "February 7, 2025",
                author: "Prasannah",
                url: "https://medium.com/@microsofttechclub/chatgpts-white-whale-is-china-s-golden-goose-a79619c545f2",
              },
              {
                title: "Do Employers Dream of AI Sheep?",
                img: article5,
                desc: "Are programmers going to be obsolete?",
                date: "November 25, 2024",
                author: "Prasannah",
                url: "https://medium.com/@microsofttechclub/do-employers-dream-of-ai-sheep-0744c066bf69",
              },

            ].map((article, idx) => (
              <CardContainer className="inter-var bg-transparent" key={idx}>
<CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-2 border-white dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[22rem] lg:w-[23rem] h-[30rem] rounded-2xl p-6 flex flex-col items-center">
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-neutral-600 dark:text-white mb-4 text-center"
                  >
                    {article.title}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mb-4">
                    <img
                      src={article.img}
                      alt={article.title}
                      className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-xl"
                    />
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-base max-w-sm mb-4 dark:text-neutral-300 flex-grow text-center"
                  >
                    {article.desc}
                  </CardItem>

                  <CardItem translateZ="50" className="text-white text-sm mb-1">
                    {article.date}
                  </CardItem>

                  <CardItem
                    translateZ="50"
                    className="text-gray-400 text-sm mb-4"
                  >
                    By: {article.author}
                  </CardItem>

                  <CardItem
                    translateZ={20}
                    as="a"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-blue-600 text-white rounded-lg px-6 py-2 text-base font-semibold text-center transition-all duration-200 ease-in-out hover:bg-white hover:text-blue-600 hover:scale-105 block"
                  >
                    Read More →
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
<div className="text-center mt-12 mb-8">
  <ShinyButton
    onClick={() =>
      window.open("https://medium.com/@microsofttechclub", "_blank")
    }
  >
    Explore More Articles
  </ShinyButton>
</div>

          <div className="mb-16 mt-16">
            <IdeaSubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
