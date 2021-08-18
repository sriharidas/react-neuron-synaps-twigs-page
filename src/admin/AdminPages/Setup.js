import React from "react";
import { Link } from "react-router-dom";
import { RiFileCopyLine } from "react-icons/ri";
// import generateSpotToken from "./../../../public/scripts.min.js";

import { FiDownload } from "react-icons/fi";
export default function Setup() {
  return (
    <div className="setup-container">
      <div className="setup-section-1">
        <div>
          <h4>How to include our script files in your project?</h4>
          <p>steps</p>
          <ul>
            <li>
              Download our script file by clicking the download icon{" "}
              <FiDownload />
            </li>
            <li>Move the script file to your project directory</li>
            <li>
              include a &lt;script&gt; &lt;/script&gt; on your project file
            </li>
            <li>
              provide relative path to the downloaded script file in 'src'
              attribute like shown below
            </li>
          </ul>
          <code
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span id="script-code">
              &lt;script src="./scripts.min.js"&gt;&lt;/script&gt;
            </span>
            <span
              className="script-code-copy"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const script = document.querySelector("#script-code");
                const scriptText = script.innerText
                  .replace(" &lt;", "<")
                  .replace("&gt", ">");
                console.log(scriptText);
                navigator.clipboard.writeText(scriptText);
                document.querySelector(".script-code-copy").innerText =
                  "copied!";
              }}
            >
              <RiFileCopyLine />
            </span>
          </code>
          <code
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span id="script-code-1">
              &lt;button onclick=&quot;generateSpotToken()&quot;&gt; generate
              token &lt;/button&gt;
            </span>
            <span
              className="script-code-copy-1"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                const script = document.querySelector("#script-code-1");
                const scriptText = script.innerText
                  .replace(" &lt;", "<")
                  .replace("&gt", ">");
                console.log(scriptText);
                navigator.clipboard.writeText(scriptText);
                document.querySelector(".script-code-copy-1").innerText =
                  "copied!";
              }}
            >
              <RiFileCopyLine />
            </span>
          </code>
        </div>
        {/* <a href={require("src/scripts.min.js")} download></a> */}
        <Link to="/files/scripts.min.js" target="_blank" download>
          <FiDownload />
        </Link>
      </div>
    </div>
  );
}
