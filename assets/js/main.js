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
    return emojiSet[Math.round(Math.random() * (emojiSet.length - 1))];
  };

  window.addEventListener("DOMContentLoaded", () => {
    const emojiButtonContainer = document.querySelector(
      ".emoji-button-container"
    );

    const containerHeight = emojiButtonContainer.scrollHeight;
    const yBuffer = 400;
    const emojiYSpread = containerHeight + yBuffer * 2;

    const emojiButton = document.querySelector(".emoji-button");
    emojiButton.addEventListener("click", () => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "generated-emoji";
      emojiDiv.innerHTML = pickRandomEmoji();
      emojiButtonContainer.appendChild(emojiDiv);

      const randomYTarget = Math.round(-yBuffer + Math.random() * emojiYSpread);

      requestAnimationFrame(() => {
        emojiDiv.setAttribute(
          "style",
          `transition: all ${animationLenMs}ms linear; top: ${randomYTarget}px; left: 5000px;`
        );
      });

      setTimeout(() => {
        emojiButtonContainer.removeChild(emojiDiv);
      }, animationLenMs);
    });
  });
})();
