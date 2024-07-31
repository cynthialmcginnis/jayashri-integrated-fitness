console.log('JavaScript loaded');
// Define WorkoutPlan custom element
class WorkoutPlan extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 5px;
        }
        h3 {
          color: var(--primary-color, #ff6600);
        }
      </style>
      <h3>${this.getAttribute('name') || 'Workout Plan'}</h3>
      <slot></slot>
    `;
  }
}

// Define TrainerProfile custom element
class TrainerProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 5px;
          text-align: center;
        }
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }
        h3 {
          color: var(--primary-color, #ff6600);
        }
      </style>
      <img src="${this.getAttribute('img')}" alt="${this.getAttribute('name')}">
      <h3>${this.getAttribute('name')}</h3>
      <slot></slot>
    `;
  }
}

// Define NutritionTracker custom element
class NutritionTracker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 5px;
        }
        h3 {
          color: var(--primary-color, #ff6600);
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
      </style>
      <h3>${this.getAttribute('name') || 'Nutrition Plan'}</h3>
      <slot></slot>
    `;
  }
}

// Register custom elements
customElements.define('workout-plan', WorkoutPlan);
customElements.define('trainer-profile', TrainerProfile);
customElements.define('nutrition-tracker', NutritionTracker);

// Example of dynamic content loading
document.addEventListener('DOMContentLoaded', () => {
  // Simulate loading workout plans from an API
  fetch('/api/workout-plans')
    .then(response => response.json())
    .then(plans => {
      const classesSection = document.getElementById('classes');
      plans.forEach(plan => {
        const workoutPlan = document.createElement('workout-plan');
        workoutPlan.setAttribute('name', plan.name);
        workoutPlan.innerHTML = `
          <p>${plan.description}</p>
          <ul>
            <li>Duration: ${plan.duration}</li>
            <li>Intensity: ${plan.intensity}</li>
            <li>Equipment: ${plan.equipment}</li>
          </ul>
        `;
        classesSection.appendChild(workoutPlan);
      });
    })
    .catch(error => console.error('Error loading workout plans:', error));
});
