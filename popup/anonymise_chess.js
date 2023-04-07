/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
  function anonymize(tabs) {
    console.debug("hello");
      browser.tabs.sendMessage(tabs[0].id, {
        command: "anonymize",
        beastURL: url
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

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs
  .executeScript({ file: "/content_scripts/anonymise.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
