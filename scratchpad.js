// ==UserScript==
// @name        dodatki
// @namespace   tuba
// @include     https://www.youtube.com/?hl=pl&gl=PL&app=desktop
// @version     1
// @grant       none
// ==/UserScript==

let lol=document.getElementById('guide-channels');
let element=document.createElement("li");
element.appendChild(document.createTextNode("Szukaj"));
lol.parentNode.insertBefore(element,lol);
let inp=document.createElement("input");
inp.setAttribute('type','text');
element.append(inp);
let sub=lol.getElementsByTagName("li");


inp.addEventListener('keyup',()=>{
  let val=inp.value;
  let licznik=0;
  for(let n=0;n<sub.length;n++){

    if(sub[n].querySelector("li > a").getAttribute("title").toLowerCase().includes(val)){
      sub[n].style.display='block';
      licznik--;
    }else{
      sub[n].style.display='none';
      licznik++;
    }
    console.log(lol.getElementsByTagName("li").length);
    
    if(lol.getElementsByTagName("li").length-licznik == 0){
      console.log('Weszlo: '+sub.length);
      let tra=document.createElement('img');
      tra.setAttribute('src','http://goo.gl/d2kCy6');
      tra.setAttribute('id','trav');
      element.append(tra);
      
    }else{
      
      let testt=document.getElementById('trav');
      if(testt != null){
        testt.remove();
      }
     
    }
  }
});