function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

const mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction();};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.opacity = "1";
    document.getElementById("myBtn").style.bottom = "20px";
  } else {
    document.getElementById("myBtn").style.opacity = "0";
    document.getElementById("myBtn").style.bottom = "-10px";
  }
}

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}