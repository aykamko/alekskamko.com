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
    const yBuffer = 400;
    const emojiYSpread = containerHeight + yBuffer * 2;
    const emojiButton = document.querySelector(".emoji-button");

    const generateShootingEmoji = () => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "generated-emoji";
      emojiDiv.innerHTML = pickRandomEmoji();
      emojiButtonContainer.appendChild(emojiDiv);

      const randomYTarget = Math.round(-yBuffer + Math.random() * emojiYSpread);

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

    emojiButton.addEventListener("mousedown", (ev) => {
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
    document.addEventListener("mouseup", (ev) => {
      if (ev.button !== 0) return;
      clearTimeout(automaticModeStartTimeout);
      clearInterval(automaticModeInterval);
    });
  });
})();
