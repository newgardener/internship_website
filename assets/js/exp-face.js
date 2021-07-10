const api = axios.create({
    baseURL: "https://api3.useb.co.kr/",
  });
  
  let stepIndex = 1;
  let currentPage = document.querySelector(`#step${stepIndex}.content__face`);
  
  const leftInput = document.getElementById("hidden-left-input");
  const rightInput = document.getElementById("hidden-right-input");
  let leftFormDataUrl = "";
  let rightFormDataUrl = "";
  let resultValue = document.querySelector(".face-result");
  
  const compareBtn = document.querySelector(".btn.btn1");
  const uploadLeftBtn = document.querySelector(".faceopen-btn.left");
  const uploadRightBtn = document.querySelector(".faceopen-btn.right");
  const replayBtn = document.querySelector(".btn.btn2");
  
  let imgSrc, b64Data;
  let leftImage, rightImage;
  
  uploadLeftBtn.addEventListener("click", () => {
    leftInput.click();
    console.log("leftBtn is clicked");
  });
  
  uploadRightBtn.addEventListener("click", () => {
    rightInput.click();
    console.log("rightBtn is clicked");
  });
  
  replayBtn.addEventListener("click", () => location.reload());
  
  compareBtn.addEventListener("click", () => {
    if (!leftImage || !rightImage) {
      alert("이미지를 업로드 해주세요!");
    } else {
      compareBtn.disabled = true;
      compareBtn.style.backgroundColor = "#f0f0f0";
      compareBtn.style.color = "#455aff";
      compareBtn.innerText = "유사도 분석 중...";
  
      let formData = new FormData();
      formData.append("face1", leftFormDataUrl);
      formData.append("face2", rightFormDataUrl);
  
      let failed = false;
  
      api
        .post("face/verify", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res) {
          const { data } = res;
          resultValue.innerText = `${(data.confidence * 100).toFixed(2)}%`;
          console.log(`result-data: ${data}`);
        })
        .catch(function (error) {
          if (error.response.status === 413) {
            alert("ERROR 413: 200MB 이하의 사진을 업로드해주세요.");
          } else if (error.response.status === 400) {
            alert("ERROR 400: 요청한 사진은 인물 사진이 아닙니다. 인물 사진을 업로드해주세요.");
          }
          failed = true;
          location.reload();
        })
        .finally(function () {
          if (!failed) {
            currentPage.classList.add("d-none");
            currentPage = document.querySelector(`#step2.content__face`);
            currentPage.classList.remove("d-none");
            let resultLeftImageContainer = document.querySelector(
              `#step2.content__face .face-left`
            );
            let resultRightImageContainer = document.querySelector(
              `#step2.content__face .face-right`
            );
            resultLeftImageContainer.style.background = `url(${leftImage}) no-repeat`;
            resultLeftImageContainer.style.backgroundSize = "contain";
            resultLeftImageContainer.style.backgroundPosition = "center";
            resultRightImageContainer.style.background = `url(${rightImage}) no-repeat`;
            resultRightImageContainer.style.backgroundSize = "contain";
            resultRightImageContainer.style.backgroundPosition = "center";
            compareBtn.disabled = false;
          } 
        });
    }
  });
  
  function readInputFile(position, event) {
    let file = event.target.files[0];
    console.log(`file: ${file}`);
    let reader = new FileReader();
  
    reader.onload = function (e) {
      const imageContainer = document.querySelector(`.face-${position}`);
      imgSrc = e.target.result;
      imageContainer.style.background = `url(${imgSrc}) no-repeat`;
      imageContainer.style.backgroundSize = "contain";
      imageContainer.style.backgroundPosition = "center";
  
      if (position === "left") leftImage = imgSrc;
      else rightImage = imgSrc;
    };
    reader.readAsDataURL(file);
    if (position === "left") leftFormDataUrl = file;
    else rightFormDataUrl = file;
  }
  