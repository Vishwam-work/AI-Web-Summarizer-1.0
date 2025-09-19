const GEMINI_API_KEY = "<API-KEY>";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SUMMARIZE_TEXT") {
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `Summarize this content:\n\n${message.payload}` }] }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
      sendResponse({ summary });
    })
    .catch(err => {
      sendResponse({ summary: "Error: " + err.message });
    });

    return true; // keep message channel open
  }
});
