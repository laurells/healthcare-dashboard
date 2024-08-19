import { fetchData } from "./data.js";
import { renderPatientsData, renderPatientDetails } from "./dashboard.js";

const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
const patientEntry = ".patients-list";
const patientDetails = ".pat-info";

/**
 * Loads patient data from the API and renders it to the DOM.
 * 
 * This function fetches the patient data from the API and uses the rendering functions to display 
 * patient information and details on the page. It handles errors during the fetch operation and
 * ensures that the data is correctly formatted before rendering.
 */

const loadPatientData = async () => {
  try {
    const data = await fetchData(url);
    console.log("API Data:", data);
    
    if (data && typeof data === 'object') {
      renderPatientsData(data, patientEntry);
      renderPatientDetails(data, patientDetails);
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

loadPatientData();
