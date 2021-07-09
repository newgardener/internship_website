const api = axios.create({
    baseURL: "https://api2.useb.co.kr/website",
  });
  
  const ocrTabs = document.querySelectorAll(".ocr-tab-cell");
  const exampleImageTabs = document.querySelectorAll(".image-tab");
  const resultWebTabs = document.querySelectorAll(".result-tab.not_mobile");
  const resultWebContent = document.getElementById("result-web-content");
  const descriptionContainer = document.querySelector(".ocr-descript");
  
  const ocrMobileTabs = document.querySelectorAll(".result-exp-submenu");
  const exampleImageMobileTabs = document.querySelectorAll(".example-tab");
  const demoTabs = document.querySelectorAll(".demo-tab");
  const resultMobileTabs = document.querySelectorAll(".result-tab.on_mobile");
  const resultMobileContent = document.getElementById("result-mobile-content");
  const descriptionMobileContainer = document.querySelector(".result-descript");
  const descriptionMobileImage = document.querySelector(".result-image img");
  const descriptionMobileImageContainer = document.querySelector(".result-image");
  const resultbox = document.querySelector(".result-box");
  
  const descriptionContents = [
    "한국어와 영어를 인식할 수 있는 기본 모델입니다.\n왜곡이 있거나 복잡한 이미지에서도 정확하게 텍스트를 인식하며, 손글씨의 인식률도 뛰어납니다.",
    "정보를 추출하고 싶은 영역을 템플릿으로 직접 지정하여, 동일한 유형의 문서 관리를 효율적으로 할 수 있습니다.",
    "한국의 주민등록증 인식을 제공합니다.\n기울어져 촬영되거나 일부가 마스킹 되어 있는 경우 인식에 방해가 될 수 있습니다",
    "한국의 운전면허증 인식을 제공합니다.\n기울어져 촬영되거나 일부가 마스킹 되어 있는 경우 인식에 방해가 될 수 있습니다",
    "한국의 여권 인식을 제공합니다.\n기울어져 촬영되거나 일부가 마스킹 되어 있는 경우 인식에 방해가 될 수 있습니다",
    "해외의 여권 인식을 제공합니다.\n기울어져 촬영되거나 일부가 마스킹 되어 있는 경우 인식에 방해가 될 수 있습니다",
    "한국에 등록된 외국인등록증 인식을 제공합니다.\n기울어져 촬영되거나 일부가 마스킹 되어 있는 경우 인식에 방해가 될 수 있습니다",
  ];
  
  const sampleImageUrls = [
    "sample_general.jpg",
    "sample_business.png?v=0.1",
    "sample_idcard.png",
    "sample_driver.png",
    "sample_passport.png",
    "sample_passport-overseas.jpeg",
    "sample_alien.png",
  ];
  
  const sampleData = [
    { fullText: "널 위해<br/>준비했어<br/>조금만<br/>기다려줘" },
    {
      docType: "일반과세자",
      companyName: "아름다운 유스비",
      ownerName: "김유스비",
      businessRegNum: "376-61-206108",
      businessCorpNum: "",
      companyAddr:
        "서울특별시 서초구 서초대로65길 13-10(서초동, 서초래미안아파트",
      HQaddr: "",
      openDate: "2020년08월10일",
      businessType1: "서비스업,서비스업,서비스업",
      businessType2: "세무사",
    },
    { userName: "김유스비", jumin: "960201-1234567", issueDate: "2018.01.28" },
    {
      userName: "김유스비",
      jumin: "920909-1234567",
      driverNo: "11-19-174133-01",
      issueDate: "2019.01.01",
    },
    {
      userName: "유스비",
      userNameEng: "useB",
      passportNo: "M123A4567",
      jumin: "19870201",
      issueDate: "2020.01.02",
      expireDate: "2030.01.02",
    },
    {
      userName: "MOSS FRANK",
      passportNo: "100003106",
      nationality: "USA",
      birthDate: "1950.01.01",
      expireDate: "2015.03.02",
    },
    {
      userName: "유스비",
      issueNo: "123456-1234567",
      issueDate: "2018.09.21",
    },
  ];
  
  const wordDictionary = {
    fullText: "",
    userName: "성명",
    jumin: "주민등록번호",
    driverNo: "면허번호",
    issueDate: "발급일",
    userNameEng: "영어이름",
    passportNo: "여권번호",
    expireDate: "기간만료일",
    nationality: "국적",
    birthDate: "생년월일",
    country: "국가지역",
    issueNo: "외국인 등록번호",
    docType: "문서종류",
    companyName: "상호",
    ownerName: "대표명",
    businessRegNum: "등록번호",
    businessCorpNum: "법인등록번호",
    companyAddr: "사업장소재지",
    HQaddr: "본점소재지",
    openDate: "개업년월일",
    businessType1: "업태",
    businessType2: "종목",
  };
  
  const endPoints = [
    "all",
    "business-registration",
    "idcard",
    "driver",
    "passport",
    "passport-overseas",
    "alien",
  ];
  
  let cookie;
  
  let ocrTabIndex = 0;
  let resultTabIndex = 0;
  let imageTabIndex = 0;
  let ocrLoading = false;
  
  // FIXME: (demoTabIndex === ocrMobileTabIndex) or (imageMobileIndex === ocrMobileTabIndex)
  // mobile camera 상에서 ocr mode 설정
  let demoTabIndex = 0;
  // mobile result tab index
  let ocrMobileTabIndex = 0;
  // mobile example image index
  let imageMobileTabIndex = 0;
  
  // WEB
  const webCanvas = document.querySelector(".web-canvas");
  const webHiddenInput = document.querySelector("#web-hidden-input");
  const ocrConsentForm = document.querySelector("section.ocr__consent__form");
  const uploadBtn = document.querySelector(".btn-upload");
  
  // MOBILE
  const mobileCanvas = document.querySelector(".mobile-canvas");
  const mobileHiddenInput = document.querySelector(".blind");
  const cameraBtn = document.getElementById("camera-btn");
  const video = document.querySelector("video");
  const videoContainer = document.querySelector(".video__wrapper");
  const introduceContainer = document.querySelector(".introduce__container");
  const exampleContainer = document.querySelector(".example__view");
  const backgroundContainer = document.querySelector(".ocr-bg");
  
  const groupCamera = document.querySelector(".group__camera");
  const galleryBtn = document.querySelector(".btn-gallery");
  const screenshotBtn = document.querySelector(".btn-shoot");
  const exampleViewBtn = document.querySelector(".btn-example");
  const closeExampleBtn = document.getElementById("btn-example-close");
  const closeBtn = document.querySelector(".btn-close");
  
  let streamStarted = false;
  let formDataUrl = "";
  
  let screenWidth = window.innerWidth;
  
  const constraints = {
    audio: false,
    video: {
      width: {
        min: 320,
        ideal: 720,
        max: 2560,
      },
      height: {
        min: 240,
        ideal: 680,
        max: 1440,
      },
      frameRate: {
        ideal: 60,
        min: 10,
      },
      facingMode: "environment",
    },
  };
  
  //---------------------------------------------------- MOBILE Tabs + Btns
  ocrMobileTabs.forEach((ocrMobileTab, index) => {
    ocrMobileTab.addEventListener("click", () => {
      if (!ocrMobileTab.classList.contains("result-blue-bg")) {
        ocrMobileTab.classList.add("result-blue-bg");
        ocrMobileTabs[ocrMobileTabIndex].classList.remove("result-blue-bg");
        ocrMobileTabIndex = index;
      }
      descriptionMobileContainer.innerText = descriptionContents[index];
      if (index === 1) {
        descriptionMobileContainer.innerText =
          "정보를 추출하고 싶은 영역을 템플릿으로\n 직접 지정하여,동일한 유형의 문서 관리를\n 효율적으로 할 수 있습니다.";
      }
      descriptionMobileImage.src = `/assets/images/${sampleImageUrls[index]}`;
    });
  });
  
  demoTabs.forEach((demoTab, index) => {
    demoTab.addEventListener("click", () => {
      if (demoTabIndex !== index) {
        demoTabs[demoTabIndex].setAttribute("aria-selected", false);
        demoTab.setAttribute("aria-selected", true);
        demoTabIndex = index;
      }
      if (demoTabIndex !== ocrMobileTabIndex) {
        ocrMobileTabs[ocrMobileTabIndex].classList.remove("result-blue-bg");
        ocrMobileTabs[demoTabIndex].classList.add("result-blue-bg");
        ocrMobileTabIndex = demoTabIndex;
      }
    });
  });
  
  resultMobileTabs.forEach((resultMobileTab, index) => {
    resultMobileTab.addEventListener("click", () => {
      if (index === 1) {
        alert(
          "아직 준비 중인 기능입니다! 최대한 빠른 시일내에 제공해드리겠습니다"
        );
      } else if (resultTabIndex !== index) {
        resultMobileTabs[resultTabIndex].setAttribute("aria-selected", false);
        resultMobileTab.setAttribute("aria-selected", true);
        resultTabIndex = index;
      }
    });
  });
  
  exampleImageMobileTabs.forEach((exampleImageTab, index) => {
    exampleImageTab.addEventListener("click", () => {
      if (imageMobileTabIndex !== index) {
        exampleImageMobileTabs[imageMobileTabIndex].setAttribute(
          "aria-selected",
          false
        );
        exampleImageTab.setAttribute("aria-selected", true);
        imageMobileTabIndex = index;
      }
      if (ocrMobileTabIndex !== index) {
        ocrMobileTabs[ocrMobileTabIndex].classList.remove("result-blue-bg");
        ocrMobileTabs[index].classList.add("result-blue-bg");
        ocrMobileTabIndex = index;
      }
      mobileCanvas.style.width = "100%";
      mobileCanvas.style.height = "100%";
      mobileCanvas.style.backgroundImage = `url('/assets/images/${sampleImageUrls[index]}')`;
      backgroundContainer.style.background = "#e3e3e3";
      mobileCanvas.classList.remove("d-none");
      videoContainer.classList.add("d-none");
      exampleContainer.classList.add("d-none");
      descriptionMobileImageContainer.classList.add("d-none");
      descriptionMobileImage.classList.add("d-none");
      resultbox.classList.remove("d-none");
      makeOcrResultHtml(sampleData[index], "mobile");
    });
  });
  
  cameraBtn.addEventListener("click", () => {
    if (startStream) {
      if (!cameraBtn.classList.contains('cookie-is-set')) {
        ocrConsentForm.classList.add("active");
      } else {
        ocrConsentForm.classList.remove("active");
      }
      video.play();
      videoContainer.classList.remove("d-none");
      groupCamera.classList.remove("d-none");
      introduceContainer.classList.add("d-none");
      closeBtn.classList.remove("d-none");
    }
  });
  
  closeBtn.addEventListener("click", () => {
    if (video.classList.contains("d-none")) {
      video.play();
      mobileCanvas
        .getContext("2d")
        .clearRect(0, 0, mobileCanvas.width, mobileCanvas.height);
      mobileCanvas.style.width = "";
      mobileCanvas.style.height = "";
      mobileCanvas.style.backgroundImage = "none";
  
      video.classList.remove("d-none");
      groupCamera.classList.remove("d-none");
      mobileCanvas.classList.add("d-none");
      resultbox.classList.add("d-none");
      descriptionMobileImageContainer.classList.remove("d-none");
      descriptionMobileImage.classList.remove("d-none");
    } else {
      videoContainer.classList.add("d-none");
      introduceContainer.classList.remove("d-none");
      groupCamera.classList.add("d-none");
      closeBtn.classList.add("d-none");
      mobileCanvas.classList.add("d-none");
      mobileCanvas.style.width = "";
      mobileCanvas.style.height = "";
      mobileCanvas.style.backgroundImage = "none";
      videoContainer.classList.remove("d-none");
    }
  });
  
  galleryBtn.addEventListener("click", () => {
    !ocrLoading && mobileHiddenInput.click();
  });
  
  exampleViewBtn.addEventListener("click", () => {
    groupCamera.classList.add("d-none");
    exampleContainer.classList.remove("d-none");
  });
  
  closeExampleBtn.addEventListener("click", () => {
    groupCamera.classList.remove("d-none");
    exampleContainer.classList.add("d-none");
  });
  
  // ---------------------------------------------------- WEB Tabs + Btns
  ocrTabs.forEach((ocrTab, index) => {
    ocrTab.addEventListener("click", () => {
      if (!ocrTab.classList.contains("ocr-ac")) {
        ocrTab.classList.add("ocr-ac");
        ocrTabs[ocrTabIndex].classList.remove("ocr-ac");
        ocrTabIndex = index;
      }
      if (imageTabIndex !== index) {
        exampleImageTabs[imageTabIndex].setAttribute("aria-selected", false);
        exampleImageTabs[index].setAttribute("aria-selected", true);
        imageTabIndex = index;
      }
      descriptionContainer.innerText = descriptionContents[index];
      webCanvas.style.backgroundImage = `url('/assets/images/${sampleImageUrls[index]}')`;
      makeOcrResultHtml(sampleData[index], "web");
    });
  });
  
  exampleImageTabs.forEach((imageTab, index) => {
    imageTab.addEventListener("click", () => {
      if (imageTabIndex !== imageTab.getAttribute("data-key")) {
        exampleImageTabs[imageTabIndex].setAttribute("aria-selected", false);
        imageTab.setAttribute("aria-selected", true);
        imageTabIndex = index;
      }
      if (!ocrTabs[index].classList.contains("ocr-ac")) {
        ocrTabs[ocrTabIndex].classList.remove("ocr-ac");
        ocrTabs[index].classList.add("ocr-ac");
        ocrTabIndex = index;
      }
      webCanvas.style.backgroundImage = `url('/assets/images/${sampleImageUrls[index]}')`;
      makeOcrResultHtml(sampleData[index], "web");
    });
  });
  
  resultWebTabs.forEach((resultTab, index) => {
    resultTab.addEventListener("click", () => {
      if (index === 1) {
        alert(
          "아직 준비 중인 기능입니다! 최대한 빠른 시일내에 제공해드리겠습니다"
        );
      }
    });
  });
  
  uploadBtn.addEventListener("click", () => {
    // TODO: fill out the consent form before experiencing ocr serivce
    if (!uploadBtn.classList.contains('cookie-is-set')) {
      !ocrLoading && ocrConsentForm.classList.add("active");
    } else {
      !ocrLoading && webHiddenInput.click();
    }
    
  });
  
  let resizeDeboundFn = debound(function () {
    if (window.innerWidth <= 970) {
      if (
        "mediaDevices" in navigator &&
        navigator.mediaDevices.getUserMedia &&
        !streamStarted
      ) {
        const updatedConstraints = {
          ...constraints,
        };
        startStream(updatedConstraints);
      }
    }
  }, 500);
  
  function debound(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  const startStream = async constraints => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  };
  
  const handleStream = stream => {
    video.srcObject = stream;
    video.width > video.height
      ? ((video.style.width = "100%"), (video.style.height = ""))
      : ((video.style.width = ""), (video.style.height = "100%"));
  
    videoContainer.classList.remove("d-none");
    streamStarted = true;
  };
  
  window.addEventListener("load", resizeDeboundFn);
  window.addEventListener("resize", resizeDeboundFn);
  
  function makeOcrResultHtml(data, type) {
    let contents = "";
    for (var key in data) {
      if (data[key] !== "" && data[key] !== null) {
        if (wordDictionary[key] === "") {
          contents = `
          <div class="result-ocr-wrap">
            <p class="result-text">${data[key]}</p>
          </div>
          `;
        } else {
          contents += `
          <div class="result-wrap">
            <span class="result-title">${wordDictionary[key]}</span>
            <p class="result-text">${data[key]}</p>
          </div>
          `;
        }
      }
      if (type === "web") {
        resultWebContent.innerHTML = contents;
      } else {
        resultMobileContent.innerHTML = contents;
      }
    }
  }
  
  function readInputFile(device, event) {
    console.log('readInputFile function __init__')
    let reader = new FileReader();
  
    reader.onload = function (event) {
      console.log(event.target);
      const imgSrc = event.target.result;
      if (device === "desktop") {
        webCanvas.style.backgroundImage = `url('${imgSrc}')`;
        getOcrData(ocrTabIndex, "web");
      } else {
        mobileCanvas.style.width = "100%";
        mobileCanvas.style.height = "100%";
        mobileCanvas.style.backgroundImage = `url('${imgSrc}')`;
  
        video.classList.add("d-none");
        groupCamera.classList.add("d-none");
        descriptionMobileImageContainer.classList.add("d-none");
        descriptionMobileImage.classList.add("d-none");
        resultbox.classList.remove("d-none");
        mobileCanvas.classList.remove("d-none");
        getOcrData(demoTabIndex, "mobile");
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    formDataUrl = event.target.files[0];
  }
  
  function getOcrData(tabIndex, type) {
    ocrLoading = true;
  
    if (type === "web") {
      resultWebContent.innerText = "글자를 인식 중입니다...";
    } else {
      if (ocrMobileTabIndex !== tabIndex) {
        ocrMobileTabs[ocrMobileTabIndex].classList.remove("result-blue-bg");
        ocrMobileTabs[tabIndex].classList.add("result-blue-bg");
        ocrMobileTabIndex = tabIndex;
      }
      backgroundContainer.style.background = "#e3e3e3";
      resultMobileContent.innerText = "글자를 인식 중입니다...";
    }
  
    let formData = new FormData();
    formData.append("image", formDataUrl);
    api
      .post(`/ocr/${endPoints[tabIndex]}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        const { data } = res;
        parseData(data.data, tabIndex, type);
      })
      .catch(function (error) {
        if (type === "web") {
          resultWebContent.innerText = "올바른 이미지가 아닙니다.";
        } else {
          resultMobileContent.innerText = "올바른 이미지가 아닙니다.";
        }
      })
      .finally(() => (ocrLoading = false));
  }
  
  function parseData(data, tabIndex, type) {
    let parseData = clone(sampleData[tabIndex]);
  
    for (let key in parseData) {
      if (data.hasOwnProperty(key)) parseData[key] = data[key];
      else parseData[key] = "";
    }
    if (data.hasOwnProperty("issueDate")) {
      parseData["issueDate"] = replaceDate(parseData["issueDate"]);
    }
    if (data.hasOwnProperty("expireDate")) {
      parseData["expireDate"] = replaceDate(parseData["expireDate"]);
    }
    if (data.hasOwnProperty("birthDate")) {
      parseData["birthDate"] = replaceDate(parseData["birthDate"]);
    }
    makeOcrResultHtml(parseData, type);
  }
  
  function clone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
  
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  }
  
  function replaceDate(date) {
    const len = date.length;
    if (len >= 7) {
      return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
    }
    if (len >= 5) {
      return `${date.slice(0, 4)}.${date.slice(4, 6)}`;
    }
    return date;
  }
  
  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/webp" });
  }
  
  const doScreenshot = () => {
    video.pause();
    mobileCanvas.width = video.videoWidth;
    mobileCanvas.height = video.videoHeight;
    console.log(`canvas width: ${mobileCanvas.width}`);
    console.log(`canvas height: ${mobileCanvas.height}`);
    mobileCanvas.getContext("2d").drawImage(video, 0, 0);
    window.innerHeight > window.innerWidth
      ? (mobileCanvas.style.height = "100%")
      : (mobileCanvas.style.width = "100%");
    mobileCanvas.style.backgroundImage = `url(${mobileCanvas.toDataURL(
      "image/webp"
    )})`;
  
    mobileCanvas.classList.remove("d-none");
    video.classList.add("d-none");
    groupCamera.classList.add("d-none");
    descriptionMobileImageContainer.classList.add("d-none");
    descriptionMobileImage.classList.add("d-none");
    resultbox.classList.remove("d-none");
  
    formDataUrl = dataURItoBlob(mobileCanvas.toDataURL("image/webp", 1.0));
    getOcrData(demoTabIndex, "mobile");
  };
  
  screenshotBtn.addEventListener("click", doScreenshot);
  