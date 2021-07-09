const api = axios.create({
    baseURL: "https://1won.useb.co.kr",
  });
  
  let accountNumber = document.getElementById("account-number");
  let bankName = document.getElementById("bank-name");
  let receiverName = document.getElementById("receiver-name");
  let codeType = document.querySelector('input[name="radio"]:checked').value;
  
  let selectedIndex = 0;
  let phonePrintContent = "";
  let transactionId = "";
  
  let phoneCodeValue = document.getElementById("code-value");
  let codesBox = document.querySelectorAll("input[type=text].code");
  let verifyErrorMessage = document.querySelector(".error-message");
  let resultMessage = document.querySelector('.result-message');
  
  let currentActive = 1;
  let currentPage = document.querySelector(`#step${currentActive}.content__1won`);
  
  // Buttons
  const prevBtn = document.querySelector(".btn.prev");
  let nextBtn = document.querySelector(`.btn.btn${currentActive}`);
  
  const accountNumbers = [
    "",
    "110446043000",
    "3333094768000",
    "01093841234",
    "24191020388999",
    "01075581234",
  ];
  const bankNames = [
    "",
    "신한은행",
    "카카오뱅크",
    "오픈뱅킹",
    "하나은행",
    "오픈뱅킹",
  ];
  const bankCodes = ["", "088", "090", "097", "081", "097"];
  const receiverNames = ["", "이명훈", "채승완", "황희준", "김성진", "김성수"];
  
  let bankCode = bankCodes[0];
  
  function selectType(e) {
    codeType = e.value;
    console.log(`selectType: ${codeType}`);
  }
  
  function selectAccount(e) {
    console.log('selectAccount initiated');
    selectedIndex = parseInt(e.value, 10);
    console.log(`${selectedIndex}`);
    bankName.value = bankNames[selectedIndex];
    receiverName.value = receiverNames[selectedIndex];
    bankCode = bankCodes[selectedIndex];
    accountNumber = accountNumbers[selectedIndex];
    console.log(`${bankCode}, ${accountNumber}, ${receiverName.value}, ${codeType}`);
  }
  
  function autoTab(e) {
    const { maxLength, name, value } = e.target;
    const fieldIndex = parseInt(name.slice(-1), 10);
    const nextSibling = document.querySelector(
      `input[name=code${fieldIndex + 1}]`
    );
    if (value && value.length === maxLength) {
      if (nextSibling !== null) nextSibling.focus();
    }
  }
  
  function send1won() {
    nextBtn.disabled = true;
    console.log('send1won');
    console.log(`codeType: ${codeType}`);
    
  
    api
      .post(
        "/send",
        {
          bank_code: bankCode,
          account_num: accountNumber,
          account_holder_name: receiverName.value,
          code_type: codeType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (res) {
        const { data } = res;
        if (data.success === true) {
          // update currentActive
          currentActive = 2;
          update();
          
          phonePrintContent = data.data.print_content;
          transactionId = data.transaction_id;
          console.log(`transactionId: ${transactionId}`);
          phoneCodeValue.innerText = phonePrintContent;
        } else {
          alert("송금에 실패하였습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        nextBtn.disabled = false;
      });
  }
  
  function insertCodesStep() {
      currentActive = 3;
      update();
  }
  
  function verifyCode() {
      nextBtn.disabled = true;
  
      let inputCode = document.querySelectorAll("input[type=text].code");
      let inputCodes = "";
  
      if (codeType === 'korean') {
       inputCodes = inputCode[4].value;
      }
      else {
        for (let i = 0; i < 4; i++) {
          inputCodes += inputCode[i].value;
        } 
        if (codeType === 'english') {
          console.log(`verifyCode for english`);
          inputCodes = inputCodes.toUpperCase();
        } 
      }
      console.log(`verifyCode() inputCode=> ${inputCodes}`);
  
      if (inputCodes.length > 2) {
        nextBtn.style.backgroundColor = "#f0f0f0";
        nextBtn.style.color = '#455aff'
        nextBtn.innerText = '코드 인증 중...';
        api
          .post(
            "/verify",
            {
              transaction_id: transactionId,
              print_content: inputCodes,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function(res) {
            const { data } = res;
            if (data.success === true) {
              resultMessage.innerText = '인증에 성공하였습니다';
              currentActive = 4;
              nextBtn.innerText = '다시하기';
              update();
            } else {
              nextBtn.innerText = '다음';
              verifyErrorMessage.style.display = 'block';
              verifyErrorMessage.innerText = `잘못된 코드를 입력하셨습니다 (${data.num_attempt}회)`;
              if (codeType === 'korean') {
                codesBox[4].style.borderBottom = '1px solid red';
              } else {
                for (let i = 0; i < 4; i++) {
                  codesBox[i].style.border = '1px solid red';
                }
              }
              console.log(`verifyErrorMessage: ${verifyErrorMessage.innerText}`);
            }
          })
          .catch(function(error) {
            if (error.response) {
              const { data } = error.response;
              if (codeType === 'korean') {
                codesBox[4].style.borderBottom = '1px solid red';
              } else {
                for (let i = 0; i < 4; i++) {
                  codesBox[i].style.border = '1px solid red';
                }
              }
              if (data.error_code === 'V021') {
                verifyErrorMessage.innerText = `잘못된 코드를 입력하셨습니다. (5회)`;
                alert('인증 횟수 초과입니다.');
              } else if (data.error_code === 'V031') {
                alert('인증 코드가 만료되었습니다.');
              }
            } else if (error.request) {
              // 요청이 이루어졌으나 응답을 받지 못한 경우
              console.log(error.request);
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
              console.log(error.message);
            }
            location.reload();
          })
          .finally(() => nextBtn.disabled = false)
  
      } else {
        verifyErrorMessage.innerText = '잘못된 코드를 입력하셨습니다.';
        if (codeType === 'korean') {
          codesBox[4].style.borderBottom = '1px solid red';
        } 
        else {
          for (let i = 0; i < 4; i++) {
            codesBox[i].style.border = '1px solid red';
          }
        }
        nextBtn.disabled = false;
      }
  }
  
  function nextBtnListener() {
    if (selectedIndex === 0) {
      alert("계좌를 선택해주세요!");
    } else {
      if (currentActive === 1) {
        nextBtn.style.backgroundColor = "#f0f0f0";
        nextBtn.style.color = '#455aff';
        nextBtn.innerText = "1원 송금 중...";
        send1won();
      } else if (currentActive === 2) {
        insertCodesStep();
      } else if (currentActive === 3) {
        verifyCode();
      } else {
        location.reload();
      }
    }
  }
  
  function update() {
    nextBtn.removeEventListener("click", nextBtnListener);
    nextBtn = document.querySelector(`.btn.btn${currentActive}`);
    nextBtn.addEventListener("click", nextBtnListener);
  
    currentPage.classList.add("d-none");
    currentPage = document.querySelector(`#step${currentActive}.content__1won`);
    currentPage.classList.remove("d-none");
  
    if (codeType === "korean") {
      for (let i = 0; i < 4; i++) {
        codesBox[i].style.display = "none";
      }
      codesBox[4].style.display = "block";
      codesBox[4].focus();
    } else {
      for (let i = 0; i < 4; i++) {
        if (codeType === "number")
          codesBox[i].setAttribute("inputmode", "numeric");
        codesBox[i].addEventListener("keyup", autoTab, false);
      }
      codesBox[0].focus();
    }
  }
  
  (function init() {
    prevBtn.addEventListener("click", event => {
      event.preventDefault();
      currentActive = 2;
      update();
    });
    nextBtn.addEventListener("click", nextBtnListener);
  })();
  