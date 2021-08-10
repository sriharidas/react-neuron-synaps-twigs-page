import React from "react";
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
          <code>&lt;script src="./scripts.min.js"&gt;&lt;/script&gt;</code>
        </div>
        <a href="./../../../public/scripts.min.js" download>
          <FiDownload />
        </a>
      </div>
    </div>
  );
}
