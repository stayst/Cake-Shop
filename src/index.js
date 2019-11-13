import './scss/main.scss';
var car = [];
var sum = 0;
var current = "";

$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();

function loadGoods() {
	$.getJSON('https://nit.tron.net.ua/api/category/list', function (data){
		var out = '<option value = "-1">All</option>'
		for (var key in data){
			out += '<option value = "'+data[key].id+'">'+data[key].name+'</option>'
		}
		$('#selection').html(out);
	})
	$.getJSON('https://nit.tron.net.ua/api/product/list', function (data){
	var catname;
/*	$.getJSON('https://nit.tron.net.ua/api/product/list', function (data){
		catname = data[]
	}*/
    var out = '<div class = "product-list"><div id = "title"><h1>ALL</div></h1><div class = "container">';
    var price = 0;
    for (var key in data){
    	if (data[key]['special_price'] != null) price = data[key]['special_price'];
    	else price = data[key]['price'];
    	car[data[key]['id']] = {
    		articul: data[key]['id'],
    		name: data[key]['name'],
        	price: price,
        	img: data[key]['image_url'],
        	quantity: '0',
    	}
    	out += '<div class = "card col-lg-4 col-md-6 col-sm-12">';
		out += '<div class = "product">';
		out += '<div class = "img-block"><img src="'+data[key]['image_url']+'" class = "prd-im"></div>';
		out += '<div class = "description">';
		if (data[key]['special_price']!=null){
			out += '<div class = "old-pic">';
			out += '<img src="pics/sale.png?127" style="width: 100px;" class="sale">';
			out += 	'<a class = "prod-link" data-art="'+data[key]['id']+'">' + data[key]['name']+'</a>';
			out += '</div>';
			out += '<p class="new price">'+data[key]['special_price']+'грн</span>'
			out += '<p class="old price">'+data[key]['price']+'грн</span>'
		}
		else{
			out += 	'<a class = "prod-link" data-art="'+data[key]['id']+'">' + data[key]['name']+'</a>';
			out += '<span class="price">'+data[key]['price']+'грн</span>';
		}
		out += '</div>';
		out += '<button class="add-to-cart" data-art="'+data[key]['id']+'">BUY</button>';
		out += '</div></div>';
    }
    $('#product-list').html(out);
    $('button.add-to-cart').on('click', addToCart);
    $('.prod-link').on('click', show);
    $(document).on('click', '.plus', addToCart);
    $(document).on('click', '.min', deleteFromCart);
    $(document).on('click', '.remove', removeFromCart);
    $(document).on('click', '.btn-secondary', buy);
    $(document).on('change', '#selection', change);
})
}

function show(){
	console.log($('#prod-descr'));
	document.getElementById("prod-descr").style.display = "block";
	var articul = $(this).attr('data-art');
	console.log(articul);
	var name;
	$.getJSON('https://nit.tron.net.ua/api/product/list', function (data){
		for (var key in data){
			if (data[key]['id'] == articul){
				var price = 0;
				if (data[key]['special_price'] == null) price = data[key]['price'];
				else price = data[key]['special_price'];
				name = data[key]['name'];
				var out = '<h2>'+name+'</h2>';
				$('#p-name').html(out);
				out = '<img class = "item-im" src = "'+data[key]['image_url']+'">';
				out += '<h3>' + data[key]['description']+'</h3>';
				out += '<span class="price it-price">'+price+'грн</span>';
				out += '<button class="add-to-cart" data-art="'+data[key]['id']+'">BUY</button>';
				$('#p-descr').html(out);
				$('button.add-to-cart').on('click', addToCart);
			}
		}
	})
}

function change(){
	var id = document.getElementById("selection").value;
	console.log(id);
	var name = "All";
	if (id==-1){
	 var link = 'https://nit.tron.net.ua/api/product/list';
	}
	else{
	var link = 'https://nit.tron.net.ua/api/product/list/category/'+id;
	$.getJSON('https://nit.tron.net.ua/api/category/list', function (data){
		for (var key in data){
			if (data[key]['id'] == id){
				name = data[key]['name'];
			}
		}
	})
}
	$.getJSON(link, function (data){
		    var out = '<div class = "product-list"><h1>'+name+'</h1><div class = "container">';
    for (var key in data){
    	car[data[key]['id']] = {
    		articul: data[key]['id'],
    		name: data[key]['name'],
        	price: data[key]['price'],
        	special_price: data[key]['special_price'],
        	img: data[key]['image_url'],
        	quantity: '0',
    	}
    	out += '<div class = "card col-lg-4 col-md-6 col-sm-12">';
		out += '<div class = "product">';
		out += '<div class = "img-block"><img src="'+data[key]['image_url']+'" class = "prd-im"></div>';
		out += '<div class = "description">';
		if (data[key]['special_price']!=null){
			out += '<div class = "old-pic">';
			out += '<img src="pics/sale.png?127" style="width: 100px;" class="sale">';
			out += 	'<a class = "prod-link" data-art="'+data[key]['id']+'">' + data[key]['name']+'</a>';
			out += '</div>';
			out += '<p class="new price">'+data[key]['special_price']+'грн</span>'
			out += '<p class="old price">'+data[key]['price']+'грн</span>'
		}
		else{
			out += 	'<a class = "prod-link" data-art="'+data[key]['id']+'">' + data[key]['name']+'</a>';
			out += '<span class="price">'+data[key]['price']+'грн</span>';
		}
		out += '</div>';
		out += '<button class="add-to-cart" data-art="'+data[key]['id']+'">BUY</button>';
		out += '</div></div>';
		$('button.add-to-cart').on('click', addToCart);
    }
    $('#product-list').html(out);
    $('button.add-to-cart').on('click', addToCart);
    $('.prod-link').on('click', show);
	})
}

