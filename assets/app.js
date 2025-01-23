$(document).ready(function () {
  $('.teachers-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });
});

document.addEventListener('DOMContentLoaded', () => {

  //Load common files
  fetch('/common/nav.html')
    .then(response => response.text())
    .then(data => {
      const navContainer = document.getElementById('navContainer');
      if (navContainer) {
        navContainer.innerHTML += data;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  fetch('/common/latest-topics.html')
    .then(response => response.text())
    .then(data => {
      const pdfContainer = document.querySelector('.pdf-container');
      if (pdfContainer) {
        pdfContainer.innerHTML += data;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  fetch('/common/footer.html')
    .then(response => response.text())
    .then(data => {
      const siteFooter = document.querySelector('.site-footer');
      if (siteFooter) {
        siteFooter.innerHTML += data;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


  //Animation in stats block in home page
  const statItems = document.querySelectorAll('.stat-item');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.3 } // Trigger when 30% of the element is visible
  );

  statItems.forEach((item) => observer.observe(item));

  //Gallery JS
  const buttons = document.querySelectorAll(".gallery-nav button");
  const items = document.querySelectorAll(".gallery-item");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));
      // Add 'active' class to the clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Show or hide items based on the category
      items.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"; // Show item
        } else {
          item.style.display = "none"; // Hide item
        }
      });
    });
  });

  //TC
    const searchBtn = document.getElementById('search-btn');
    const tcInput = document.getElementById('tc-input');
    const resultContainer = document.getElementById('tc-result');
    
    if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const tcNumber = tcInput.value.trim();
  
      if (!tcNumber) {
        resultContainer.innerHTML = `<p style="color: red;">Please enter a TC Number.</p>`;
        return;
      }
  
      fetch('./assets/tc-data.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load data');
          }
          return response.json();
        })
        .then((data) => {
          const tcRecord = data.find((item) => item['TC No.'] === tcNumber);
  
          if (tcRecord) {
            resultContainer.innerHTML = `
              <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Admission No</th>
                  <th>TC No.</th>
                  <th>Class</th>
                  <th>Session</th>
                </tr>
                <tr>
                  <td>${tcRecord['S.No']}</td>
                  <td>${tcRecord.Name}</td>
                  <td>${tcRecord["Father's Name"]}</td>
                  <td>${tcRecord['Admission No']}</td>
                  <td>${tcRecord['TC No.']}</td>
                  <td>${tcRecord.Class}</td>
                  <td>${tcRecord.Session}</td>
                </tr>
              </table>
            `;
          } else {
            resultContainer.innerHTML = `<p style="color: red;">Invalid TC Number or TC not found!</p>`;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          resultContainer.innerHTML = `<p style="color: red;">An error occurred while fetching data.</p>`;
        });
    });
    }
  });  
