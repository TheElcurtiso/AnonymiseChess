/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
  function anonymize(tabs) {
    console.debug("hello");
      browser.tabs.sendMessage(tabs[0].id, {
        command: "anonymize"
      });
  }

  /**
  * Just log the error to the console.
  */
  function reportError(error) {
    console.error(`AHHHHH: ${error}`);
  }

  if (document.querySelector('.avatar').checked) {
    console.debug("hello");
    browser.tabs.query({ active: true, currentWindow: true })
      .then(anonymize)
      .catch(reportError);
  } 
}

var checkbox = document.getElementById("avatar");

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});
