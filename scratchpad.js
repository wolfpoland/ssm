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
 /* let expand=document.querySelectorAll('#expander-item');
  console.log(expand);
  if(expand.length > 1){
    let tmp=expand[1];
    tmp.click();
    tmp.setAttribute('style',`
             display: none;
    `);
  }else if(expand.length == 1){
    let tmp=expand[0];
    tmp.click();
    tmp.setAttribute('style',`
             display: none;
    `);
  }
*/
  lol=document.querySelector('#guide-renderer #sections');

  lol=lol.childNodes[2];
  lol=lol.childNodes[5];


 element=document.createElement("div");
 element.setAttribute('style',`
          width: 100%;
          padding: 0 24px;
          box-sizing: border-box;
          align-items: center;
      `);


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

inp.setAttribute('style',`
  font-family: "Roboto", "Droid Sans", sans-serif;
  width:90%;
  font-size: 16px;
  margin: 0;
  padding: 8px 8px 6px 8px;
  position: relative;
  display: block;
  outline: none;
  border: none;
  background: none;
  color: var(--yt-primary-color);
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
 `);
let span=document.createElement("span");
span.setAttribute('style',"position: absolute;  left: 50%; width: 0; height: 2px; background-color: #3399FF; transition: 0.4s;");
let posredni=document.createElement('div');
posredni.setAttribute('style',`
  width: 100%;
  position: relative;
  margin-bottom: 14px;
`);
posredni.append(inp);
posredni.append(span);
element.append(posredni);
let sub=lol.getElementsByTagName("li");
if (sub.length == 0){

  sub=lol.getElementsByTagName("ytd-guide-entry-renderer");
}else{

}
inp.addEventListener('focus',()=>{
  span.setAttribute('style',`position: absolute;
        height: 2px;
        background-color: #3399FF;
        width: 100%;
        transition: 0.4s;
        left: 0;`);
});
inp.addEventListener('focusout',()=>{
span.setAttribute('style',"position: absolute;  left: 50%; width: 0; height: 2px; background-color: #3399FF; transition: 0.4s;");
});
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
