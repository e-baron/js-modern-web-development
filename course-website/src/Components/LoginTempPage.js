import Icon from "../images/logo_vinci.png";
let page = document.querySelector("#page");

const LoginTempPage = () => {    
  let loginTempPage = `<h5 class="mt-3">Veuillez vous logger pour accéder à cette ressource</h5>
    <p>Vous pouvez vous logger en cliquant 
    <a href="#" data-uri="/login">
    <img src="${Icon}" alt="" width="24" height="24">ici
    </a> 
    ou dans le menu.</p>
  `; 
  page.innerHTML = loginTempPage;  
};

export default LoginTempPage;
