function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}


document.getElementById("summarize").addEventListener("click", () => {
  const result = document.getElementById("result");
  result.textContent = "Extracting and summarizing...";

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, ({ text }) => {
      chrome.runtime.sendMessage(
        { type: "SUMMARIZE_TEXT", payload: text },
        (response) => {
          result.textContent = response.summary;
          document.getElementById("copyBtn").style.display = "block";
        }
      );
    });
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Summary copied to clipboard!");
  });
});
