document.addEventListener("DOMContentLoaded", () => {
  const surveyForm = document.getElementById("survey-form");

  surveyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(surveyForm);
    let formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    surveyForm.reset();
  });
});
