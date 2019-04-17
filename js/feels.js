const happy = document.getElementById("happy");
const sad = document.getElementById("sad");
const romantic = document.getElementById("romantic");
const stressful = document.getElementById("stressful");

const happyButton = document.getElementById("buttonHappy");
const sadButton = document.getElementById("buttonSad");
const romanticButton = document.getElementById("buttonRomantic");
const stressfulButton = document.getElementById("buttonStressful");
happyButton.addEventListener("click",happyShow());
function happyShow (){
    happy.classList.remove('hide');


    sad.classList.add('hide');
    romantic.classList.add('hide');
    stressful.classList.add('hide');
}




happyButton.addEventListener("click",sadShow());


function sadShow (){
    sad.classList.remove('hide');
 


    happy.classList.add('hide');
    romantic.classList.add('hide');
    stressful.classList.add('hide');
}





function romanticShow (){
    romantic.classList.remove('hide');


    happy.classList.add('hide');
    sad.classList.add('hide');
    stressful.classList.add('hide');
}

happyButton.addEventListener("click",romanticShow());

function stressfulShow (){
    stressful.classList.remove('hide');
 

    happy.classList.add('hide');
    sad.classList.add('hide');
    romantic.classList.add('hide');
}

happyButton.addEventListener("click",stressfulShow());