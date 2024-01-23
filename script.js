//karanlık mod
body = document.querySelector("body"),
toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.add("dark");
  toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (!body.classList.contains("dark")) {
    return localStorage.setItem("mode","light");
  }
  localStorage.setItem("mode","dark");
});

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

//saate göre ekranda yazan yazı
var tarih = new Date();
var saat = tarih.getHours();

if(saat>=0 && saat<6) {
  document.getElementById("time").innerHTML = "İyi Geceler, Ben";
}
if(saat>=6 && saat<12) {
  document.getElementById("time").innerHTML = "Günaydın, Ben";
}
if(saat>=12 && saat<18) {
  document.getElementById("time").innerHTML = "İyi Günler, Ben";
}
if(saat>=18 && saat<22) {
  document.getElementById("time").innerHTML = "İyi Akşamlar, Ben";
}
if(saat>=22 && saat<24) {
  document.getElementById("time").innerHTML = "İyi Geceler, Ben";
}

// sayfa başına çıkaran buton

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});



