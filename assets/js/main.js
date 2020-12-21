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
  const animationLenMs = 8000;
  const pickRandomEmoji = () => {
    return emojiSet[Math.floor(Math.random() * emojiSet.length)];
  };

  window.addEventListener("DOMContentLoaded", () => {
    const emojiButtonContainer = document.querySelector(
      ".emoji-button-container"
    );

    const containerHeight = emojiButtonContainer.scrollHeight;
    const spreadBuffer = 400;
    const emojiYSpread = containerHeight + spreadBuffer * 2;
    const emojiButton = document.querySelector(".emoji-button");

    const generateShootingEmoji = () => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "generated-emoji";
      emojiDiv.innerHTML = pickRandomEmoji();
      emojiButtonContainer.appendChild(emojiDiv);

      const randomYTarget = Math.round(
        -spreadBuffer + Math.random() * emojiYSpread
      );

      requestAnimationFrame(() => {
        emojiDiv.setAttribute(
          "style",
          `transition: all ${animationLenMs}ms linear; bottom: ${randomYTarget}px; left: 5000px;`
        );
      });

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
