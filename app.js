"use strict";

const input = document.getElementById("mainInput");
const output = document.getElementById("mainOutput");
const outputCont = document.getElementById("outputContainer");
const charCount = document.getElementById("charCount");
const copyBtn = document.getElementById("copyBtn");

input.addEventListener("input", () => {
  charCount.innerText = `${input.value.length.toLocaleString("en-US")} characters`;
});

function process(type) {
  const raw = input.value;
  if (!raw.trim()) return;

  let result = "";
  switch (type) {
    case "pdf":
      // Connects hyphenated words and fixes broken line breaks
      result = raw
        .replace(/(\w)-\s*\n\s*(\w)/g, "$1$2")
        .replace(/([^.!?])\s*\n\s*/g, "$1 ");
      break;
    case "html":
      // Strips all HTML tags while preserving text
      const temp = document.createElement("div");
      temp.innerHTML = raw;
      result = temp.textContent || temp.innerText || "";
      break;
    case "markdown":
      // Excel/Tab to Markdown Table conversion
      // Escape characters that would break a markdown table cell:
      //   \  -> \\   (backslash first, before we add new backslashes)
      //   |  -> \|   (pipe is the table column separator)
      //   \n -> <br> (in-cell newlines from multi-line Excel cells)
      const escapeMdCell = (s) =>
        s
          .replace(/\\/g, "\\\\")
          .replace(/\|/g, "\\|")
          .replace(/\r?\n/g, "<br>");
      const lines = raw.trim().split("\n");
      result = lines
        .map((l, i) => {
          const cols = l.split("\t").map((c) => escapeMdCell(c.trim()));
          let r = `| ${cols.join(" | ")} |`;
          if (i === 0) {
            const sep = `\n| ${cols.map(() => "---").join(" | ")} |`;
            return r + sep;
          }
          return r;
        })
        .join("\n");
      break;
    case "ai":
      // Trims excess spaces and empty lines for token optimization
      result = raw
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== "")
        .join("\n")
        .replace(/[ \t]+/g, " ");
      break;
  }

  output.innerText = result;
  outputCont.classList.remove("hidden");
  outputCont.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Tool button handlers (CSP-friendly, no inline onclick)
document.querySelectorAll(".btn-tool").forEach((btn) => {
  btn.addEventListener("click", () => process(btn.dataset.action));
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.innerText);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    copyBtn.style.background = "#10b981"; // Green feedback
    setTimeout(() => {
      copyBtn.innerText = originalText;
      copyBtn.style.background = "var(--accent)";
    }, 1500);
  } catch (err) {
    copyBtn.innerText = "Copy failed";
    setTimeout(() => {
      copyBtn.innerText = "Copy to Clipboard";
    }, 1500);
  }
});
