import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import Layout from "../layout/Layout";
import "./applicationPage.css";

/*
id INT AUTO_INCREMENT PRIMARY KEY,
    hearAbout INT,
    position VARCHAR(255),
    workTime VARCHAR(255),
    start VARCHAR(255),
    name VARCHAR(255),
    curAddress VARCHAR(255),
    permAddress VARCHAR(255),
    contactInfo VARCHAR(255),
    preferredContact VARCHAR(255),
    authorized INT,
    sponsorship INT,
    everApplied INT,
    everEmployed INT,
    pastEmployment LONGTEXT,
    highschool VARCHAR(255),
    university VARCHAR(255),
    gradUniversity VARCHAR(255),
    other VARCHAR(255),
    skills VARCHAR(255)
*/
interface Positions {
  id: number;
  title: string;
  employment: string;
  description: string;
  department: string;
  classification: string;
  info: string;
}
const applicationPage = () => {
  //use state variables to store all information to post
  
  //can either have one big state variable, or seperate them out into their own, either works fine
  //separating them here for easier bug fixing
  const [openPositions, setOpenPositions] = useState<Positions[]>([]);

  const [hearAbout, setHearAbout] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [workTime, setWorkTime] = useState({
    fullTime: false,
    partTime: false,
    temporary: false,
    evenings: false,
    weekends: false,
    nights: false
  })
  const [startTime, setStartTime] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [permAdress, setPermAdress] = useState('')
  const [permCity, setpermCity] = useState('')
  const [permState, setpermState] = useState('')
  const [permZip, setpermZip] = useState('')

  useEffect(() => {
    getPositionOpenings();
    console.log(workTime)
  }, []);

  //get current posisitions for <select>
  const getPositionOpenings = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/jobs");
      let data = await response.json();

      console.log("open positions", data);
      setOpenPositions(data);
    } catch (error) {
      console.error("unable to fetch open positions");
    }
  };
  
  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, checked } = event.target;

    setWorkTime((prevState) => ({
      ...prevState,
      [name]: checked
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //store urls in env variable, but keep this local host for now
    const response = await fetch(`http://localhost:3000/api/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hear_about: hearAbout,
        position: position,
        work_time: workTime,
        start_time: startTime,
        fullName: fullName,
        address: address,
        city: city,
        state: state,
        zip: zip,
        permAdress: permAdress,
        permCity: permCity,
        permState: permState,
        permZip: permZip
      }),
    });
    if (response.ok) {
      console.log("form submitted");
    } else {
      console.error("error submitting form");
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto bg-maroon" id="job-page">
          <h2 className="text-center text-2xl text-white p-2">Application</h2>
        </div>
        <div id="bg" className="bg-gray-100 flex justify-center p-5">
          <form className="job-form" onSubmit={handleSubmit}>
            <h2 className="p-5 text-xl" id="position-header">How did you hear about Bethel?</h2>
            <div className="px-5">
              <div>
                <input
                  type="radio"
                  id="Indeed"
                  name="hear_about"
                  value="Indeed"
                  checked={hearAbout === "Indeed"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label htmlFor="Indeed">Indeed</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="HACU"
                  name="hear_about"
                  value="HACU"
                  checked={hearAbout === "HACU"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label htmlFor="HACU">HACU</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Academic-Diversity-Search"
                  name="hear_about"
                  value="Academic-Diversity-Search"
                  checked={hearAbout === "Academic-Diversity-Search"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label htmlFor="Academic-Diversity-Search">
                  Academic Diversity Search
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Higher-Ed-Jobs"
                  name="hear_about"
                  value="Higher-Ed-Jobs"
                  checked={hearAbout === "Higher-Ed-Jobs"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label htmlFor="Higher-Ed-Jobs">Higher Ed Jobs</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="hear_about"
                  value="other"
                  checked={hearAbout === "other"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <h2 className="p-5 text-xl">Position applying for</h2>
            <div className="px-5">
              <select
                name="job-applying-for"
                id="job-applying-for"
                className="bg-slate-200"
                onChange={(e) => {
                  const selectedOption = e.target.selectedOptions[0];
                  setPosition(selectedOption.text);
                }}
              >
                <option value="">Choose an option</option>
                {openPositions.map((positions) => (
                  <option key={positions.id} value={positions.id} className="bg-white">
                    {positions.title}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="p-5 text-xl">Working Time</h2>
            <div className="px-5">
            <div>
              <input
                type="checkbox"
                id="FullTime"
                name="fullTime"
                value="Full-Time"
                checked={workTime.fullTime}
                onChange={handleWorkTimeChange}
              />
              <label htmlFor="fullTime">Full Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="PartTime"
                name="partTime"
                value="Part-Time"
                checked={workTime.partTime}
                onChange={handleWorkTimeChange}
              />
              <label htmlFor="partTime">Part Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="temporary"
                name="temporary"
                value="Temporary"
                checked={workTime.temporary}
                onChange={handleWorkTimeChange}
              />
              <label htmlFor="temporary">Temporary</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="evenings"
                name="evenings"
                value="Evenings"
                checked={workTime.evenings}
                onChange={handleWorkTimeChange}
              />
              <label htmlFor="evenings">Evenings</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="weekends"
                name="weekends"
                value="Weekends"
                checked={workTime.weekends}
                onChange={handleWorkTimeChange}
              />
              <label htmlFor="weekends">Weekends</label>
              <div>
                <input
                  type="checkbox"
                  id="nights"
                  name="nights"
                  value="Nights"
                  checked={workTime.nights}
                  onChange={handleWorkTimeChange}
                />
                <label htmlFor="nights">Nights</label>
              </div>
            </div>
            </div>
            <h2 className="p-5 text-xl">When are you available to start?</h2>
            <div className="applying-for">
                <input
                type="date"
                name="start-time"
                className="border border-gray-200 rounded-xl p-2"
                onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <h2 className="p-5 text-xl">Personal Information</h2>
              <div className="px-5">
                <input 
                type="text"
                id="first-name"
                name="first-name" 
                placeholder="Enter full name..."
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setFullName(e.target.value)} />
              </div>
              <h2 className="p-5 text-xl">Current Address</h2>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="address-street"
                name="address-street" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setAddress(e.target.value)} />
                <label htmlFor="address-street">Address</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="city"
                name="city" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setCity(e.target.value)} />
                <label htmlFor="city">City</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="state"
                name="state" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setState(e.target.value)} />
                <label htmlFor="state">State</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="zip"
                name="zip" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setZip(e.target.value)} />
                <label htmlFor="zip">Zip</label>
              </div>
              <h2 className="p-5 text-xl">Permenant Address If Different From Above</h2>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-address-street"
                name="perm-address-street" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setPermAdress(e.target.value)} />
                <label htmlFor="perm-address-street">Address</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-city"
                name="perm-city" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermCity(e.target.value)} />
                <label htmlFor="perm-city">City</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-state"
                name="perm-state" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermState(e.target.value)} />
                <label htmlFor="perm-state">State</label>
              </div>
              <div className="px-5 flex flex-col-reverse">
                <input 
                type="text"
                id="perm-zip"
                name="perm-zip" 
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) => setpermZip(e.target.value)} />
                <label htmlFor="perm-zip">Zip</label>
              </div>
            <input type="submit"></input>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default applicationPage;
