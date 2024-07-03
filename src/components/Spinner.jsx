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
    // Generate a random duration between 3000ms (3 seconds) and 5000ms (5 seconds)
    return Math.random() * (5000 - 3000) + 3000;
  };

  const handleResetScroll = () => {
    if (boxContainerRef.current) {
      boxContainerRef.current.scrollTo({
        left: 0,
        // behavior: "smooth",
      });
      setScrollLeft(0);
      setSelectedBox(null);
    }
  };

  const handleStartScroll = () => {
    setSelectedBox(null);

    if (!isScrolling) {
      setIsScrolling(true);
      handleResetScroll();
      const duration = getRandomDuration(); // Duration of the scroll in milliseconds
      const maxSpeed = 30; // Maximum speed of the scroll
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
            requestAnimationFrame(scroll);
          } else {
            setIsScrolling(false);
            chooseWinner();
            // Stop the smooth scrolling effect
            if (boxContainerRef.current) {
              boxContainerRef.current.scrollTo({
                left: boxContainerRef.current.scrollLeft,
                behavior: "smooth",
              });
            }
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

  const boxes = [
    {
      id: 1,
      imageUrl:
        "https://vipuljadaun.github.io/Task/0ccfafdb-bc51-46b9-96a1-d4046bb86a99.webp",
    },
    {
      id: 2,
      imageUrl:
        "https://vipuljadaun.github.io/Task/f3163799-3fae-48e7-a2b7-b56e215d931f.webp",
    },
    {
      id: 3,
      imageUrl:
        "https://vipuljadaun.github.io/Task/76881e55-1eae-450e-9a99-25e4840efbaa.webp",
    },
    {
      id: 4,
      imageUrl:
        "https://vipuljadaun.github.io/Task/e060f9aa-a3cf-4b75-9c9c-81caa5920372.webp",
    },
    {
      id: 5,
      imageUrl:
        "https://vipuljadaun.github.io/Task/668f5934-d1db-4804-86fc-c597b0346195.webp",
    },
    {
      id: 6,
      imageUrl:
        "https://vipuljadaun.github.io/Task/a137dc12-4e83-416f-8abd-791535720e52.webp",
    },
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
            style={{
              backgroundImage: `url(${box.imageUrl})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            data-id={box.id}
          ></div>
        ))}
      </div>

      <div className="button-container">
        <button className="start-button" onClick={handleStartScroll}>
          Spin the wheel
        </button>
      </div>
      {selectedBox && (
        <div className="winner-box">
          <p>Winner:</p>
          <div
            className="box winner"
            style={{
              backgroundImage: `url(${
                boxes.find((box) => box.id === parseInt(selectedBox)).imageUrl
              })`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default BoxComponent;
