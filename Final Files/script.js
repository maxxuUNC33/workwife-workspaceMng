const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");



window.addEventListener("scroll", () => {
  mainFn();
});



const mainFn = () => {
  if (window.pageYOffset >= navbarOffsetTop) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  sections.forEach((section, i) => {
    if (window.pageYOffset >= section.offsetTop - 10) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });
  
 
};

mainFn();

window.addEventListener("resize", () => {
  window.location.reload();
});


/* Start of Contact Card Form*/

let smoothColors = ["#F8BBD0", "#F48FB1", "#CE93D8", "#B39DDB", "#9FA8DA"];


// const form = document.getElementById("Call-form");
// form.addEventListener("submit", function(event) {
//   event.preventDefault();
//   const name = document.getElementById("name").value;
//   const Time = document.getElementById("Time").value;
//   const Respond = document.getElementById("Respond").value;
//   const  Notes = document.getElementById("Notes").value;
  
//   //Create and append card
//   const card = document.createElement("div");
//   card.classList.add("card");
//   card.innerHTML = `
//     <i class="fas fa-phone-alt call-icon"></i>
//     <h3> ${name}</h3>
//     <p> ${Time}</p>
//     <p> ${Respond}</p>
//     <p>${Notes}</p>
//     <button class="delete" id="delete-button">
   
//     </button>
//   `;
//   let randomColor = smoothColors[Math.floor(Math.random() * smoothColors.length)];
//   document.documentElement.style.setProperty('--card-bg-color', randomColor);
//   document.querySelector('.card-container').appendChild(card);
  
//   //Add event listener to delete button
//   const deleteBtn = card.querySelector('.delete');
//   deleteBtn.addEventListener("click", function() {
    
//     if (confirm('Are you sure you want to delete this card?')) {
//       card.remove();
//       let randomColor = smoothColors[Math.floor(Math.random() * smoothColors.length)];
//       document.documentElement.style.setProperty('--card-bg-color', randomColor);
//     }
//   });
// });



let callCardData = JSON.parse(localStorage.getItem("callCardData")) || [];

const callContainer = document.getElementById("card-container");
const callForm = document.getElementById("Call-form");
 



callForm.addEventListener("submit",function(event){
  event.preventDefault();
    const name = document.getElementById("name").value;
    const Time = document.getElementById("Time").value;
    const Respond = document.getElementById("Respond").value;
    const  Notes = document.getElementById("Notes").value;
        
      const newCard = {
        name: name,
        Time: Time,
        Respond: Respond,
        Notes: Notes,
    
      };
      
  
      callCardData.push(newCard);
      // callCardData.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
      
      
      renderCallCards();
      
      localStorage.setItem("callCardData", JSON.stringify(callCardData));
});



const deleteCallCard = (index) => {
    callCardData.splice(index, 1);
    
    renderCallCards();
    
    localStorage.setItem("callCardData", JSON.stringify(callCardData));
};

const renderCallCards = () => {
    callContainer.innerHTML = "";
    localStorage.setItem("callCardData", JSON.stringify(callCardData));
    let randomColor = smoothColors[Math.floor(Math.random() * smoothColors.length)];
    document.documentElement.style.setProperty('--card-bg-color', randomColor);
    callCardData.forEach((card, index) => {
      const cardCL = document.createElement("div");
      cardCL.classList.add("call-card");
      cardCL.innerHTML = `
        <i class="fas fa-phone-alt call-icon"></i>
        <h3> ${card.name}</h3>
        <p> ${card.Time}</p>
        <p> ${card.Respond}</p>
        <p>${card.Notes}</p>
        <button class="delete" id="delete-button" onclick="deleteCallCard(${index})">
      
        </button>
      `;

      callContainer.appendChild(cardCL);
    });
};

renderCallCards();

/*  End of Contact Card Forms */


/*Start of Task Manager Form */

var now = new Date();
var maxDate = new Date();



maxDate.setDate(maxDate.getDate() + 3); // 3 days after now
var dateTimePicker = flatpickr("#dueDate", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  minDate: now,
  maxDate: maxDate,

 
});




let cardData = JSON.parse(localStorage.getItem("cardData")) || [];

const taskContainer = document.getElementById("Task-Card-Container");
const cardForm = document.getElementById("Task-form");
 



cardForm.addEventListener("submit",function(event){
  event.preventDefault();
  const taskName = document.getElementById("Task").value;
      const taskDetails = document.getElementById("details").value;
      
      const newCard = {
        name: taskName,
        details:taskDetails,
        dueDate: dateTimePicker.selectedDates[0],
    
      };
      
  
      cardData.push(newCard);
      cardData.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
      
      
      renderCards();
      
      localStorage.setItem("cardData", JSON.stringify(cardData));
});



const deleteCard = (index) => {
    cardData.splice(index, 1);
    
    renderCards();
    
    localStorage.setItem("cardData", JSON.stringify(cardData));
};

const renderCards = () => {
    taskContainer.innerHTML = "";
    localStorage.setItem("cardData", JSON.stringify(cardData));
    let randomColor = smoothColors[Math.floor(Math.random() * smoothColors.length)];
    document.documentElement.style.setProperty('--card-bg-color', randomColor);
    cardData.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("task-card");
      var datestr = JSON.stringify(card.dueDate);
      console.log(datestr);
      newdatestr = datestr.slice(1,-1);
      console.log(newdatestr);
      var date = new Date(newdatestr);
      // console.log("2023-01-18T20:26:00.000Z");
      
      console.log(date);
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var hour = ('0' + date.getHours()).slice(-2);
      var minute = ('0' + date.getMinutes()).slice(-2);
      var dateOnly = year + '-' + month + '-' + day;
      var timeOnly = hour + ':' + minute;
      cardEl.innerHTML = `
      <i class="fas fa-pen-square"></i>
           <h3> ${card.name}</h3>
           <p style="text-decoration: underline;">${card.details} </p>
           <p>DUE ${dateOnly}<br>${timeOnly}</p>
           
           
        <button class="delete" id="delete-button" onclick="deleteCard(${index})">
      `;

      taskContainer.appendChild(cardEl);
    });
};

renderCards();







const text = document.getElementById("animated-text-btm");
let index = 0;
let message = "Go make it happen";

function type() {
  if (index < message.length) {
    text.innerHTML += message.charAt(index);
    index++;
    setTimeout(type, 50);
  } else {
    setTimeout(erase, 3000);
  }
}

function erase() {
  if (index > 0) {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
    index--;
    setTimeout(erase, 50);
  } else {
    if (message === "Go make it happen") {
      message = "you can do it";
    } else {
      message = "Go make it happen";
    }
    index = 0;
    setTimeout(type, 3000);
  }
}

type();





