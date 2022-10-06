function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalbtnclose = document.querySelector('.close');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block"; 
}

// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

// close modal event
modalbtnclose.addEventListener('click', closeModal);


// Déclaration d'éléments inputs
const firstname = document.querySelector('#first');
const lastname = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const form = document.querySelector('form');
const selectRadio = form.querySelectorAll('input[type="radio"]');
const selectCheck = form.querySelectorAll('input[type="checkbox"]');
const inputs = form.querySelectorAll('input[class="text-control"]');

// Au clic du bouton submit, tous les champ doivent être remplis. Exécution de la fonction modalAppear() 
// pour afficher la fenêtre modale aprés validation des champs.
form.addEventListener('submit', function (e) {
  e.preventDefault();
  validate();
});


function validate(){
  
  if (checkFirstname() && checkLastname() && checkEmail() && checkBirthdate() && checkQuantity() && selectFunction() && isCheckboxchecked()) {
    launchForm();
    modalAppear();
  }
  
}


// Fonction permettant de réinitialiser les input du formulaire
function launchForm() {

    for(let i = 0; i < inputs.length; i++){
      inputs[i].value = '';
      
    }
    for( let i = 0; i < selectRadio.length; i++){
      selectRadio[i].checked = false; 
     
    }
    for( let i = 0; i < selectCheck.length; i++){
      selectCheck[i].checked = false ;    
    }
}



// Cette fonction valide le champ prénom
const checkFirstname = () => {
  const firstnameVal = firstname.value.trim();
  let flag = false;
  const min = 2;

  if (!isFilled(firstnameVal)) {
    printError(firstname, 'Le champ prénom doit être rempli');
    flag = false;
  }
  else if (firstnameVal.length < min) {
    printError(firstname, `Un minimum de ${min} caratères est requis`);
    flag = false;
  }
  else {   
    printSuccess(firstname);
    flag = true;
  }

  return flag;
}


// Cette fonction valide le champ nom
const checkLastname = () => {
  const lastnameVal = lastname.value.trim();
  const min = 2;
  let flag = false;

  if (!isFilled(lastnameVal)) {
    printError(lastname, `Le champ nom doit être rempli.`)
  }
  else if (lastnameVal.length < min) {
    printError(lastname, `Le champ nom doit comporter au minimum ${min} caractères.`)
  }
  else {
    printSuccess(lastname);
    flag = true;
  }
  return flag;
}

// Cette fonction valide le champ email
const checkEmail = () => {
  const emailVal = email.value.trim();
  let flag = false;

  if (!isFilled(emailVal)) {
    printError(email, `Le champ E-mail doit être rempli.`)
  }
  else if (!isEmailValid(emailVal)) {
    printError(email, `L\'e-mail entré n'est pas valide.`)
  }
  else {
    printSuccess(email);
    flag = true;
  }
  return flag;
}

// Cette fonction valide le champ date de naissance
const checkBirthdate = () => {
  let flag = false;
  const birthdateVal = birthdate.value.trim();

  if (!isFilled(birthdateVal)) {
    printError(birthdate, `Veuillez entrer votre date de naissance`);
  }
  else if (!isBirthdateValid) {
    printError(birthdate, `La date de naissance entrèe n\'est pas valide.`)
  }
  else {
    printSuccess(birthdate);
    flag = true;
  }
  return flag;
}


// Cette fonction valide le champ correspondant au nombre de tournois GameOn auxquels on a eu à participer.
const checkQuantity = () => {
  let flag = false;
  const quantityVal = quantity.value.trim();

  if (!isFilled(quantityVal)) {
    printError(quantity, `Vous devez entrer le nombre de tournois GameOn auxquels vous avez déjà participé `)
  }
  else if (!isQuantityValid) {
    printError(quantity, `Il faut entrer une valeur numérique.`)
  }
  else {
    printSuccess(quantity);
    flag = true;
  }
  return flag;
}



// Cette fonction valide la ville choisie où un tournoi est organisé
const selectFunction = () => {

  for (let i = 0; i < selectRadio.length; i++) {

    if (selectRadio[i].checked) {
      document.querySelector('#btn-check').textContent = '';  
      return true;
    }
  }

  document.querySelector('#btn-check').textContent = 'Sélectionnez une ville svp !';
  document.querySelector('#btn-check').style.color = 'red';
  return false;
}


// Cette fonction valide le champ réservé à l'acceptation des conditions d'utilisation 
function isCheckboxchecked() {

  if (document.querySelector('#checkbox1').checked) {
    printSuccess(document.querySelector('#checkbox1'));
    return true;
  }
  printError(document.querySelector('#checkbox1'), 'Veuillez accepter les conditions svp !');
  return false;
}

// Cette fonction valide l'apparition de la fenêtre modale
function modalAppear() {
  const modal = document.querySelector('.modal');
  const closeWindow = document.querySelector('.close-window');
  const closeButton = document.querySelector('.close-button');

  modal.showModal();

  modalbg.style.display = 'none';
  
  closeWindow.addEventListener('click', () => {
    modal.close();
    modalbg.style.display = "none";
  });

  closeButton.addEventListener('click', () => {
    modal.close();
    modalbg.style.display = "none";
  })
}




// Cette fonction valide si un champ est vide ou non
const isFilled = value => value === '' ? false : true;


// Cette fonction affiche un message d'erreur si le champ n'est pas rempli correctement grâce à un message affiché en rouge
const printError = (input, message) => {
  input.parentElement.dataset.error = message;
  input.parentElement.dataset.errorVisible = true;
  input.parentElement.dataset.successVisible = false;
}


// Cette fonction valide le fait que le champ est correctement rempli(liseré vert sur le input en question)
const printSuccess = (input) => {
  input.parentElement.dataset.error = '';
  input.parentElement.dataset.errorVisible = false;
  input.parentElement.dataset.successVisible = true;
}


// Cette fonction vérifie la validité d'un email
const isEmailValid = (email) => {

  const myReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return (myReg.test(email));

}


// Cette fonction vérifie le respect du format dd/mm/yyyy date de naissance
const isBirthdateValid = (birthdate) => {
  const birthReg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  return birthReg.test(birthdate);
}

// Cette fonction test une valeur entière 
const isQuantityValid = (quantity) => {
  const quantityReg = /^([0-9]{0,99})$/;
  return quantityReg.test(quantity);
}

