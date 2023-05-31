(()=>{"use strict";class e{constructor(e){this.length=e,this.tiles=[...Array(e).keys()],this.domTargets=[]}hit(e){if("hit"===this.tiles[e])return!1;this.tiles.splice(e,1,"hit")}isSunk(){let e=!1;return this.tiles.forEach((t=>{"hit"!==t&&(e=!0)})),!0!==e}}class t{constructor(){this.board=[],this.isStartAllowed=!1,this.hasStarted=!1,this.create()}create(){for(let e=0;e<10;e++){this.board[e]=[];for(let t=0;t<10;t++)this.board[e].push(!1)}}getStartAllowed(){return this.isStartAllowed}setStartAllowed(e){this.isStartAllowed=e}getHasStarted(){return this.hasStarted}setHasStarted(e){this.hasStarted=e}receiveAttack(e,t){return"miss"!==this.board[e][t]&&("object"!=typeof this.board[e][t]||"hit"!==this.board[e][t].ship.tiles[this.board[e][t].shipPos])&&(this.board[e][t]&&"res"!==this.board[e][t]?(this.board[e][t].ship.hit(this.board[e][t].shipPos),this.board[e][t].ship.tiles[this.board[e][t].shipPos]):(this.board[e][t]="miss",this.board[e][t]))}placeShip(t,r,a,o){if(this.board[t][r])return!1;let s=new e(a),n=0;if("h"===o){if(r+s.length>10)return!1;for(let e=0;e<a;e++)if("res"===this.board[t][r+e])return!1;for(let e=r;e<r+s.length;e++)this.board[t].splice(e,1,{ship:s,shipPos:n}),this.reserveAround(t,r+n),n++}if("v"===o){if(t+s.length>10)return!1;for(let e=0;e<a;e++)if("res"===this.board[t+e][r])return!1;for(let e=t;e<t+s.length;e++)this.board[e].splice(r,1,{ship:s,shipPos:n}),this.reserveAround(t+n,r),n++}}reserveAround(e,t){let r=this.board;function a(a,o){e+a>9||e+a<0||!1===r[e+a][t+o]&&(r[e+a][t+o]="res")}function o(e){a(e,-1),a(e,0),a(e,1)}o(-1),o(0),o(1)}isSunk(e,t){return!0===this.board[e][t].ship.isSunk()}areAllSunk=e=>{let t=!1;for(let r=0;r<10;r++)e[r].forEach((e=>{e&&"miss"!==e&&"res"!==e&&!1===e.ship.isSunk()&&(t=!0)}));return!0!==t}}class r{constructor(e){this.name=e,this.gameBoard=new t,this.turn=!1}fireShot(e,t,r){return e.gameBoard.receiveAttack(t,r)}isTurn(e){this.turn=!0,e.turn=!1}getTurn(){return this.turn}setTurn(e){this.turn=e}randomPos(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}placeShipRandomly(e){let t=Math.floor(10*Math.random()),r=Math.floor(10*Math.random()),a=Math.round(Math.random());return(0!==a||(a="h",!1!==this.gameBoard.placeShip(t,r,e,a)))&&(1!==a||(a="v",!1!==this.gameBoard.placeShip(t,r,e,a)))&&void 0}placeRandomFleet(){for(let e=0;e<1;)0!=this.placeShipRandomly(1)&&e++;for(let e=0;e<1;)0!=this.placeShipRandomly(2)&&e++;for(let e=0;e<1;)0!=this.placeShipRandomly(3)&&e++;for(let e=0;e<1;)0!=this.placeShipRandomly(4)&&e++;for(let e=0;e<1;)0!=this.placeShipRandomly(5)&&e++;this.gameBoard.setStartAllowed(!0)}}let a,o;function s(){a=new r("You"),o=new r("Your enemy"),a.isTurn(o),o.placeRandomFleet(),function(e){const t=document.querySelector(".board-buttons"),r=document.getElementById("enemyBoard"),o=document.createElement("button");o.innerText="Random",o.classList.add("main-random");const s=document.createElement("button");s.innerText="Reset",s.classList.add("main-reset");const n=document.querySelector(".misc"),i=document.createElement("button");i.innerText="Start",i.setAttribute("id","start"),t.appendChild(o),t.appendChild(s),n.appendChild(i),document.querySelector(".main-reset").addEventListener("click",(()=>{b(),r.classList.add("not-started")})),document.querySelector(".main-random").addEventListener("click",(()=>{b(),a.placeRandomFleet(),v(a),a.gameBoard.setStartAllowed(!0),document.querySelector(".ships").innerHTML=""})),document.getElementById("start").addEventListener("click",(a=>{const o=document.getElementById("start");!1!==e.gameBoard.getStartAllowed()&&(r.classList.remove("not-started"),e.gameBoard.setHasStarted(!0),t.removeChild(document.querySelector(".main-random")),o.remove())}))}(a),function(e,t){for(let t=0;t<10;t++){let r=document.createElement("div");r.classList.add("row-p1"),r.setAttribute("id",`p1-row${t}`),document.getElementById("playerBoard").appendChild(r),e.gameBoard.board[t].forEach(((e,a)=>{let o=document.createElement("div");o.classList.add("cell-p1"),o.setAttribute("id",`p1-row${t}-cell${a}`),r.appendChild(o)}))}for(let r=0;r<10;r++){let a=document.createElement("div");a.classList.add("row-p2"),a.setAttribute("id",`p2-row${r}`),document.getElementById("enemyBoard").appendChild(a),t.gameBoard.board[r].forEach(((o,s)=>{let n=document.createElement("div");n.classList.add("cell-p2"),n.setAttribute("id",`p2-row${r}-cell${s}`),a.appendChild(n),n.addEventListener("click",(a=>{e.getTurn()&&e.gameBoard.getStartAllowed()&&L(a,r,s,e,t)}))}))}}(a,o),function(e){function t(e,t){const r=document.querySelector(".ships"),a=document.createElement("div");a.classList.add("ship-container"),r.appendChild(a);const o=document.createElement("div");o.classList.add("ship"),o.classList.add(`ship-${e}`),o.setAttribute("draggable","true"),a.appendChild(o);for(let e=0;e<t;e++){const e=document.createElement("div");e.classList.add("ship-cell"),o.appendChild(e)}}t(1,1),t(2,2),t(3,3),t(4,4),t(5,5);for(let t=1;t<6;t++)i(e,`.ship-${t}`)}(a)}let n=0;function i(e,t){let r=1;const a=document.querySelector(t),o=document.querySelector("body"),s=document.querySelectorAll(".cell-p1"),i=a.childNodes;let d,l,c="h";i[0]&&i[0].addEventListener("mouseenter",(()=>l=0)),i[1]&&i[1].addEventListener("mouseenter",(()=>l=-1)),i[2]&&i[2].addEventListener("mouseenter",(()=>l=-2)),i[3]&&i[3].addEventListener("mouseenter",(()=>l=-3)),i[4]&&i[4].addEventListener("mouseenter",(()=>l=-4)),a.addEventListener("click",(e=>function(e){"h"===c?(c="v",e.target.parentNode.classList.toggle("rotated")):(c="h",e.target.parentNode.classList.toggle("rotated"))}(e))),a.addEventListener("dragstart",(t=>{for(let t=0;t<10;t++)e.gameBoard.board[t].forEach(((e,r)=>{"res"===e&&document.getElementById(`p1-row${t}-cell${r}`).classList.toggle("not-available")}))})),a.addEventListener("dragend",((o,s)=>{if(document.querySelectorAll(".not-available").forEach((e=>e.classList.remove("not-available"))),-1===d)return;let i,u,h=""+d;d<10?(i=0,u=d):(h=h.split(""),i=1*h[0],u=1*h[1]),"h"===c&&(u+=l),"v"===c&&(i+=l),u<0||".ship-1"===t&&!1===e.gameBoard.placeShip(i,u,1,c)||".ship-2"===t&&!1===e.gameBoard.placeShip(i,u,2,c)||".ship-3"===t&&!1===e.gameBoard.placeShip(i,u,3,c)||".ship-4"===t&&!1===e.gameBoard.placeShip(i,u,4,c)||".ship-5"===t&&!1===e.gameBoard.placeShip(i,u,5,c)||(v(e),r-=1,n++,5===n&&e.gameBoard.setStartAllowed(!0),0===r&&(a.parentNode.style.display="none"))})),s.forEach(((e,t)=>{e.addEventListener("dragover",(e=>{e.preventDefault(),d=t}))})),o.addEventListener("dragenter",(()=>{d=-1}))}let d,l=!1,c=!1,u=[],h=[],m=[],p=[];function g(e,t,r,a){l=e,void 0!==t&&(c=t),void 0!==r&&(u=[r,a]),0==h.length&&void 0!==r?h=[r,a]:0!==h.length&&0!==m&&void 0!==r&&(m=[r,a])}function f(e,t){return p=[],0!==t&&p.push([e,t-1]),0!==t&&p.push([e,t+1]),0!==e&&p.push([e-1,t]),0!==e&&p.push([e+1,t]),p}function y(e,t,r,a){let o;if(!0===a&&(u=[],h=[],m=[],p=[],l=!1,c=!1,d=""),!c&&!l)return o=r.randomPos(),E(t,r,o[0],o[1]);if(0!==m.length&&l&&!e){let e;return h[0]==m[0]-1&&(e=S("down")),h[0]==m[0]+1&&(e=S("up")),h[1]==m[1]-1&&(e=S("right")),h[1]==m[1]+1&&(e=S("left")),E(t,r,e[0],e[1])}if(m.length&&c&&!l){let e;return u=h,m=[],"up"===d&&(e=S("down")),"down"===d&&(e=S("up")),"right"===d&&(e=S("left")),"left"===d&&(e=S("right")),E(t,r,e[0],e[1])}if(c){0==p.length&&f(u[0],u[1]),0==p.length&&1==c&&f(h[0],h[1]);let e=p.pop();return E(t,r,e[0],e[1])}}function S(e){return"left"===e?(d="left",[u[0],u[1]-1]):"right"===e?(d="right",[u[0],u[1]+1]):"down"===e?(d="down",[u[0]+1,u[1]]):"up"===e?(d="up",[u[0]-1,u[1]]):void 0}function b(){document.querySelector(".board-buttons").innerHTML="",document.querySelector(".ships").innerHTML="",document.querySelectorAll(".board").forEach((e=>e.innerHTML="")),document.querySelector("#start")?.remove(),s()}function v(e){document.querySelectorAll(".cell-p1").forEach(((t,r)=>{let a,o,s=""+r;r<10?(a=0,o=r):(s=s.split(""),a=s[0],o=s[1]),e.gameBoard.board[a][o]&&("res"===e.gameBoard.board[a][o]?t.classList.add("res"):t.classList.add("fleet"))}))}async function L(e,t,r,a,o){document.getElementById("enemyBoard").classList.toggle("current-turn");let s=a.fireShot(o,t,r);if(s)return"miss"===s&&e.target.classList.add("miss"),"hit"===s?(e.target.classList.add("hit"),o.gameBoard.board[t][r].ship.domTargets.push(e.target),void(o.gameBoard.board[t][r].ship.isSunk()&&o.gameBoard.board[t][r].ship.domTargets.forEach((e=>e.classList.add("sunk"))))):(o.isTurn(a),await B(1500),!0===o.gameBoard.areAllSunk(o.gameBoard.board)?w(a):y(!1,a,o))}async function E(e,t,r,a){let o=!1,s=document.getElementById(`p2-row${r}-cell${a}`),n=t.fireShot(e,r,a);if(n||y(!0,e,t),"miss"===n&&(g(!1),s.classList.add("miss")),"hit"===n)return g(!0,!0,r,a),s.classList.add("hit"),e.gameBoard.board[r][a].ship.domTargets.push(s),e.gameBoard.board[r][a].ship.isSunk()&&(e.gameBoard.board[r][a].ship.domTargets.forEach((e=>e.classList.add("sunk"))),o=!0,!0===e.gameBoard.areAllSunk(e.gameBoard.board))?w(t):(await B(1500),y(!1,e,t,o));e.isTurn(t)}function w(e){const t=document.querySelector(".winning-dialog"),r=document.querySelector(".restart"),a=document.querySelector(".close");document.querySelector(".win-text").textContent=e.name+" won the game!",t.showModal(),r.addEventListener("click",(()=>{t.close(),b()})),a.addEventListener("click",(()=>{t.close()}))}function B(e){return new Promise((t=>{setTimeout((()=>{t(2)}),e)}))}s(),function(){const e=document.querySelector(".game-btn"),t=document.querySelector(".htp-btn");let r=!0,a=!1;t.addEventListener("click",(()=>{a||(a=!0,r=!1,async function(){const e=document.querySelector(".game-container"),t=document.querySelector(".how-to-play"),r=document.querySelector("#start");e.classList.toggle("active"),await B(200),e.style.display="none",t.style.display="flex",r.style.display="none",await B(200),t.classList.toggle("active"),window.location.href="#how-to-play"}())})),e.addEventListener("click",(()=>{r||(r=!0,a=!1,async function(){const e=document.querySelector(".game-container"),t=document.querySelector(".how-to-play"),r=document.querySelector("#start");t.classList.toggle("active"),await B(500),r.style.display="flex",t.style.display="none",e.style.display="flex",await B(500),e.classList.toggle("active"),window.location.href="#game"}())}))}()})();