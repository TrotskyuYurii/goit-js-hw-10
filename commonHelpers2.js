import"./assets/modulepreload-polyfill-ec808ebb.js";import{i}from"./assets/vendor-32231325.js";const a=document.querySelector("form");a.addEventListener("submit",function(r){r.preventDefault();const t=document.querySelector('input[name="delay"]'),n=document.querySelector('input[name="state"]:checked');if(!t||!n||t.value.trim()===""){i.error({message:"No selected state or delay",position:"topRight",backgroundColor:"red"});return}const o=parseInt(t.value);new Promise((e,s)=>{setTimeout(()=>{n.value==="fulfilled"?e(o):s(o)},o)}).then(e=>{i.success({message:`Fulfilled promise in ${e} ms`,position:"topRight",backgroundColor:"green"})}).catch(e=>{i.error({message:`Reject promise in ${e} ms`,position:"topRight",backgroundColor:"red"})})});
//# sourceMappingURL=commonHelpers2.js.map
