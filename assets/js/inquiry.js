const api = axios.create({
    baseURL: "https://api3.useb.co.kr/website",
  });
  
  // [input fields]
  let nameInfo = document.getElementById("namebox");
  let companyInfo = document.getElementById("companybox");
  let emailInfo = document.getElementById("emailbox");
  let telInfo = document.getElementById("telbox");
  let requestContent = document.getElementById("requestbox");
  
  let inputFields = true;
  
  // [buttons]
  const homeBtn = document.getElementById("home-inquire");
  const contactBtn = document.getElementById("contact-inquire");
  const contactPrevBtn = document.getElementById("contact-inquire-prev");
  
  // [pages]
  const contactPage1 = document.querySelector(".contact_form");
  const contactPage2 = document.querySelector(".contact_form_complete");
  
  function checkInput(content, index) {
    if (index === 0) {
      if (content === "") {
        nameInfo.focus();
        alert("이름을 입력해주세요!");
        return false;
      }
      return true;
    } else if (index === 2) {
      if (
        content === "" ||
        !content.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
      ) {
        emailInfo.focus();
        alert("이메일 형식에 맞게 입력해주세요!");
        return false;
      }
      return true;
    } else if (index === 3) {
      if (
        content === "" ||
        !content.match(/^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/)
      ) {
        telInfo.focus();
        alert("전화번호 형식에 맞게 입력해주세요!");
        return false;
      }
      return true;
    } else if (index === 4) {
      if (content === "") {
        requestContent.focus();
        alert("문의내용을 입력해주세요!");
        return false;
      }
      return true;
    }
    return true;
  }
  
  function sendInquiry(form, type) {
    for (let i = 0; i < form.length - 1; i++) {
      if (!checkInput(form[i].value, i)) {
        inputFields = false;
        break;
      }
    }
    let inputForm = new FormData();
    inputForm.append("name", form[0].value);
    inputForm.append("company", form[1].value);
    inputForm.append("email", form[2].value);
    inputForm.append("tel", form[3].value);
    inputForm.append("message", form[4].value);
  
    if (inputFields) {
      if (type === "home") {
        homeBtn.disabled = true;
      } else {
        contactBtn.disabled = true;
      }
  
      api
        .post("/contact", inputForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          alert("문의가 성공적으로 이루어졌습니다!");
          form.reset();
          if (type === "home") {
            homeBtn.disabled = false;
          } else {
            contactBtn.disabled = false;
            contactPage1.classList.add("d-none");
            contactPage2.classList.remove("d-none");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(
            "입력 값을 확인해 주시고 지속적으로 오류가 발생하면 연락처로 문의 부탁드립니다."
          );
        });
    }
  }
  
  (function init() {
    let currentURL = window.location.href;
    if (currentURL === "https://new.useb.co.kr/") {
      homeBtn.addEventListener("click", event => {
        event.preventDefault();
        const homeForm = document.getElementById("home-form");
        nameInfo.focus();
        sendInquiry(homeForm, "home");
      });
    } else if (currentURL === "https://new.useb.co.kr/contact/inquiry") {
      contactBtn.addEventListener("click", event => {
        event.preventDefault();
        const contactForm = document.querySelector(".contact-form");
        nameInfo.focus();
        sendInquiry(contactForm, "contact");
      });
    }
  })();
  
  