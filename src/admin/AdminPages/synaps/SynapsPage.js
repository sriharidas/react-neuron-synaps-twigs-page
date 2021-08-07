// import React, { useState, useEffect } from "react";
// import { IoMdAdd } from "react-icons/io";
// import Login from "./../form/Login";
// // import "./../css/synap.css";
// export default function SynapsPage() {
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("loginData"))
//   );
//   const [Synaps, setSynaps] = useState({});
//   const [SynapsValues, setSynapsValue] = useState({});
//   const [login, setLogin] = useState(false);
//   const [createSnap, setCreateSnap] = useState({});
//   const fetchSynaps = (e) => {
//     if (e.target.value === "") {
//       setSynaps({});
//       return;
//     }
//     setSynaps({
//       id: e.target.value.split("_")[0],
//       name: e.target.value.split("_")[1],
//     });
//     console.log("option", e.target.value);
//   };
//   useEffect(() => {
//     console.log(Synaps);
//     const data = JSON.stringify({
//       synap: Synaps,
//     });
//     // console.log(data);
//     fetch("https://neurontech.herokuapp.com/synapses/fetch/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: data,
//     })
//       .then((resp) => resp.json())
//       .then((resp) => {
//         console.log("child Synaps", resp);
//         setSynapsValue(resp);
//       });
//   }, [Synaps]);
//   const createSnapFunc = (e) => {
//     e.preventDefault();
//     const synapFrom = document.querySelector(".synap-form");
//     const synapData = document.querySelector("#create-synap");
//     synapFrom.style.display = "none";
//     let layer;
//     console.log(Object.keys(userData.synaps).includes(Synaps.id));
//     layer = Object.keys(userData.synaps).includes(Synaps.id) ? 0 : 1;
//     setCreateSnap({
//       user_email: userData.email,
//       synap_layer: layer,
//       parent_number: Synaps.id,
//       parent_name: Synaps.name,
//       child_name: synapData.value,
//     });
//   };
//   useEffect(() => {
//     console.log(createSnap);
//     // fetch("https://neurontech.herokuapp.com/synapses/create/", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "Application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     snap_data: createSnap,
//     //   }),
//     // })
//     //   .then((resp) => resp.json())
//     //   .then((resp) => console.log(resp));
//   }, [createSnap]);
//   return (
//     <div className="synaps-container">
//       <div className="synaps-header">
//         <h3>Synaps Page</h3>
//       </div>
//       <div className="synaps-main">
//         {/* Base Synapses */}
//         {typeof userData.synaps === "string" ? (
//           <p>{userData.synaps}</p>
//         ) : (
//           <>
//             <p>Base Synap</p>
//             <select onChange={fetchSynaps}>
//               <option value="">select</option>
//               {Object.keys(userData.synaps).map((x) => (
//                 <option value={x + "_" + userData.synaps[x]}>
//                   {x} - {userData.synaps[x]}
//                 </option>
//               ))}
//             </select>
//             <button
//               className="add-base-synap"
//               onClick={() =>
//                 (document.querySelector(".synap-form").style.display = "flex")
//               }
//             >
//               <IoMdAdd />
//             </button>
//           </>
//         )}
//         {/* Add Synapse Form */}
//         <div className="synap-form">
//           <div className="synap-form-wrapper">
//             <h2>Create a snap</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 document.querySelector(".synap-form").style.display = "none";
//               }}
//             >
//               <input
//                 name="create-synap"
//                 id="create-synap"
//                 placeholder="enter the synap name"
//               />
//               <button type="submit" onClick={createSnapFunc}>
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//         {/* child Synapses */}
//         <div>
//           {Object.keys(SynapsValues).length >= 0 ? (
//             <>
//               <p>Child Synaps of {Synaps["name"]} </p>
//               <select onChange={fetchSynaps}>
//                 {Object.keys(SynapsValues).map((id) => (
//                   <option
//                     value={`${id}_${SynapsValues[id]}`}
//                   >{`${id} - ${SynapsValues[id]}`}</option>
//                 ))}
//               </select>
//               <button
//                 className="add-child-synap"
//                 onClick={() =>
//                   (document.querySelector(".synap-form").style.display = "flex")
//                 }
//               >
//                 <IoMdAdd />
//               </button>
//             </>
//           ) : (
//             <p>No children of synap {Synaps.name}</p>
//           )}
//         </div>
//         <Login open={login} setState={setLogin} redirect={true} />
//       </div>
//     </div>
//   );
// }
