import React, { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import Questions from "./Questions";
import logo from './assets/CLERKENWELL-removebg-preview.png'

export default function Home() {
  const [showApply, setShowApply] = useState(false);

  let done = false;

  const speed = 50;
  const txt1 =
    "Welcome to Clerkenwell Bio Centre";
  const txt2 = "We are welcoming a few lucky guests to our underground research centre to see a new machine we've built. As you can see, it might change your life.."

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
              .classList.add("display-block");
            done = true; // Set done flag to true after both animations complete
            setShowApply(true); // Set showApply to true after both animations complete
            localStorage.setItem("showApply", "true");
          }
        }, speed);
    }
    if(!done) {
        done = true;
        typeWriter();
    }
  }, []);
  return (
    <div className="text-center app-background">
      <div>
        <img src={logo} className="logo " alt="Vite logo" />
      </div>

      <h3 id="typewriter1" className=" typewriter text-black" style={{ fontSize: "20px", fontWeight: "300", fontFamily: "IBM Plex Mono"}}></h3>
      <h3
        id="typewriter2"
        className="typewriter text-black mt-4"
        style={{ fontSize: "20px", fontWeight: "300", fontFamily: "IBM Plex Mono" }}
      ></h3>
      <section className="video mt-4" style={{ display: "none" }}>
        <video
          controls
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ></video>
      </section>
      <section className="action">{showApply && <Questions />}</section>
    </div>
  );
}
