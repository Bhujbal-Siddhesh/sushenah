"use strict";

let aObjects = [];
let nLoadedBlurImages = 0;
let aLoadedUnBlurImages = [];

const aBlurImageLinks = [
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/1.webp",
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/2.webp",
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/3.webp",
];
const aUnBlurImageLinks = [
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/01.webp",
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/02.webp",
    "https://bhujbal-siddhesh.github.io/sushenah/testImages/03.webp",
];

let aPairs = [];
const aDivIds = ["Blur", "UnBlur"];

for (let nCount = 0; nCount < aUnBlurImageLinks.length; nCount++) {
    aPairs.push(String("Pair_" + (nCount + 1)));
}

const oGalleryContainer = document.getElementById("galleryContainer");
let oHiddenFragment = document.createDocumentFragment();

for (let nCount_1 = 0; nCount_1 < aPairs.length; nCount_1++) {
    const oParentDivElement = document.createElement("div");
    oParentDivElement.setAttribute("id", aPairs[nCount_1]);
    oHiddenFragment.appendChild(oParentDivElement);

    const oParentDiv = {};
    oParentDiv.parentDivID = aPairs[nCount_1];
    oParentDiv.parentDivElement = oParentDivElement;

    for (let nCount_2 = 0; nCount_2 < aDivIds.length; nCount_2++) {
        const oImageElement = document.createElement("img");
        oImageElement.setAttribute("id", aPairs[nCount_1] + "_" + aDivIds[nCount_2] + "_Img");
        oImageElement.setAttribute("alt", aPairs[nCount_1] + "_" + aDivIds[nCount_2] + "_Img");

        if (!(window.screen.width < 992)) {
            oGalleryContainer.classList.add("container-fluid");
            oGalleryContainer.classList.add("d-flex");
            oGalleryContainer.classList.add("flex-wrap");
            oGalleryContainer.classList.add("justify-content-center");

            oParentDivElement.style.width = "30%";
            oParentDivElement.classList.add("d-flex");
            oParentDivElement.classList.add("align-items-stretch");

            oImageElement.style.padding = "0.1rem";
        }
        oImageElement.setAttribute("width", "100%");
        oImageElement.setAttribute("height", "auto");

        const oImageTag = {};

        if (aDivIds[nCount_2] == "Blur") {
            oImageElement.setAttribute("src", aBlurImageLinks[nCount_1]);
            oImageElement.setAttribute("onload", "loadUnBlurImages()");
            oImageTag.imageTagElement = oImageElement;

        } else if (aDivIds[nCount_2] == "UnBlur") {
            oImageElement.style.display = "none";
            oImageElement.setAttribute("data-src", aUnBlurImageLinks[nCount_1]);
            oImageElement.setAttribute("onload", "changeStyling(" + oImageElement.getAttribute("id") + ")");
            oImageTag.imageTagElement = oImageElement;
        }
        oParentDiv["o" + aDivIds[nCount_2] + "ImgElement"] = oImageTag;

        oParentDivElement.appendChild(oImageElement);
    }
    aObjects.push(oParentDiv);
}

function loadUnBlurImages() {
    nLoadedBlurImages++;
    
    if (nLoadedBlurImages === aObjects.length) {
        oGalleryContainer.appendChild(oHiddenFragment);
        for (let nCount = 0; nCount < aObjects.length; nCount++) {
            if (aObjects[nCount].oUnBlurImgElement.imageTagElement.hasAttribute("src") == false) {
                aObjects[nCount].oUnBlurImgElement.imageTagElement.setAttribute("src", aObjects[nCount].oUnBlurImgElement.imageTagElement.getAttribute("data-src"));
            }
        }
    }
}

function changeStyling(oImageElement) {
    for (let nCount = 0; nCount < aObjects.length; nCount++) {
        if (!aLoadedUnBlurImages.includes(oImageElement.id) && aObjects[nCount].oUnBlurImgElement.imageTagElement.id === oImageElement.id) {
            aObjects[nCount].oBlurImgElement.imageTagElement.style.display = "none";
            aObjects[nCount].oUnBlurImgElement.imageTagElement.style.display = "inline";
            aLoadedUnBlurImages.push(oImageElement.id);
            break;
        }
    }
}
