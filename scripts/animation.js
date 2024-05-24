function dow(n) {
    document.getElementById(`span${n}`).style.color = "grey";

    let audio = new Audio("do.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById(`span${n}`).style.color = "";
    }, 2000);
  }

  function re(n) {
    document.getElementById(`span${n}`).style.color = "grey";

    let audio = new Audio("re.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById(`span${n}`).style.color = "";
    }, 2000);
  }

  function mi(n) {
    document.getElementById(`span${n}`).style.color = "grey";

    let audio = new Audio("mi.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById(`span${n}`).style.color = "";
    }, 2000);
  }
  function fa(n) {
    document.getElementById(`span${n}`).style.color = "grey";

    let audio = new Audio("fa1.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById(`span${n}`).style.color = "";
    }, 2000);
  }
  function sol() {
    document.getElementById("span6").style.color = "grey";

    let audio = new Audio("sol.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById("span6").style.color = "";
    }, 2000);
  }

  function la() {
    document.getElementById("span7").style.color = "grey";

    let audio = new Audio("la.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById("span7").style.color = "";
    }, 2000);
  }

  function si() {
    document.getElementById("span8").style.color = "grey";

    let audio = new Audio("si.mp4");
    audio.currentTime = 0.5; // Start from the second second
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1500); // Stop the audio after 1 second

    setTimeout(() => {
      document.getElementById("span8").style.color = "";
    }, 2000);
  }

  // Define a function to handle the animation
  function animateRobo() {
    const roboElement = document.querySelector(".robo");
    const evenSpans = document.querySelectorAll(".dance1 span:nth-child(2n)");
    const oddSpans = document.querySelectorAll(".dance1 span:nth-child(2n + 1)");

    var audio = new Audio("Welcome_to_Robo_Rent.mp4");
    audio.play();
    // Loop through each even span and add the class
    evenSpans.forEach(function (span) {
      span.classList.add("even-span");
    });

    oddSpans.forEach(function (span) {
      span.classList.add("odd-span");
    });

    // Add the animation class
    roboElement.classList.add("robocircle");

    // After the animation completes, remove the animation class
    setTimeout(() => {
      roboElement.classList.remove("robocircle");
      evenSpans.forEach(function (span) {
        span.classList.remove("even-span");
      });
      oddSpans.forEach(function (span) {
        span.classList.remove("odd-span");
      });
    }, 2000); // Adjust the timing (in milliseconds) to match the animation duration
  }