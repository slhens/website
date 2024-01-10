const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
  
})

var tarih = new Date();
var saat = tarih.getHours();

if(saat>=0 && saat<6) {
  document.getElementById("time").innerHTML = "İyi Geceler, Ben";
  console.log(saat);
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
