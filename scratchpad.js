// ==UserScript==
// @name        dodatki
// @namespace   tuba
// @include     https://www.youtube.com/?hl=pl&gl=PL&app=desktop
// @version     1
// @grant       none
// ==/UserScript==
let first=true;
let firsto=true;
if(first){
setTimeout(glowna, 800);
}
function glowna(){
  first=false;
var newo=false;
let checko=true;
let lol=document.getElementById('guide-channels');

let element=null;
let tag=null;
if (lol == null && document.querySelector('.style-scope ytd-guide-renderer #container') == null){
  console.log("DZIALA TERMINATOR");
  firsto=true;
  checko=false;
  let termi=document.getElementById("guide-button");
  termi.addEventListener('click',()=>{
    console.log("KLIK");
    console.log("Stan peirwszego: ");
    console.log(firsto);
    if(firsto){
      console.log("ODPALAM JESZCZE RAZ");
    glowna();
    console.log("Stan checko");
    console.log(checko);
    if(checko){
      firsto=false;
      checko=true;
    }

  }
  });
}else{
if (lol == null){

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
    if(newo){
      if(sub[n].querySelector("ytd-guide-entry-renderer  span").innerText.toLowerCase().includes(val)){
        sub[n].style.display='block';
        licznik--;
      }else{
        sub[n].style.display='none';
        licznik++;
      }
    }else{
    if(sub[n].querySelector("li > a").getAttribute("title").toLowerCase().includes(val)){
      sub[n].style.display='block';
      licznik--;
    }else{
      sub[n].style.display='none';
      licznik++;
    }
  }

    if(newo){
    if(lol.getElementsByTagName("ytd-guide-entry-renderer").length-licznik == 0){

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
  }else{
    if(lol.getElementsByTagName("li").length-licznik == 0){

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

  }
});
}
}
