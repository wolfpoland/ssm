// ==UserScript==
// @name        dodatki
// @namespace   tuba
// @include     https://www.youtube.com/?hl=pl&gl=PL&app=desktop
// @version     1
// @grant       none
// ==/UserScript==
function sleep(ms){
  return new Promise(res=> setTimeout(res, ms));
}

glowna();

async function glowna(){
  first=false;
var newo=false;
let checko=true;
let lol=document.querySelector('#guide-renderer #sections');

let element=null;
let tag=null;
if ( document.querySelector('#guide-renderer #sections')== null || document.querySelector('#guide-renderer #sections').childNodes[2] == undefined){
  
while( document.querySelector('#guide-renderer #sections')== null || document.querySelector('#guide-renderer #sections').childNodes[2] == undefined ){
  await sleep(500);


}

}
if(document.querySelector('#guide-renderer #sections') != null){

  lol=document.querySelector('#guide-renderer #sections');

  lol=lol.childNodes[2];
  lol=lol.childNodes[5];


 element=document.createElement("div");


element.setAttribute('style','margin-right: 16%;margin-left: 6%;margin-bottom: 8%;');
}
else if (lol == null){

  tag=document.createElement("p");
    tag.appendChild(document.createTextNode("Search"));
   element=document.createElement("div");
   element.appendChild(tag);
  lol=document.querySelector('.style-scope ytd-guide-renderer #container');
  element.style.margin='0 10%';
  newo=true;


}else{

  element=document.createElement("li");
  element.appendChild(document.createTextNode("Search"));
}


lol.parentNode.insertBefore(element,lol);
let inp=document.createElement("input");
inp.setAttribute('type','text');
inp.setAttribute('placeholder','Search');

inp.setAttribute('style','font-family: "Roboto", "Droid Sans", sans-serif;width:100%;font-size: 16px;margin: 0;padding: 8px 8px 6px 8px;position: relative;display: block;outline: none;border: none;background: none;color: #212121;border-bottom: 1px solid #e0e0e0; border-radius: 0;');

element.append(inp);
let sub=lol.getElementsByTagName("li");
if (sub.length == 0){

  sub=lol.getElementsByTagName("ytd-guide-entry-renderer");
}else{

}

inp.addEventListener('keyup',()=>{

  let val=inp.value.toLowerCase();
  let licznik=0;

  for(let n=0;n<sub.length;n++){
   
      if(sub[n].querySelector("ytd-guide-entry-renderer  a").innerText.toLowerCase().includes(val)){
        sub[n].style.display='block';
        licznik--;
      }else{
        sub[n].style.display='none';
        licznik++;
      }
    

 

  

  }
});

}
