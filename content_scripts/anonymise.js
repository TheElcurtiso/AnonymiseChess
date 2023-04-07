browser.runtime.onMessage.addListener((message) => {
    
});

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



