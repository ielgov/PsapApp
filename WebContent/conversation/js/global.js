
/* global ConversationPanel: true, PayloadPanel: true*/
/* eslint no-unused-vars: "off" */

// Other JS files required to be loaded first: apis.js, conversation.js, payload.js
(function() {
  // Initialize all modules
  //ConversationPanel.init();
  //PayloadPanel.init();
})();

var firstTimeConversation = true;
function initializeConversation()
{
	ConversationPanel.init();
	if (firstTimeConversation)
	{
		ConversationPanel.chatUpdateSetup();
		firstTimeConversation = false;
	}	
	//PayloadPanel.init();
}
