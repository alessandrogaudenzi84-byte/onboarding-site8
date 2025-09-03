// JavaScript utilities for the onboarding site

/**
 * Initialise task lists on a given page.
 *
 * Each checkbox with the class `task-checkbox` will store its checked
 * status in localStorage using the provided key and its index within
 * the page. The overall progress will be reflected by a progress bar
 * element with the class `progress-bar`.
 *
 * @param {string} pageKey A unique key for the page (e.g. 'allineamento').
 */
function initTasks(pageKey) {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const progressBar = document.querySelector('.progress-bar');

  function updateProgress() {
    const total = checkboxes.length;
    let completed = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) completed++;
    });
    const percent = total > 0 ? (completed / total) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  }

  checkboxes.forEach((checkbox, index) => {
    const storageKey = `${pageKey}-task-${index}`;
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue === 'true') {
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
      localStorage.setItem(storageKey, checkbox.checked);
      updateProgress();
    });
  });

  // initial update
  updateProgress();
}

/**
 * Save quiz responses to localStorage. Each input with the class
 * `quiz-answer` will have its value stored under a key derived from
 * the provided quiz identifier and its index.
 *
 * @param {string} quizKey A unique key for the quiz (e.g. 'quiz').
 */
function saveQuizResponses(quizKey) {
  const inputs = document.querySelectorAll('.quiz-answer');
  inputs.forEach((input, index) => {
    const storageKey = `${quizKey}-answer-${index}`;
    localStorage.setItem(storageKey, input.value);
  });
  // Provide basic user feedback
  alert('Grazie per le tue risposte!');
}

// Expose functions to the global scope so they can be called from inline
// event handlers in the HTML.
window.initTasks = initTasks;
window.saveQuizResponses = saveQuizResponses;