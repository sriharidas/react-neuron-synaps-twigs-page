import React, { useEffect } from "react";
export default function GenerateSitemap() {
  useEffect(() => {
    // let reader = new File();
    // reader.onload = handleFile;
  }, []);
  const handleFile = (e) => {
    console.log(e.target);
  };
  return (
    <div>
      <input
        type="file"
        accept=".xml"
        name="sitemapInput"
        id="sitemapInput"
        onInput={handleFile}
      />
    </div>
  );
}
