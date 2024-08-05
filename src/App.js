import React, { useState } from "react";

const App = () => {
  const [circles, setCircles] = useState([{}]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleClick = (e) => {
    const newCircle = {
      x: e.clientX,
      y: e.clientY,
      color: "blue",
      radius: 50,
    };

    const overlapping = circles.some((circle) => {
      const distance = Math.sqrt(
        (circle.x - newCircle.x) ** 2 + (circle.y - newCircle.y) ** 2
      );
      return distance < circle.radius + newCircle.radius;
    });

    if (overlapping) {
      newCircle.color = getRandomColor();
    }

    setCircles([...circles, newCircle]);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} onClick={handleClick}>
      {circles.map((circle, index) => (
        <div
          key={index}
          style={{
            width: circle.radius * 2,
            height: circle.radius * 2,
            borderRadius: "50%",
            backgroundColor: circle.color,
            position: "absolute",
            left: circle.x - circle.radius,
            top: circle.y - circle.radius,
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
