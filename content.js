function extractMainText() {
  const articleTags = document.querySelectorAll('article, p, div');
  let text = '';

  articleTags.forEach(el => {
    const content = el.innerText.trim();
    if (content.length > 50) {
      text += content + '\n\n';
    }
  });

  return text || "No relevant content found.";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ARTICLE_TEXT") {
    const extractedText = extractMainText();
    sendResponse({ text: extractedText });
  }
});
