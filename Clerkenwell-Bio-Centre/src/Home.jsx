// import React, { useEffect, useState } from "react";
// import Questions from "./Questions";
// import logo from './assets/CLERKENWELL-removebg-preview.png'

// export default function Home() {
//   const [showApply, setShowApply] = useState(false);

//   let done = false;

//   const speed = 50;
//   const txt1 = "Welcome to Clerkenwell Bio Centre";
//   const txt2 =
//     "We are welcoming a few lucky guests to our underground research centre to see a new machine we've built. As you can see,";
//   const txt3 = " it might change your life..";

//   useEffect(() => {
//     function typeWriter() {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < txt1.length) {
//           document.getElementById("typewriter1").innerHTML += txt1.charAt(i);
//           i++;
//         } else {
//           clearInterval(interval);
//           typeWriter1();
//         }
//       }, speed);
//     }

//     function typeWriter1() {
//       let i = 0;
//       const interval = setInterval(() => {
//         if (i < txt2.length) {
//           document.getElementById("typewriter2").innerHTML += txt2.charAt(i);
//           i++;
//         } else {
//           clearInterval(interval);
//           document
//             .getElementsByClassName("video")[0]
//             .classList.add("display-block");
//           setTimeout(() => {
//             typeWriter2();
//           }, 2000); // Delay before typing the third text and showing the video
//         }
//       }, speed);
//     }

//    function typeWriter2() {
//   let i = 0;
//   const interval = setInterval(() => {
//     if (i < txt3.length - 1) {
//       document.getElementById("typewriter2").innerHTML += txt3.charAt(i);
//       i++;
//     } else {
//       clearInterval(interval);
//       document
//         .getElementsByClassName("video")[0]
//         .classList.add("display-block");
//       setTimeout(() => {
//         done = true; // Set done flag to true after all animations complete
//         setShowApply(true); // Set showApply to true after all animations complete
//         localStorage.setItem("showApply", "true");
//       }, 1000); // Adjust the timing here as needed
//     }
//   }, speed);
// }


//     if (!done) {
//       done = true;
//       typeWriter();
//     }
//   }, []);

//   return (
//     <div className="text-center app-background">
//       <div>
//         <img src={logo} className="logo " alt="Vite logo" height="250px" />
//       </div>

//       <h3
//         id="typewriter1"
//         className="text-black"
//         style={{
//           fontSize: "20px",
//           fontWeight: "300",
//           fontFamily: "IBM Plex Mono",
//           marginTop: "-100px",
//         }}
//       ></h3>

//       <h3
//         id="typewriter2"
//         className="typewriter text-black mt-4"
//         style={{
//           fontSize: "20px",
//           fontWeight: "300",
//           fontFamily: "IBM Plex Mono",
//         }}
//       ></h3>

//       <section className="video mt-4" style={{ display: "none" }}>
//         <video
//           controls
//           src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//         ></video>
//       </section>
//       <section className="action">{showApply && <Questions />}</section>
//     </div>
//   );
// }

// Inside your component
import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import logo from './assets/CLERKENWELL-removebg-preview.png';
import "./styles.css"; // Adjust the path as per your project structure

export default function Home() {
  const [showApply, setShowApply] = useState(false);

  let done = false;

  const speed = 50;
  const txt1 = "Welcome to Clerkenwell Bio Centre";
  const txt2 =
    "We are welcoming a few lucky guests to our underground research centre to see a new machine we've built. As you can see,";
  const txt3 = " it might change your life..";

  useEffect(() => {
    function typeWriter() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt1.length) {
          document.getElementById("typewriter1").innerHTML += txt1.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          typeWriter1();
        }
      }, speed);
    }

    function typeWriter1() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt2.length) {
          document.getElementById("typewriter2").innerHTML += txt2.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          document
            .getElementsByClassName("video")[0]
            .classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            typeWriter2();
          }, 2000); // Delay before typing the third text and showing the video
        }
      }, speed);
    }

    function typeWriter2() {
      let i = 0;
      const interval = setInterval(() => {
        if (i < txt3.length - 1) {
          document.getElementById("typewriter2").innerHTML += txt3.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          document
            .getElementsByClassName("video")[0]
            .classList.add("show"); // Show the video with transition effect
          setTimeout(() => {
            done = true; // Set done flag to true after all animations complete
            setShowApply(true); // Set showApply to true after all animations complete
            localStorage.setItem("showApply", "true");
          }, 3000); // Adjust the timing here as needed
        }
      }, speed);
    }
    

    if (!done) {
      done = true;
      typeWriter();
    }
  }, []);

  return (
    <div className="text-center app-background">
      <div>
        <img src={logo} className="logo " alt="Vite logo" height="250px" />
      </div>

      <h3
        id="typewriter1"
        className="text-black"
        style={{
          fontSize: "20px",
          fontWeight: "300",
          fontFamily: "IBM Plex Mono",
          marginTop: "-100px",
        }}
      ></h3>

      <h3
        id="typewriter2"
        className="typewriter text-black mt-4"
        style={{
          fontSize: "20px",
          fontWeight: "300",
          fontFamily: "IBM Plex Mono",
        }}
      ></h3>

      <section className="video-container">
        <section className="video">
          <video
            controls
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ></video>
        </section>
      </section>
      <section className="action">{showApply && <Questions />}</section>
    </div>
  );
}

