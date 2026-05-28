export default class Alert {
  constructor() {
    this.path = "../json/alerts.json";
  }

  async getAlerts() {
    const response = await fetch(this.path);

    if (response.ok) {
      return await response.json();
    }

    return [];
  }

  async renderAlerts() {
    const alerts = await this.getAlerts();

    // Stop if no alerts
    if (!alerts.length) return;

    // Create section
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // Loop through alerts
    alerts.forEach((alert) => {
      const p = document.createElement("p");

      p.textContent = alert.message;

      // Apply styles
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;

      p.style.padding = "1rem";
      p.style.margin = "0";
      p.style.textAlign = "center";
      p.style.fontWeight = "bold";

      alertSection.appendChild(p);
    });

    // Add alerts to top of main
    const main = document.querySelector("main");

    main.prepend(alertSection);
  }
}