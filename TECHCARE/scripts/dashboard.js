import { chart } from "../lib/chart.js";
import { renderTensionData, renderDiagnosticData } from "./patientDiagnostic.js";

/**
 * Renders a list of patient cards into the specified container.
 * 
 * Each card displays basic patient information and includes an avatar image. 
 * The card of the patient named "Jessica Taylor" is highlighted with an extra class.
 * 
 * @param {Array} data - An array of patient objects containing basic information.
 * @param {string} container - CSS selector for the HTML element.
 */

export const renderPatientsData = (data, container) => {
  const fragment = $(document.createDocumentFragment());

  data.forEach((patient) => {
    const { name, gender, age, profile_picture } = patient;

    const patientCard = $("<div>").addClass("patient");
    const patientCardDetails = $("<div>").addClass("d-flex gap-2 patient-details");

    const avatar = $("<img>")
      .addClass("avatar")
      .attr("src", profile_picture)
      .attr("alt", `${name}'s profile picture`);
    
    if (name === "Jessica Taylor") {
      patientCard.addClass("active-patient");
    }
    
    patientCardDetails.append(avatar);

    const detailsDiv = $("<div>");
    const nameParagraph = $("<p>").addClass("name").text(name);
    detailsDiv.append(nameParagraph);

    const genderAgeSpan = $("<span>").text(`${gender}, ${age}`);
    detailsDiv.append(genderAgeSpan);

    patientCardDetails.append(detailsDiv);

    const moreBtn = $("<img>")
      .addClass("more-btn")
      .attr("src", "./public/more_vert.png")
      .attr("alt", "More options");
    
    patientCard.append(patientCardDetails).append(moreBtn);

    fragment.append(patientCard); // Append to fragment
  });

  $(container).append(fragment); // Append the fragment to the container
};

/**
 * Renders detailed information for a specific patient into the specified container.
 * 
 * This function displays comprehensive details for the patient named "Jessica Taylor", including profile picture,
 * basic information, lab results, and charts. It also renders additional visualizations.
 * 
 * @param {Array} patientData - Array of patient objects containing detailed information.
 * @param {string} container - CSS selector for the HTML element where the patient details will be rendered.
 */

export const renderPatientDetails = (patientData, container) => {
  const patient = patientData.find(patient => patient.name === "Jessica Taylor");

  if (!patient) {
    console.error("Patient 'Jessica Taylor' not found.");
    return;
  }

  console.log("Patient Data:", patient);

  const {
    name,
    profile_picture,
    date_of_birth,
    gender,
    phone_number,
    emergency_contact,
    insurance_type,
    lab_results,
    diagnosis_history,
    diagnostic_list,
  } = patient;

  $(container).empty();

  const $patientInfo = $('<div class="col d-flex-col pat-info"></div>');

  const $aside = $('<aside class="mb-4"></aside>');
  $aside.append(`
      <img class="pro-pic" 
     src="${profile_picture}" 
     srcset="${profile_picture}?w=100 100w, ${profile_picture}?w=200 200w, ${profile_picture}?w=400 400w" 
     sizes="(max-width: 600px) 100px, (max-width: 1200px) 200px, 400px" 
     alt="${name}'s profile picture">
      <h2>${name}</h2>
      <div class="align-self-start patient-more-details">
        <div class="date_of_birth">
          <img src="./public/BirthIcon.png" alt="Date of Birth">
          <span>
            <p>Date of Birth</p>
            <p>${date_of_birth}</p>
          </span>
        </div>
        <div class="gender">
          <img src="./public/FemaleIcon.png" alt="Gender">
          <span>
            <p>Gender</p>
            <p>${gender}</p>
          </span>
        </div>
        <div class="contact">
          <img src="./public/PhoneIcon.png" alt="Contact Info">
          <span>
            <p>Contact Info.</p>
            <p>${phone_number}</p>
          </span>
        </div>
        <div class="emergency-contact">
          <img src="./public/PhoneIcon.png" alt="Emergency Contact">
          <span>
            <p>Emergency Contact.</p>
            <p>${emergency_contact}</p>
          </span>
        </div>
        <div class="insurance-provider">
          <img src="./public/InsuranceIcon.png" alt="Insurance Provider">
          <span>
            <p>Insurance Provider</p>
            <p>${insurance_type}</p>
          </span>
        </div>
      </div>
      <button type="button">Show All Information</button>
    `);

  const $labResults = $("<aside></aside>");
  const $labsContainer = $('<div class="align-self-start d-flex-col lab-container w-100"></div>');

  $labsContainer.append("<h2>Lab Results</h2>");
  lab_results.forEach((result) => {
    $labsContainer.append(`
        <div class="d-flex justify-content-between p-1 align-items-center w-100">
          <p class="mb-0">${result}</p>
          <img src="./public/download.png" alt="Download result">
        </div>
    `);
  });
  $labResults.append($labsContainer);

  $patientInfo.append($aside, $labResults);
  $(container).append($patientInfo);

  const $chartEntry = $(".chart-container");
  chart(diagnosis_history, $chartEntry);

  const tensionEntry = $(".tension-stats");
  renderTensionData(diagnosis_history, tensionEntry);

  const $diagnosticList = $(".diagnostic-list");
  renderDiagnosticData(diagnostic_list, $diagnosticList);
};
