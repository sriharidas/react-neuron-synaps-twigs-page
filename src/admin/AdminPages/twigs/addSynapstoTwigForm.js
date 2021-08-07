import React, { useEffect } from "react";

export default function AddSynapstoTwigForm({
  display,
  UpdateDisplay,
  twig,
  edgeSynaps,
  selectedSynaps,
  setSelectedSynaps,
  userData,
}) {
  useEffect(() => {
    console.log("selected", selectedSynaps);
    const checkboxGroup = document.querySelector(".twigs-checkbox-group");
    if (display && checkboxGroup) {
      console.log("checkbox", checkboxGroup);
      if (Object.keys(edgeSynaps).length >= 10)
        checkboxGroup.style.display = "grid";
      else checkboxGroup.style.display = "block";
    }
  }, [edgeSynaps, selectedSynaps, display]);
  const handleChanage = (e) => {
    //   checking whether checkbox is selected
    if (e.target.checked === true) {
      var existing = false;
      const selectedValue = [
        {
          id: e.target.name.split("-")[0],
          name: e.target.name.split("-")[1],
        },
      ];
      //   checking whether selected syanp already exists in state
      selectedSynaps.length > 0 &&
        selectedSynaps.forEach((x) => {
          if (x.id === e.target.name.split("-")[0]) {
            existing = true;
            return;
          }
        });
      // if selected synap doesn't exist already, updating selected synaps state
      existing !== true && selectedSynaps.length > 0
        ? setSelectedSynaps((prevState) => [...prevState, ...selectedValue])
        : setSelectedSynaps([...selectedValue]);
    }
    // removing unchecked synaps from state
    if (
      e.target.checked === false &&
      Object.keys(selectedSynaps).indexOf(e.target.name.split("-")[0]) === -1
    ) {
      const newValue = [];

      selectedSynaps.forEach((x) => {
        if (x.id !== e.target.name.split("-")[0]) {
          newValue.push(x);
        }
      });
      console.log("new value", newValue);
      setSelectedSynaps(newValue);
    }
    // console.log(e.target.name, e.target.checked);
  };
  const connectTwigSynap = (e) => {
    e.preventDefault();
    selectedSynaps.forEach((item) => {
      const data = {
        email: userData.email,
        twig_id: Number(twig.id),
        synap_id: Number(item.id),
      };
      console.log(JSON.stringify(data));
      fetch("https://neurontech.herokuapp.com/twigs/bond/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          window.location.reload();
        });
    });
    UpdateDisplay(false);
  };
  return (
    display && (
      <div className="twigs-form-container">
        <div className="twigs-form-main">
          <h2>
            Add Synap(s) <button onClick={() => UpdateDisplay(false)}>X</button>
          </h2>
          <form onSubmit={connectTwigSynap} method="POST">
            <div className="form-input-group">
              <label>selected Twig</label>
              <select aria-readonly>
                <option>{twig.id + " - " + twig.name}</option>
              </select>
            </div>
            <div className="form-input-group">
              <label>Select synaps</label>
              <div className="twigs-checkbox-group">
                {Object.keys(edgeSynaps).map((x) => (
                  <div>
                    <input
                      id={`${x}-${edgeSynaps[x]}`}
                      name={`${x}-${edgeSynaps[x]}`}
                      type="checkbox"
                      onChange={handleChanage}
                    />
                    <label htmlFor={`${x}-${edgeSynaps[x]}`}>
                      {`${edgeSynaps[x]}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <button type="submit">Link</button>
          </form>
        </div>
      </div>
    )
  );
}
