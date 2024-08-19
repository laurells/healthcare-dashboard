/**
 * Renders tension data (e.g., heart rate, respiratory rate, temperature) into a specified container.
 * 
 * This function takes an array of tension data and a container selector, and dynamically generates
 * HTML content to display the most recent tension data. It updates the container with this content.
 * 
 * @param {Array<Object>} tensionData - Array of objects containing tension data (e.g., heart rate, respiratory rate, temperature).
 * @param {string} container - Selector for the container element where the tension data will be rendered.
 * 
 * @throws {Error} Throws an error if the provided tensionData is not an array or is empty.
 */
export const renderTensionData = (tensionData, container) => {
  if (!Array.isArray(tensionData) || tensionData.length === 0) {
    console.error("Invalid tension data provided.");
    return;
  }

  const containerElement = $(container);
  containerElement.empty();
  
  const presData = tensionData[tensionData.length - 1];
  console.log("PresData:", presData);

  const { heart_rate, respiratory_rate, temperature } = presData;
  
  const createTensionItem = (imgSrc, title, value, status) => `
    <div class="tension-item p-4">
      <img class="lattar" src="${imgSrc}" alt="${title}" />
      <div class="mt-2">
        <h5>${title}</h5>
        <p>${value}</p>
      </div>
      <p class="status">${status}</p>
    </div>
  `;

  const tensionItemsHTML = `
    ${createTensionItem("./assets/respiratory_rate.svg", "Respiratory Rate", `${respiratory_rate.value} bpm`, respiratory_rate.levels)}
    ${createTensionItem("./assets/temperature.svg", "Temperature", `${temperature.value}°F`, temperature.levels)}
    ${createTensionItem("./assets/HeartBPM.svg", "Heart Rate", `${heart_rate.value} bpm`, heart_rate.levels)}
  `;

  containerElement.append(tensionItemsHTML);
};

/**
 * Renders a diagnostic list into a table within a specified container.
 * 
 * This function takes a list of diagnostic data and a container selector, then creates and appends
 * an HTML table to the container. Each item in the diagnostic list is represented as a row in the table.
 * 
 * @param {Array<Object>} diagnosticList - Array of objects containing diagnostic data (e.g., name, description, status).
 * @param {string} container - Selector for the container element where the diagnostic list will be rendered.
 * 
 * @throws {Error} Throws an error if the provided diagnosticList is not an array.
 */
export const renderDiagnosticData = (diagnosticList, container) => {
  if (!Array.isArray(diagnosticList)) {
    console.error("Invalid diagnostic list provided.");
    return;
  }

  const containerElement = $(container);
  containerElement.empty();

  const table = $(`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        ${diagnosticList.length === 0 ? '<tr><td colspan="3">No diagnostic data available.</td></tr>' : ''}
      </tbody>
    </table>
  `);

  diagnosticList.forEach((item) => {
    const row = $(`
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.status}</td>
      </tr>
    `);
    table.find("tbody").append(row);
  });

  containerElement.append(table);
};