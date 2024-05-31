// This file adds the AI Assistance button, functionality, button CSS and HTML
// Using SendBird AI Chatbot Button and Interface, integrated with OpenAI's GPT4o to provide responses

// Add button for AI assistance widget and functionality
// Code to embed application widget from: https://dashboard.sendbird.com/
  !function(w, d, s, ...args){
    var div = d.createElement('div');
    div.id = 'aichatbot';
    d.body.appendChild(div);
    w.chatbotConfig = args;
    var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
    j.defer = true;
    j.type = 'module';
    j.src = 'https://aichatbot.sendbird.com/index.js';
    f.parentNode.insertBefore(j, f);
    
  }(window, document, 'script', 'E542746F-134A-4DFD-9AC6-3F21E2998240', 'onboarding_bot', {
    apiHost: 'https://api-cf-us-1.sendbird.com',
  });


// Change the CSS of the SendBird Button
document.addEventListener("DOMContentLoaded", function () {

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/ai-chatbot.css";
  document.head.appendChild(link);

  // Use a MutationObserver object to continously watch for changes to the DOM, 
  // wait for the aichatbot-widget-button element to be created, 
  // and then apply js functions to it
  const observer = new MutationObserver((mutations) => {
    // Need a nested loop since one mutation can contain multiple added nodes
    mutations.forEach((mutation) => { // Check each mutation
      mutation.addedNodes.forEach((node) => { // Check each added node in the mutation

          // Check if the added node was the aichatbot-widget-button element
          if (node.id === 'aichatbot-widget-button') {
            // observer.disconnect(); // Disconnect the MutationObserver object 
                                   // to stop watching the DOM for mutations

            // document.querySelector("link[href='/ai-chatbot.css']").href = "/ai-chatbot.css"; // Keep in case of script tag loading bugs

            // Update CSS and innerHTML:

            // Remove default svg images in the aichatbot-widget-button, 
            node.innerHTML = "";

            // Add two divs to swap between display properties

            // === When button is closed ===
            let aiBtnClosedDiv = document.createElement('div');
            aiBtnClosedDiv.id = "ai-button-closed-div";
            node.appendChild(aiBtnClosedDiv);

            // Add AI Assistance Button message
            let aiBtnMsg = document.createElement('span');
            aiBtnMsg.innerText = "Get AI Assistance";
            aiBtnMsg.style.position = "static";
            aiBtnMsg.style.width = "fit-content";
            aiBtnClosedDiv.appendChild(aiBtnMsg);

            // Add AI Assistance Button Icon img
            let aiBtnImg = document.createElement('img');
            aiBtnImg.src = 'chatbot.png';
            aiBtnImg.style.position = "static";
            aiBtnImg.style = "width: 30px; height: 30px;";
            aiBtnClosedDiv.appendChild(aiBtnImg);

            // === When button is open ===
            let aiBtnOpenDiv = document.createElement('div');
            aiBtnOpenDiv.id = "ai-button-open-div";
            node.appendChild(aiBtnOpenDiv);

            // Open div initially hidden
            aiBtnOpenDiv.classList.toggle("hideAiButtonDiv");

            let closeIcon = document.createElement('span');
            closeIcon.classList.add("sc-1y8qi4y-2");
            closeIcon.classList.add("kBOnTJ");
            closeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path fill="#A3A8C4" d="M8 9.586L2.707 4.293a1 1 0 10-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L8 9.586z"></path>
            </svg>
            `;
            aiBtnOpenDiv.appendChild(closeIcon);

            // Event listener to change the innerhtml shown in the ai widget button when clicked
            node.addEventListener("click", function(e) {
              document.getElementById("ai-button-open-div").classList.toggle("hideAiButtonDiv");
              document.getElementById("ai-button-closed-div").classList.toggle("hideAiButtonDiv");
            });

          }
        })
      })
    });
    // Moniter all elements in the document body element for changes
    // childList: true moniter changes to the direct children of the body element
    // subtree: true - also moniter changes to all descendants of the 
    observer.observe(document.body, { childList: true, subtree: true });
});
