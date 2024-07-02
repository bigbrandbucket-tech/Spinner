import React, { useRef, useState, useEffect } from "react";
import "./BoxComponent.css";

const BoxComponent = () => {
  const boxContainerRef = useRef(null);
  const centerLineRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (boxContainerRef.current && centerLineRef.current) {
        setScrollLeft(boxContainerRef.current.scrollLeft);
      }
    };

    if (boxContainerRef.current) {
      boxContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (boxContainerRef.current) {
        boxContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const getRandomDuration = () => {
    // Generate a random duration between 2000ms (2 seconds) and 4000ms (4 seconds)
    return Math.random() * (4000 - 2000) + 2000;
  };

  const handleStartScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      const duration = getRandomDuration(); // Duration of the scroll in milliseconds
      const maxSpeed = 20; // Maximum speed of the scroll
      const halfDuration = duration / 2;

      if (boxContainerRef.current) {
        const startTime = performance.now();

        const scroll = (timestamp) => {
          const elapsed = timestamp - startTime;

          if (elapsed < duration) {
            let progress;
            if (elapsed < halfDuration) {
              progress = (elapsed / halfDuration) * maxSpeed; // Linearly increase speed
            } else {
              progress = ((duration - elapsed) / halfDuration) * maxSpeed; // Linearly decrease speed
            }

            boxContainerRef.current.scrollLeft += progress;
            setScrollLeft(boxContainerRef.current.scrollLeft);
            requestAnimationFrame(scroll);
          } else {
            setIsScrolling(false);
            chooseWinner();
          }
        };

        requestAnimationFrame(scroll);
      }
    }
  };

  const chooseWinner = () => {
    // Calculate which box is in the center after scrolling ends
    if (boxContainerRef.current && centerLineRef.current) {
      const containerRect = boxContainerRef.current.getBoundingClientRect();
      const centerLineRect = centerLineRef.current.getBoundingClientRect();

      // Find the box that intersects with the center line
      const boxes = boxContainerRef.current.querySelectorAll(".box");
      boxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect();
        if (
          boxRect.left <= containerRect.left + containerRect.width / 2 &&
          boxRect.right >= containerRect.left + containerRect.width / 2
        ) {
          // Box is intersecting with the center line
          setSelectedBox(box.dataset.id);
        }
      });
    }
  };

  const handleResetScroll = () => {
    if (boxContainerRef.current) {
      boxContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setScrollLeft(0);
      setSelectedBox(null);
    }
  };

  const boxes = [
    { id: 1, color: "#FF6633" },
    { id: 2, color: "#FFB399" },
    { id: 3, color: "#FF33FF" },
    { id: 4, color: "#FFFF99" },
    { id: 5, color: "#00B3E6" },
    { id: 6, color: "#E6B333" },
    { id: 7, color: "#3366E6" },
    { id: 8, color: "#999966" },
    { id: 9, color: "#99FF99" },
    { id: 10, color: "#B34D4D" },
  ];

  const repeatedBoxes = Array.from({ length: 10 }).flatMap(() => boxes);

  return (
    <div className="box-component">
      <div className="box-container" ref={boxContainerRef}>
        <div
          ref={centerLineRef}
          className="center-line"
          style={{ left: `calc(50% + ${scrollLeft}px)` }}
        ></div>
        {repeatedBoxes.map((box) => (
          <div
            key={`${box.id}-${Math.random()}`}
            className={`box ${selectedBox === `${box.id}` ? "winner" : ""}`}
            style={{ backgroundColor: box.color }}
            data-id={box.id}
          ></div>
        ))}
      </div>

      <div className="button-container">
        <button className="start-button" onClick={handleStartScroll}>
          Start Scrolling
        </button>
        <button className="reset-button" onClick={handleResetScroll}>
          Reset Scroll
        </button>
      </div>
      {selectedBox && (
        <div className="winner-box">
          <p>Winner:</p>
          <div
            className="box winner"
            style={{
              backgroundColor: boxes.find(
                (box) => box.id === parseInt(selectedBox)
              ).color,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default BoxComponent;
