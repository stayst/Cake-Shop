!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);var i=[],a=0;$("document").ready((function(){function t(){console.log($("#prod-descr")),document.getElementById("prod-descr").style.display="block";var t=$(this).attr("data-art");console.log(t),$.getJSON("https://nit.tron.net.ua/api/product/list",(function(e){for(var n in e)if(e[n].id==t){var i=0;i=null==e[n].special_price?e[n].price:e[n].special_price;var a="<h2>"+e[n].name+"</h2>";$("#p-name").html(a),a='<img class = "item-im" src = "'+e[n].image_url+'">',a+="<h3>"+e[n].description+"</h3>",a+='<span class="price it-price">'+i+"грн</span>",a+='<button class="add-to-cart" data-art="'+e[n].id+'">BUY</button>',$("#p-descr").html(a),$("button.add-to-cart").on("click",c)}}))}function e(){var e=document.getElementById("selection").value;console.log(e);var n="All";if(-1==e)var a="https://nit.tron.net.ua/api/product/list";else{a="https://nit.tron.net.ua/api/product/list/category/"+e;$.getJSON("https://nit.tron.net.ua/api/category/list",(function(t){for(var i in t)t[i].id==e&&(n=t[i].name)}))}$.getJSON(a,(function(e){var a='<div class = "product-list"><h1>'+n+'</h1><div class = "container">';for(var l in e)i[e[l].id]={articul:e[l].id,name:e[l].name,price:e[l].price,special_price:e[l].special_price,img:e[l].image_url,quantity:"0"},a+='<div class = "card col-lg-4 col-md-6 col-sm-12">',a+='<div class = "product">',a+='<div class = "img-block"><img src="'+e[l].image_url+'" class = "prd-im"></div>',a+='<div class = "description">',null!=e[l].special_price?(a+='<div class = "old-pic">',a+='<img src="pics/sale.png?127" style="width: 100px;" class="sale">',a+='<a class = "prod-link" data-art="'+e[l].id+'">'+e[l].name+"</a>",a+="</div>",a+='<p class="new price">'+e[l].special_price+"грн</span>",a+='<p class="old price">'+e[l].price+"грн</span>"):(a+='<a class = "prod-link" data-art="'+e[l].id+'">'+e[l].name+"</a>",a+='<span class="price">'+e[l].price+"грн</span>"),a+="</div>",a+='<button class="add-to-cart" data-art="'+e[l].id+'">BUY</button>',a+="</div></div>",$("button.add-to-cart").on("click",c);$("#product-list").html(a),$("button.add-to-cart").on("click",c),$(".prod-link").on("click",t)}))}function n(){if(""==document.getElementById("name").value||""==document.getElementById("number").value||""==document.getElementById("email").value)alert("Invalid Contacts!");else if(confirm("Confirm your order!")){var t=[],e=0;i.forEach((function(n){n.quantity>0&&(t[e]=n,e++)})),$.ajax({type:"POST",contentType:"text/plain",url:"https://nit.tron.net.ua/api/order/add",data:JSON.stringify(t),dataType:"json",cache:!1,token:"Fs2_bUolpEdDsxYq_jXr",name:document.getElementById("name").value,number:document.getElementById("number").value,email:document.getElementById("email").value,timeout:1e5,success:function(t){console.log("SUCCESS : ",t)},error:function(t){console.log("ERROR : ",t)}}),i.forEach((function(t){t.quantity>0&&(t.quantity=0)})),r.style.display="none",a=0,$(".cart p").html(a)}}function c(){if(a<100){var t=$(this).attr("data-art");if(console.log(t),null!=i[t]?i[t].quantity++:i[t].quantity=1,10==++a){var e=document.getElementById("numb");e.style.fontSize="100%",e.style.left="17%",e.style.top="46%"}$(".cart p").html(a),s()}}function l(){var t=$(this).attr("data-art");if(null!=i[t]&&0!=i[t].quantity?(i[t].quantity--,--a):i[t].quantity=0,9==a){var e=document.getElementById("numb");e.style.fontSize="130%",e.style.left="23%",e.style.top="42%"}$(".cart p").html(a),s()}function o(){var t=$(this).attr("data-art");a-=i[t].quantity,i[t].quantity=0,$(".cart p").html(a),s()}function s(){var t="",e=0;i.forEach((function(n){if(0!=n.quantity){var i=0;i=null!=n.special_price?n.special_price:n.price,t+='<div class = "item row"><div class = "sign delete col-xs-1">',t+='<button class="remove" data-art = "'+n.articul+'">&times;</button></div>',t+='<div class = "photo col-sm-3 col-xs-1 d-none d-sm-block"><img src="'+n.img+'"></div>',t+='<div class = "title col-xs-3"><p>'+n.name+"</p>",null!=n.special_price?t+='<p class = "price">'+n.special_price+' грн</p></div><div class = "sign title col-xs-1">':t+='<p class = "price">'+n.price+' грн</p></div><div class = "sign title col-xs-1">',t+='<button class = "min" data-art = "'+n.articul+'">-</button>',t+='</div><div class = "col-xs-2 col-sm-1"><p class = "numb">'+n.quantity+"</p></div>",t+='<div class = "sign col-xs-1"><button class = "plus" data-art = "'+n.articul+'">+</button></div>',t+='<div class = "sign total-price col-xs-2"><p>'+n.quantity*i+"₴</p></div></div>",null==n.special_price?e+=n.quantity*n.price:e+=n.quantity*n.special_price}})),console.log(e);var n="";0!=e?(document.getElementById("buy-order").style.display="inline-block",n+="<p>Ім'я</p><input type='text' name='firstname' id = 'name'><br><br>",n+="<p>Номер телефона</p><input type='text' name='lastname' id = 'number'><br><br>",n+="<p>Електронна пошта</p><input type='text' name='lastname' id = 'email'><br><br>",$(".total").html("<p>"+e+"₴</p>"),$("#cart-mod").html(t),$("#cont").html(n)):(document.getElementById("buy-order").style.display="none",$("#cont").html(""),$("#cart-mod").html('<h3 class = "sign">No goods</h3>'),$(".total").html(""))}$.getJSON("https://nit.tron.net.ua/api/category/list",(function(t){var e='<option value = "-1">All</option>';for(var n in t)e+='<option value = "'+t[n].id+'">'+t[n].name+"</option>";$("#selection").html(e)})),$.getJSON("https://nit.tron.net.ua/api/product/list",(function(a){var s='<div class = "product-list"><div id = "title"><h1>ALL</div></h1><div class = "container">',r=0;for(var d in a)r=null!=a[d].special_price?a[d].special_price:a[d].price,i[a[d].id]={articul:a[d].id,name:a[d].name,price:r,img:a[d].image_url,quantity:"0"},s+='<div class = "card col-lg-4 col-md-6 col-sm-12">',s+='<div class = "product">',s+='<div class = "img-block"><img src="'+a[d].image_url+'" class = "prd-im"></div>',s+='<div class = "description">',null!=a[d].special_price?(s+='<div class = "old-pic">',s+='<img src="pics/sale.png?127" style="width: 100px;" class="sale">',s+='<a class = "prod-link" data-art="'+a[d].id+'">'+a[d].name+"</a>",s+="</div>",s+='<p class="new price">'+a[d].special_price+"грн</span>",s+='<p class="old price">'+a[d].price+"грн</span>"):(s+='<a class = "prod-link" data-art="'+a[d].id+'">'+a[d].name+"</a>",s+='<span class="price">'+a[d].price+"грн</span>"),s+="</div>",s+='<button class="add-to-cart" data-art="'+a[d].id+'">BUY</button>',s+="</div></div>";$("#product-list").html(s),$("button.add-to-cart").on("click",c),$(".prod-link").on("click",t),$(document).on("click",".plus",c),$(document).on("click",".min",l),$(document).on("click",".remove",o),$(document).on("click",".btn-secondary",n),$(document).on("change","#selection",e)})),null!=localStorage.getItem("cart")&&(cart=JSON.parse(localStorage.getItem("cart"))),s();var r=document.getElementById("myModal"),d=document.getElementById("prod-descr"),p=document.getElementById("mdlBtn"),u=document.getElementsByClassName("close")[0],m=document.getElementsByClassName("close")[1];p.onclick=function(){r.style.display="block",s()},u.onclick=function(){r.style.display="none"},m.onclick=function(){d.style.display="none"},window.onclick=function(t){t.target==r&&(r.style.display="none"),t.target==d&&(d.style.display="none")}}))},function(t,e,n){}]);