function buy(){
	if (document.getElementById("name").value == "" || document.getElementById("number").value == "" ||
		document.getElementById("email").value == "") alert("Invalid Contacts!");
	else{ 
		var result = confirm("Confirm your order!");
		if (result){
	var search = [];
	var n = 0;
	car.forEach(function(w){
		if (w.quantity>0){
			search[n] = w;
			n++;
		}
	})
	$.ajax({
		type: "POST",
		contentType: "text/plain",
		url: "https://nit.tron.net.ua/api/order/add",
		data: JSON.stringify(search),
		dataType: 'json',
		cache: false,
		token: 'Fs2_bUolpEdDsxYq_jXr',
		name: document.getElementById("name").value,
		number: document.getElementById("number").value,
		email: document.getElementById("email").value,
		timeout: 100000,
		success: function (data) {
			console.log("SUCCESS : ", data);
		},
		error: function (e) {
			console.log("ERROR : ", e);

		}
	});
	car.forEach(function(w){
		if (w.quantity>0){
			w.quantity = 0;
		}
	})
	 modal.style.display = "none";
	 sum = 0;
	 $('.cart p').html(sum);
}
}
}

function addToCart() {
    if(sum<100){
    var articul = $(this).attr('data-art');
    console.log(articul);
    if (car[articul]!=undefined) {
        car[articul].quantity++;
    }
    else {
        car[articul].quantity = 1;
    }
    ++sum;
    if (sum == 10){
        var a = document.getElementById("numb");
        a.style.fontSize = "100%";
        a.style.left = "17%";
        a.style.top = "46%"
    }
    $('.cart p').html(sum);
    //$('.counter1').html(cart[articul]);
    showMiniCart();
}
}

function deleteFromCart() {
    var articul = $(this).attr('data-art');
    if (car[articul]!=undefined && car[articul].quantity!=0) {
        car[articul].quantity--;
        --sum;
    }
    else {
        car[articul].quantity = 0;
    }
    if (sum == 9){
        var a = document.getElementById("numb");
        a.style.fontSize = "130%";
        a.style.left = "23%";
        a.style.top = "42%"
    }
    $('.cart p').html(sum);
    showMiniCart();
}
function removeFromCart() {
    var articul = $(this).attr('data-art');
    sum-=car[articul].quantity;
    car[articul].quantity = 0;
    $('.cart p').html(sum);
    showMiniCart();
}

function checkCart(){
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart(){
        var out ='';
        var s = 0;
    car.forEach(function(w){
        if (w.quantity!=0){
        	var price = 0;
        	if (w.special_price != null) price = w.special_price;
        	else price = w.price;
            out +='<div class = "item row"><div class = "sign delete col-xs-1">'
            out += '<button class="remove" data-art = "' + w.articul + '">&times;</button></div>'
            out += '<div class = "photo col-sm-3 col-xs-1 d-none d-sm-block"><img src="'+w.img+'"></div>'
            out += '<div class = "title col-xs-3"><p>'+w.name+'</p>'
            if (w.special_price != null) out += '<p class = "price">'+w.special_price+' грн</p></div><div class = "sign title col-xs-1">';
            else out += '<p class = "price">'+w.price+' грн</p></div><div class = "sign title col-xs-1">';
            out += '<button class = "min" data-art = "' + w.articul + '">-</button>'
            out += '</div><div class = "col-xs-2 col-sm-1"><p class = "numb">'+w.quantity+'</p></div>'
            out += '<div class = "sign col-xs-1"><button class = "plus" data-art = "' + w.articul + '">+</button></div>'
            out += '<div class = "sign total-price col-xs-2"><p>'+w.quantity*price +'₴</p></div></div>'
            if (w.special_price == null) s += w.quantity*w.price;
            else s += w.quantity*w.special_price;
        }
    })
    console.log(s);
    var cont = "";
    if (s != 0){
    	document.getElementById("buy-order").style.display = 'inline-block';
    	cont +="<p>Ім'я</p><input type='text' name='firstname' id = 'name'><br><br>";
		cont += "<p>Номер телефона</p><input type='text' name='lastname' id = 'number'><br><br>";
		cont += "<p>Електронна пошта</p><input type='text' name='lastname' id = 'email'><br><br>";
    $('.total').html('<p>'+s+'₴</p>');
    $('#cart-mod').html(out);
    $('#cont').html(cont);
}
else{
	document.getElementById("buy-order").style.display = 'none';
	$('#cont').html("");
	$('#cart-mod').html('<h3 class = "sign">No goods</h3>');
	$('.total').html('');
}
    //$('#mini-cart').html(out);
}

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("prod-descr");

var btn = document.getElementById("mdlBtn");

var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

btn.onclick = function() {
  modal.style.display = "block";
  showMiniCart();
}

span.onclick = function() {
  modal.style.display = "none";
}

span2.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
   if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
});