'use strict';

const insertRow = document.querySelector('#insertRow');

let cardList = [1,2,3,4,5,6,7,8,9];



function randomCard() {

  if(cardList.length === 0){
    clearTimeout();
    return;
  }  

  let rd = Math.floor(Math.random() * cardList.length);
  let cv = cardList[rd];
  
  cardList = cardList.slice(0,rd).concat(cardList.slice(rd+1)); 

  let el =document.createElement("td");
  el.setAttribute("card-value",cv);

  el.addEventListener('click',(evn)=>{
    const tgt = evn.target;
    tgt.textContent  = tgt.getAttribute("card-value");
  },false);
  
  insertRow.appendChild(el);

  setTimeout(() => {  
    randomCard();
  },0);
}


//高效点的版本

//循环次数
const RANDOM_TIME = 6;

function randomList(){

  insertRow.textContent = '';
  
  //数组内交互若干次
  for (var i = RANDOM_TIME - 1; i >= 0; i--) {
    //let randomNum = [].fill(Math.ciel(Math.random() * cardList.length));
    //let {r1,r2} = { Math.ciel(Math.random() * cardList.length),Math.ciel(Math.random() * cardList.length)}; 
  
  
    let r1 = Math.floor(Math.random() * cardList.length),
        r2 = Math.floor(Math.random() * cardList.length),
        r3 = 0;
    
    //[cardList[randomNum[0]],cardList[randomNum[1]]] = [cardList[randomNum[1]],cardList[randomNum[0]]];
    
    r3           = cardList[r1];
    cardList[r1] = cardList[r2];
    cardList[r2] = r3;
  }

  for (var i = cardList.length - 1; i >= 0; i--) {

    let el =document.createElement("td");
    el.setAttribute("card-value",cardList[i]);

    el.addEventListener('click',(evn)=>{
      const tgt = evn.target;
      tgt.textContent  = tgt.getAttribute("card-value");
    },false);
  
    insertRow.appendChild(el);    
  }

  console.log(cardList);
}


(()=>{
  //randomCard();
  randomList();
})();