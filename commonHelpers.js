import"./assets/modulepreload-polyfill-ec808ebb.js";import{i as S}from"./assets/vendor-32231325.js";let a,c;const n=document.querySelector("[data-start]");document.querySelector("#datetime-picker");const l=document.querySelector("[data-days]"),m=document.querySelector("[data-hours]"),f=document.querySelector("[data-minutes]"),h=document.querySelector("[data-seconds]");n.addEventListener("click",function(){a&&(c=setInterval(g,1e3))});const T={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:x};function p(e){const i=Math.floor(e/864e5),y=Math.floor(e%864e5/36e5),C=Math.floor(e%864e5%36e5/6e4),D=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:y,minutes:C,seconds:D}}function g(){const e=new Date().getTime(),t=a.getTime()-e;if(t<=0){clearInterval(c),s(t,!0),n.disabled=!1;return}else s(t),n.disabled=!0}function r(e){return String(e).padStart(2,"0")}document.addEventListener("DOMContentLoaded",function(){flatpickr("#datetime-picker",T),n.disabled=!0});function x(e){if(e[0]<=new Date)n.disabled=!0,S.error({message:"Please choose a date in the future",position:"topRight",backgroundColor:"red"});else{n.disabled=!1,clearInterval(c),a=e[0];const t=new Date().getTime(),o=a.getTime()-t;s(o)}}function s(e,t=!1){if(t)l.textContent="00",m.textContent="00",f.textContent="00",h.textContent="00";else{const{days:o,hours:u,minutes:d,seconds:i}=p(e);l.textContent=r(o),m.textContent=r(u),f.textContent=r(d),h.textContent=r(i)}}
//# sourceMappingURL=commonHelpers.js.map
