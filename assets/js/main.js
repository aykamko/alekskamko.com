(() => {
  const emojiSet = [
    "😂",
    "😍",
    "🤪",
    "🤩",
    "🥳",
    "🤓",
    "🤯",
    "🥶",
    "😱",
    "🥵",
    "🤢",
    "🤑",
    "🤠",
    "🤡",
    "😵",
  ];
  const pickRandomEmoji = () => {
    return emojiSet[Math.floor(Math.random() * emojiSet.length)];
  };

  window.addEventListener("DOMContentLoaded", () => {
    const emojiButtonContainer = document.querySelector(
      ".emoji-button-container"
    );

    const containerHeight = emojiButtonContainer.scrollHeight;
    const emojiButton = document.querySelector(".emoji-button");

    const generateShootingEmoji = () => {
      const shootDirection = document.body.scrollWidth < 768 ? "UP" : "RIGHT";

      const emojiDiv = document.createElement("div");
      emojiDiv.innerHTML = pickRandomEmoji();

      if (shootDirection === "RIGHT") {
        const animationLenMs = 8000;
        emojiDiv.className = "generated-emoji left-shooting";
        emojiButtonContainer.appendChild(emojiDiv);

        const spreadBuffer = 800;
        const emojiYSpread = containerHeight + spreadBuffer * 2;
        const randomYTarget = Math.round(
          -spreadBuffer + Math.random() * emojiYSpread
        );

        requestAnimationFrame(() => {
          emojiDiv.setAttribute(
            "style",
            `transition: all ${animationLenMs}ms linear; bottom: ${randomYTarget}px; left: 5000px;`
          );
        });
      } else if (shootDirection === "UP") {
        const animationLenMs = 24000;
        emojiDiv.className = "generated-emoji up-shooting";
        emojiButtonContainer.appendChild(emojiDiv);

        const xSpreadAmount = 4000;
        const randomXTarget =
          Math.round(Math.random() * xSpreadAmount * 2) - xSpreadAmount;

        requestAnimationFrame(() => {
          emojiDiv.setAttribute(
            "style",
            `transition: all ${animationLenMs}ms linear; bottom: 10000px; left: ${randomXTarget}px;`
          );
        });
      }

      setTimeout(() => {
        emojiButtonContainer.removeChild(emojiDiv);
      }, animationLenMs);
    };

    let automaticModeStartTimeout;
    let automaticModeInterval;

    const emojiGenerateEvents = ["mousedown", "touchstart"];
    emojiGenerateEvents.map((evName) => {
      emojiButton.addEventListener(evName, (ev) => {
        if (ev.button !== 0) return;
        generateShootingEmoji();

        clearTimeout(automaticModeStartTimeout);
        clearInterval(automaticModeInterval);

        automaticModeStartTimeout = setTimeout(() => {
          generateShootingEmoji();
          automaticModeInterval = setInterval(() => {
            generateShootingEmoji();
          }, 100);
        }, 1000);
      });
    });

    const emojiStopEvents = ["mouseup", "touchcancel", "touchend"];
    emojiStopEvents.map((evName) => {
      document.addEventListener(evName, (ev) => {
        if (ev.button !== 0) return;
        clearTimeout(automaticModeStartTimeout);
        clearInterval(automaticModeInterval);
      });
    });
  });
})();
