init();

async function init() {
  const data = await loadData();
  console.log("data", data);
  heroData(data.general);
  personalDetailsData(data.general);
  loadProfessionalExperience(data.experience);
  loadSkills(data.skills);
  loadEducation(data.education);
  loadOptions(data.options);
}

/// Load Data
async function loadData() {
  const dataUrl =
    "https://raw.githubusercontent.com/MGonzalez2489/ManuelGonzalez/main/sources/information.json";

  let data = await fetch(dataUrl);
  data = data.json();

  return data;
}
function personalDetailsData(data) {
  const className = "personalDetails";
  const pDetailsE = document.getElementsByClassName(className)[0];
  if (!pDetailsE) {
    console.warn("Personal data element not found");
    return;
  }

  setValueToInnerElement(pDetailsE, "firstName", data.firstName, "text");
  setValueToInnerElement(pDetailsE, "lastName", data.lastName, "text");
  setValueToInnerElement(pDetailsE, "email", data.email, "text");

  //birthday
  const age = getAge(data.birthdate);
  setValueToInnerElement(pDetailsE, "age", age, "text");
}
function heroData(data) {
  const className = "hero";
  const heroE = document.getElementsByClassName(className)[0];
  const fullName = `${data.firstName} ${data.lastName}`;
  if (!heroE) {
    console.warn("Hero element not found");
    return;
  }

  setValueToInnerElement(heroE, "avatar", data.photo, "img");
  setValueToInnerElement(heroE, "name", fullName, "text");
  setValueToInnerElement(heroE, "profTitle", data.professionalTitle, "text");
  setValueToInnerElement(heroE, "heroDesc", data.description, "text");
}

function loadProfessionalExperience(data) {
  // data = [{company,title,startDate,endDate,shortDescription}]
  const className = "professionalExperience";
  const pExpE = document.getElementsByClassName(className)[0];

  if (!pExpE) {
    console.warn("Personal experience element not found");
    return;
  }

  //
  data.forEach((d) => {
    const article = document.createElement("article");
    const compName = document.createElement("h3");
    compName.innerHTML = d.company;
    const position = document.createElement("h4");
    position.innerHTML = d.title;
    const dates = document.createElement("p");
    dates.innerHTML = d.startDate;
    const description = document.createElement("p");
    description.innerHTML = d.shortDescription;

    article.appendChild(compName);
    article.appendChild(position);
    article.appendChild(dates);
    article.appendChild(description);

    pExpE.appendChild(article);
  });
}

function loadSkills(data) {
  //data = [{name,icon,group}]
  const className = "skills";
  const sE = document.getElementsByClassName(className)[0];

  if (!sE) {
    console.warn("Skills element not found");
    return;
  }

  data.forEach((s) => {
    const article = document.createElement("article");
    const name = document.createElement("h3");
    name.innerHTML = s.name;
    const img = document.createElement("img");
    img.src = s.icon;
    img.alt = s.name;
    const group = document.createElement("span");
    group.innerHTML = s.group;

    article.appendChild(name);
    article.appendChild(img);
    article.appendChild(group);

    sE.appendChild(article);
  });
}

function loadEducation(data) {
  const className = "education";
  const eE = document.getElementsByClassName(className)[0];

  if (!eE) {
    console.warn("Education element not found");
    return;
  }

  data.forEach((e) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    title.innerHTML = e.title;
    const school = document.createElement("h4");
    school.innerHTML = e.school;
    const dates = document.createElement("span");
    dates.innerHTML = `${e.startDate} - ${e.endDate}`;

    const desc = document.createElement("p");
    desc.innerHTML = e.description;

    article.appendChild(title);
    article.appendChild(school);
    article.appendChild(dates);
    article.appendChild(desc);

    eE.appendChild(article);
  });
}

function loadOptions(data) {
  //Language Options
  const select = document.getElementById("languageOptions");

  data.language.forEach((l) => {
    const item = document.createElement("option");
    item.value = l.value;
    item.text = l.value;
    select.appendChild(item);
  });
}

//helpers
function setValueToElementById(elementId, value) {
  document.getElementById(elementId).innerHTML = value;
}
function setValueToInnerElement(element, id, value, type) {
  if (type === "text") {
    element.querySelector(`#${id}`).innerHTML = value;
  }
  if (type === "img") {
    element.querySelector(`#${id}`).src = value;
  }
}
function getAge(birthdate) {
  const today = new Date();
  birthdate = new Date(birthdate);

  const age =
    today.getFullYear() -
    birthdate.getFullYear() -
    (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate()));

  return age;
}
