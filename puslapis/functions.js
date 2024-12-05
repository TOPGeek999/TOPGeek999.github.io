function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}


document.addEventListener("DOMContentLoaded", () => {
  const sections = ['home', 'about', 'resume', 'portfolio', 'services', 'contact'];
  const buttons = document.querySelectorAll('.fixed-buttons button');
  let activeButton = null;

  const observerOptions = {
      threshold: [0.7, 0.3]
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          const sectionIndex = sections.indexOf(entry.target.id);
          if (sectionIndex > -1) {
              const button = buttons[sectionIndex];
              const icon = button.querySelector('i');

              if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                  if (activeButton && activeButton !== button) {
                      activeButton.style.backgroundColor = '';
                      activeButton.querySelector('i').style.color = '#57616a';
                  }

                  button.style.backgroundColor = '#0562ba';
                  icon.style.color = '#fff';
                  activeButton = button;
              } else if (activeButton === button && entry.intersectionRatio < 0.3) {
                  button.style.backgroundColor = '';
                  icon.style.color = '#57616a';
                  activeButton = null;
              }
          }
      });
  }, observerOptions);

  sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
  });

  buttons.forEach(button => {
      const icon = button.querySelector('i');
      button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = '#0562ba';
          icon.style.color = '#fff';
      });

      button.addEventListener('mouseleave', () => {
          if (activeButton !== button) {
              button.style.backgroundColor = '';
              icon.style.color = '#57616a';
          } else {
              button.style.backgroundColor = '#0562ba';
              icon.style.color = '#fff';
          }
      });
  });
});

document.querySelectorAll('.fixed-buttons button').forEach((button, index) => {
  const sections = ['home', 'about', 'resume', 'portfolio', 'services', 'contact'];
  button.addEventListener('click', () => {
      const section = document.getElementById(sections[index]);
      if (section) {
          section.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});


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


function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const time = `${hours}:${minutes}:${seconds}`;

  document.getElementById('clock').textContent = time;
}

setInterval(updateClock, 1000);

updateClock();


const allResults = [];
let isResultsVisible = false;

document.getElementById('submitButton').addEventListener('click', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const question1 = parseInt(document.getElementById('question1').value) || 0;
  const question2 = parseInt(document.getElementById('question2').value) || 0;
  const question3 = parseInt(document.getElementById('question3').value) || 0;
  const question4 = parseInt(document.getElementById('question4').value) || 0;
  const question5 = parseInt(document.getElementById('question5').value) || 0;

  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  const phoneRegex = /^\+/;
  const addressRegex = /[A-Za-z].*\d|\d.*[A-Za-z]/;

  if (!emailRegex.test(email)) {
    alert('Invalid email! Make sure it has an "@" symbol with characters before and after it.');
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert('Invalid phone number! It should start with a "+".');
    return;
  }

  if (!addressRegex.test(address)) {
    alert('Invalid address! It should contain at least one letter and one number.');
    return;
  }

  const average = (
    (question1 + question2 + question3 + question4 + question5) / 5
  ).toFixed(2);

  allResults.push({
    firstName,
    lastName,
    email,
    phone,
    address,
    answers: [question1, question2, question3, question4, question5],
    average,
  });

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h3>Latest Submission:</h3>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Average Rating:</strong> <span style="color: ${getAverageColor(average)};">${average}</span></p>
  `;

  console.log('New submission:');
  console.log(`Name: ${firstName} ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Address: ${address}`);
  console.log(`Average Rating: ${average}`);
});

document.getElementById('showResultsButton').addEventListener('click', () => {
  const resultDiv = document.getElementById('result');

  if (isResultsVisible) {
    resultDiv.innerHTML = '';
    document.getElementById('showResultsButton').innerText = 'Show All Results';
  } else {
    if (allResults.length === 0) {
      resultDiv.innerHTML = '<p>No submissions yet.</p>';
    } else {
      resultDiv.innerHTML = '<h3>All Submissions:</h3>';
      let rowDiv = null;

      allResults.forEach((data, index) => {
        if (index % 5 === 0) {
          rowDiv = document.createElement('div');
          rowDiv.classList.add('results-row');
          resultDiv.appendChild(rowDiv);
        }

        const entryDiv = document.createElement('div');
        entryDiv.classList.add('result-block');
        entryDiv.innerHTML = `
          <h4>Submission ${index + 1}:</h4>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Address:</strong> ${data.address}</p>
          <p><strong>Average Rating:</strong> <span style="color: ${getAverageColor(data.average)};">${data.average}</span></p>
          <i>${data.firstName} ${data.lastName} (${data.email}): <span style="color: ${getAverageColor(data.average)};">${data.average}</span></i>
        `;
        rowDiv.appendChild(entryDiv);
      });
    }
    document.getElementById('showResultsButton').innerText = 'Hide All Results';
  }

  isResultsVisible = !isResultsVisible;
});

function getAverageColor(average) {
  const avg = parseFloat(average);
  if (avg >= 7) return 'green';
  if (avg >= 4) return 'orange';
  return 'red';
}