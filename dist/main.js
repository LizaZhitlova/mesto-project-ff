(()=>{var e=document.querySelector("#card-template").content,t=document.querySelector(".places__list");function r(e){e.target.closest(".places__item").remove()}initialCards.forEach((function(c){var a=function(t,r,c){var a=e.querySelector(".places__item").cloneNode(!0);a.querySelector(".card__title").textContent=t;var n=a.querySelector(".card__image");return n.src=r,n.alt=t,a.querySelector(".card__delete-button").addEventListener("click",c),a}(c.name,c.link,r);t.append(a)}))})();