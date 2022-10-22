function openPage(pageName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "flex";
}
let sideMenu = async () => {
  await fetch("location.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("locationData", JSON.stringify(data));
      tabHeader(data)
    });
};
sideMenu();


function tabHeader(data) {
  var parent = document.getElementById("head-tab");
  data.forEach((value) => {
    let button = document.createElement("button")
    button.setAttribute("class", "tablink")
    button.setAttribute("onclick", `openPage("${value.subcontinent}")`)
    value.subcontinent === "South Asia" && button.setAttribute("id", "defaultOpen")
    value.subcontinent === "South Asia" && button.setAttribute("class"," tablink tablink--active")
    button.innerHTML = value.subcontinent;
    button.setAttribute("onclick", "officeAddress(this.innerHTML)");
    parent.appendChild(button)
  });
  document.getElementById("defaultOpen").click();
  defaultTag();
}



function officeAddress(data) {
  const location = JSON.parse(localStorage.getItem("locationData"));
  const continentData = location.find((loc) => loc.subcontinent === data);
  continentAddress(continentData);
}



function continentAddress(data) {
  const parent = document.querySelector(".tab-content-container");
  const subContinents = document.createElement("div");
  subContinents.setAttribute("id", `${data.subcontinent}`);
  subContinents.setAttribute("class", "tabcontent")
  parent.replaceChildren(subContinents);
  const address = document.createElement("div");
  address.setAttribute("class", "tabcontent-adresses");
  address.setAttribute("onmouseout", "imagedefault(this)");
  subContinents.appendChild(address);
  data.places.forEach((item) => {
    const regionBox = document.createElement("div");
    regionBox.setAttribute("class", "regions");
    regionBox.setAttribute("onmouseover", "locationImageChange(this)");
    regionBox.setAttribute("data-officeimg_link", `${item.location_image}`);
    address.appendChild(regionBox);
    const regionBoxName = document.createElement("h3");
    regionBoxName.innerHTML = item.place;
    regionBox.appendChild(regionBoxName);
    Object.keys(item.address).forEach((lines) => {
      const regionBoxLines = document.createElement("p");
      regionBoxLines.innerHTML = item.address[lines];
      regionBox.appendChild(regionBoxLines);
    });
    if (item.phone_number) {
      const phone = document.createElement("p");
      phone.innerHTML = `<i class="fa fa-phone"></i> ${item.phone_number}`;
      regionBox.appendChild(phone);
    }
    address.appendChild(regionBox);
  });

  const locationImage = document.createElement("div");
  locationImage.setAttribute("class", "tabcontent-img");
  data.places.forEach((item) => {
    if (data.places.indexOf(item) == 0) {
      locationImage.innerHTML = `<img class="region-images" src="${item.location_image}" alt="${item.place}">`
      subContinents.appendChild(locationImage);
    }
  })
}



function locationImageChange(regionTag) {
  const imgBox = document.querySelector(".tabcontent-img");
  const img = document.createElement("img");
  img.src = regionTag.dataset.officeimg_link;
  imgBox.replaceChildren(img);
}

function imagedefault(region) {
  const imageBox = document.querySelector(".tabcontent-img");
  const boxes = region.querySelector(".regions");
  const img = document.createElement("img");
  img.src = boxes.dataset.officeimg_link;
  imageBox.replaceChildren(img);
}

function defaultTag() {
  document.querySelectorAll(".tablink").forEach(button => { 
    button.addEventListener("click", () => {
      console.log(button)
      const tabBar = button.parentElement;
      console.log(tabBar)
      
      tabBar.querySelectorAll(".tablink").forEach(button => {
        console.log(button)
        button.classList.remove("tablink--active")
      });
      button.classList.add("tablink--active")
    });
    
  });

}
defaultTag()