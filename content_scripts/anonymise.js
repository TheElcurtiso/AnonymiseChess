function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setOpponentInformation(opponentInformationText, opponentInformationClass) {
    var opponentInformation = findOpponentInformation();
    if (opponentInformation == 0) return; 
    var opponentInfo = opponentInformation.getElementsByClassName(opponentInformationClass);
    while (true) {
        try {
            opponentInfo[0].textContent = opponentInformationText;
            await sleep(100);
        }
        catch {
            console.debug("Still loading");
            await sleep(1000);
        }
    }
}

async function setOpponentAvatar(opponentAvatarUrl, opponentAvatarClass) {
    var opponentInformation = findOpponentInformation();
    if (opponentInformation == 0) return;
    var opponentAvatar = opponentInformation.getElementsByTagName(opponentAvatarClass);
    while (true) {
        try {
            opponentAvatar[0].src = opponentAvatarUrl;
            await sleep(100);
        }
        catch {
            console.debug("Still loading");
            await sleep(1000);
        }
    }
}

async function deleteNewGameMessage() {
    while (true) {
        var findOpponentInformation = document.getElementsByClassName("live-game-start-component");
        for (let info of findOpponentInformation) {
            info.remove();
        }
        
        await sleep(100);
    }
    
}

function findOpponentInformation() {
    var findOpponentInformation = document.getElementsByClassName("player-component player-top");
    if (findOpponentInformation.length == 0) {
        console.debug("Opponent info doesn't exist, cancelling");
        return 0;
    }
    return findOpponentInformation[0];
}

let opponentInformation = {};

//default settings
//set opponent rating
setOpponentInformation("", "user-tagline-rating");

//set opponent username
setOpponentInformation("Opponent", "user-username-component");

//set opponent avatar
setOpponentAvatar("https://www.chess.com/bundles/web/images/user-image.svg", "img");

deleteNewGameMessage();