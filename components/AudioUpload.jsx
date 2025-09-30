import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
const AudioUpload = ({ audioFile, onAudioUpload, videoDuration, audioRef, audioUrl }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAudioUpload(file);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "1" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 14,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Upload Your Music" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 15,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "file-upload", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "audio-upload", className: "upload-btn", children: "Choose Audio File" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          id: "audio-upload",
          type: "file",
          accept: "audio/*",
          onChange: handleFileChange
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 21,
          columnNumber: 9
        }
      ),
      audioFile && /* @__PURE__ */ jsxDEV("div", { className: "file-name", children: [
        "Selected: ",
        audioFile.name,
        " (",
        videoDuration,
        "s)"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 28,
        columnNumber: 11
      }),
      audioUrl && /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl, style: { display: "none" } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 12,
    columnNumber: 5
  });
};
export {
  AudioUpload
};
