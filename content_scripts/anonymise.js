(() => {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function insertBeast(beastURL) {
      removeExistingBeasts();
      const beastImage = document.createElement("img");
      beastImage.setAttribute("src", beastURL);
      beastImage.style.height = "100vh";
      beastImage.className = "beastify-image";
      document.body.appendChild(beastImage);
    }
  
    /**
     * Remove every beast from the page.
     */
    function removeExistingBeasts() {
      const existingBeasts = document.querySelectorAll(".beastify-image");
      for (const beast of existingBeasts) {
        beast.remove();
      }
    }
  
    /**
     * Listen for messages from the background script.
     * Call "insertBeast()" or "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "beastify") {
        insertBeast(message.beastURL);
      } else if (message.command === "reset") {
        removeExistingBeasts();
      }
    });
  })();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setOpponentInformation(opponentInformationText, opponentInformationClass) {
    var opponentInformation = await findOpponentInformation(opponentInformationClass);
    while (true) {
        opponentInformation[0].textContent = opponentInformationText;
        await sleep(100);
    }
}

async function setOpponentAvatar(opponentAvatarUrl, opponentAvatarClass) {
    var opponentAvatar = await findOpponentInformation(opponentAvatarClass);
    while (true) {
        opponentAvatar[0].src = opponentAvatarUrl;
        opponentAvatar[0].srcset = "";
        await sleep(100);
    }
}

async function findOpponentInformation(opponentInformationClass) {
    var findOpponentInformation = document.querySelectorAll(opponentInformationClass);
    while (findOpponentInformation.length != 2) {
        findOpponentInformation = document.querySelectorAll(opponentInformationClass);
        await sleep(100);
    }
    return findOpponentInformation;
}

//set opponent rating
setOpponentInformation("(1)", ".user-tagline-rating");

//set opponent username
setOpponentInformation("Opponent", ".user-username-component");

//set opponent avatar
setOpponentAvatar("https://www.chess.com/bundles/web/images/user-image.svg", ".avatar-component");



