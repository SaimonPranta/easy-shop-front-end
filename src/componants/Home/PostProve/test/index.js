import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [showLastElemt, setShowLastElemt] = useState(false);
  const lastElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Hello form internval function")
        const [entry] = entries; // Destructure the first entry
        if (entry.isIntersecting) {
          setShowLastElemt(true);
        } else {
          setShowLastElemt(false);
        }
      },
      {
        root: null, // Observe within the viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
      console.log("Observer attached to the last element"); // Debugging
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
        console.log("Observer detached from the last element"); // Debugging
      }
    };
  }, []);

  return (
    <div style={{ minHeight: "150vh", padding: "20px" }}>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          ref={index === 9 ? lastElementRef : null} // Attach ref to the last div element
          style={{
            height: "100px",
            margin: "20px",
            backgroundColor: index === 9 ? "lightcoral" : "lightblue",
          }}
        >
          Element {index + 1}
        </div>
      ))}
      <div>
        Last element is {showLastElemt ? "visible" : "not visible"}.
      </div>
    </div>
  );
}
