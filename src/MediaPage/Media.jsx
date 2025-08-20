import React, { useState } from "react";
import BlurText from "../components/ui/BlurText.jsx";
import image1 from "../assets/unused/typingContest.jpg";
import image2 from "../assets/unused/DataScience.jpg";
import image3 from "../assets/unused/GW-1.jpg";
import Balatro from "../components/ui/Balatro.jsx";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.jsx";
import IdeaSubmissionForm from "./MediaForm.jsx";

const images = [image1, image2, image3];

export default function Media() {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIdx((prev) =>
      prev === 0 ? images.length * 5 - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      prev + visibleCount >= images.length * 5 ? 0 : prev + 1
    );
  };

  const visibleImages = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleImages.push(images[(startIdx + i) % images.length]);
  }

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
        <h1 className="text-4xl md:text-6xl text-center mb-8 flex justify-center">
          <BlurText text="Media" delay={100}></BlurText>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Pixels speek louder than words
        </p>

        {/* IMAGE CAROUSEL SECTION */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition focus:outline-none"
              aria-label="Previous"
            >
              <span className="text-2xl">&#8592;</span>
            </button>
            {/* Images */}
            <div className="flex gap-8 w-full justify-center">
              {visibleImages.map((img, i) => {
                const imgIdx = (startIdx + i) % (images.length * 5);
                return (
                  <div
                    key={imgIdx}
                    className="relative group overflow-hidden rounded-lg w-64"
                  >
                    <img
                      src={images[imgIdx % images.length]}
                      alt={`Image ${imgIdx + 1}`}
                      className="w-full h-64 object-cover transition duration-500 group-hover:blur-sm group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <h3 className="text-2xl font-bold text-white mb-2">{`Title ${
                        imgIdx + 1
                      }`}</h3>
                      <p className="text-white max-w-xs">
                        A brief description about image {imgIdx + 1}.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition focus:outline-none"
              aria-label="Next"
            >
              <span className="text-2xl">&#8594;</span>
            </button>
          </div>
        </div>

        {/* Info line */}
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          explore recent trends in technology with our monthly blog posts on
          Medium
        </p>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              {
                title: "Getting Started with Azure",
                img: image1,
                desc: "Learn the basics of Microsoft Azure cloud platform and its core services.",
                date: "March 15, 2024",
                author: "Alice",
              },
              {
                title: "React Best Practices",
                img: image2,
                desc: "Essential tips and patterns for building scalable React applications.",
                date: "March 10, 2024",
                author: "Bob",
              },
              {
                title: "Data Science Fundamentals",
                img: image3,
                desc: "Introduction to data science concepts and machine learning basics.",
                date: "March 5, 2024",
                author: "Charlie",
              },
              {
                title: "JavaScript ES6+ Features",
                img: image1,
                desc: "Modern JavaScript features that every developer should know.",
                date: "February 28, 2024",
                author: "Alice",
              },
              {
                title: "Cloud Computing Trends",
                img: image2,
                desc: "Latest trends and technologies in cloud computing industry.",
                date: "February 20, 2024",
                author: "Bob",
              },
              {
                title: "AI and Machine Learning",
                img: image3,
                desc: "Understanding artificial intelligence and its applications.",
                date: "February 15, 2024",
                author: "Charlie",
              },
            ].map((article, idx) => (
              <CardContainer className="inter-var bg-transparent" key={idx}>
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[22rem] lg:w-[23rem] h-auto rounded-2xl p-6">
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-neutral-600 dark:text-white mb-4"
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
                    className="text-neutral-500 text-base max-w-sm mb-4 dark:text-neutral-300 flex-grow"
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
                    href="https://medium.com/@microsofttechclub"
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
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
              Load More Articles
            </button>
          </div>

          <div className="mb-16 mt-16">
            <IdeaSubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
