/**
 * Custom plugin for Chart.js.
 * 
 * This plugin customizes the legend generation for Chart.js charts by providing
 * a detailed, styled legend that includes information such as the maximum or 
 * minimum values for each dataset and relevant icons.
 * 
 * @type {Object}
 * @property {Function} beforeInit - Hook that runs before the chart is initialized.
 */
export const legendPlugin = {
  /**
   * Runs before the chart is initialized to override the default legend generation.
   * 
   * This method customizes the legend by defining a custom `generateLegend` function
   * that creates HTML content for the legend based on the dataset properties.
   * 
   * @param {Chart} chart - The Chart.js chart instance.
   */
  beforeInit: function (chart) {
    /**
     * Customizes the legend HTML for the chart.
     * 
     * The custom legend includes:
     * - The color associated with each dataset.
     * - The dataset label.
     * - Calculated values such as the maximum or minimum value for specific datasets.
     * - Icons and descriptions based on the dataset label.
     * 
     * @returns {jQuery} - A jQuery object containing the generated legend HTML.
     */
    chart.generateLegend = () => {
      const legendHTML = $('<div class="legend-details"></div>');

      chart.data.datasets.forEach((dataset) => {
        const { borderColor, label, data } = dataset;
        const legendColor = borderColor || '#000'; // Fallback color if borderColor is not set
        const labelText = label || 'Unknown'; // Fallback label if label is not set

        let value = 'N/A';
        let icon = 'DefaultIcon.svg';
        let iconLabel = 'No Data';

        if (labelText === "Systolic") {
          value = data.length ? Math.max(...data) : 'N/A'; // Calculate max value if data is not empty
          icon = "ArrowUp.svg";
          iconLabel = "Higher than Average";
        } else if (labelText === "Diastolic") {
          value = data.length ? Math.min(...data) : 'N/A'; // Calculate min value if data is not empty
          icon = "ArrowDown.svg";
          iconLabel = "Lower than Average";
        }

        const legendItem = $(`
            <div class="legend-item">
              <div class="d-flex bold align-items-center gap-1">
                <span class="legend-color" style="background-color: ${legendColor};"></span>
                ${labelText}
              </div>
              <p>${value}</p>
              <div class="d-flex caret align-items-center gap-1">
                <img src="./public/${icon}" alt="${iconLabel}" />
                <span>${iconLabel}</span>
              </div>
            </div>
          `);

        legendHTML.append(legendItem);
      });

      return legendHTML;
    };
  },
};
