import React, { useState, useEffect } from "react";
import CreateSnapForm from "./../synaps/CreateSnapForm";
export default function ViewSitemap() {
  const [Sitemap, setSitemap] = useState({});
  const [displayForm, setDisplayForm] = useState(false);
  const fetchInitialSitemaps = async () => {
    const response = await fetch("/gloria/sitemap/fetch/initial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "sriharidas2002@gmail.com",
        session_token: "testsession",
      }),
    });
    const data = await response.json();
    setSitemap((prev) => ({
      ...prev,
      sitemap: data["result"],
    }));
  };
  const fetchAddSitemap = async (value) => {
    let reqData = {
      email: "sriharidas2002@gmail.com",
      session_token: "testsession",
      sites_list: [value],
    };
    const response = await fetch("/gloria/sitemap/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const data = await response.json();
    console.log("added sitemap", data);
    window.location.reload();
  };
  useEffect(() => {
    fetchInitialSitemaps();
  }, []);
  useEffect(() => {
    console.log("data", Sitemap);
  }, [Sitemap]);

  const createSitemap = () => {
    let data = document.querySelector("#create-sitemap").value;
    fetchAddSitemap(data);
  };
  return (
    <div className="sitemap-view-container">
      <h3>
        Sitemaps{" "}
        <button onClick={() => setDisplayForm(true)}>+ add sitemap</button>
      </h3>

      {Object.keys(Sitemap).length > 0 && Sitemap.sitemap !== undefined
        ? Object.keys(Sitemap.sitemap).map((x) => (
            <div>
              <span> {x} </span>
              <span> - </span>
              <span> {Sitemap.sitemap[x]} </span>
            </div>
          ))
        : "No Data"}

      <CreateSnapForm
        placeholder="Add Sitemap"
        label="sitemap"
        createSnapFunc={createSitemap}
        display={displayForm}
        updateDisplay={setDisplayForm}
      />
    </div>
  );
}
