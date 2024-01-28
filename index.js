"use strict";

let aObjects = [];
let aLoadedBlurImages = [];
let aLoadedUnBlurImages = [];

(function () {
    const aBlurImageLinks = [
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/1.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/2.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/3.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/2.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/3.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/1.webp"
    ];
    const aUnBlurImageLinks = [
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/01.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/02.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/03.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/02.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/03.webp",
        "https://bhujbal-siddhesh.github.io/sushenah/testImages/01.webp"
    ];
    let aPairs = [];
    const aDivIds = ["Blur", "UnBlur"];

    for (let nCount = 0; nCount < aUnBlurImageLinks.length; nCount++) {

        let nCountTemp = nCount;
        aPairs.push("Pair_" + ++nCountTemp);
    }
    const oGalleryContainer = document.getElementById("galleryContainer");

    for (let nCount_0 = 0; nCount_0 < aPairs.length; nCount_0++) {

        //  creating parent div elements
        const oParentDivElement = document.createElement("div");
        oParentDivElement.setAttribute("id", aPairs[nCount_0]);
        oGalleryContainer.appendChild(oParentDivElement);

        const oParentDiv = {};
        oParentDiv.parentDivID = aPairs[nCount_0];
        oParentDiv.parentDivElement = oParentDivElement;

        //  creating div elements for blur & unblur image elements
        for (let nCount_1 = 0; nCount_1 < aDivIds.length; nCount_1++) {

            //  creating image elements
            const oImageElement = document.createElement("img");
            oImageElement.setAttribute("id", aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img");
            oImageElement.setAttribute("alt", aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img");

            //  bootstrap less than -lg
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
            oImageTag.imageTagID = aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img";

            if (aDivIds[nCount_1] == "Blur") {

                oImageElement.setAttribute("src", aBlurImageLinks[nCount_0]);
                oImageElement.setAttribute("onload", "loadUnBlurImages(" + oImageTag.imageTagID + ")");
                oImageTag.imageTagElement = oImageElement;
            }

            else if (aDivIds[nCount_1] == "UnBlur") {

                oImageElement.style.display = "none";
                oImageElement.setAttribute("data-src", aUnBlurImageLinks[nCount_0]);
                oImageElement.setAttribute("onload", "changeStyling(" + oImageTag.imageTagID + ")");
                oImageTag.imageTagElement = oImageElement;
            }
            oParentDiv["o" + aDivIds[nCount_1] + "ImgElement"] = oImageTag;
            oParentDivElement.appendChild(oImageElement);
        }
        aObjects.push(oParentDiv);
    }
})();

function loadUnBlurImages(oImageElement) {
    aLoadedBlurImages.push(oImageElement.id);

    if (aLoadedBlurImages.length === aObjects.length)

        for (let nCount = 0; nCount < aLoadedBlurImages.length; nCount++)

            if (aObjects[nCount].oUnBlurImgElement.imageTagElement.hasAttribute("src") == false) {

                aObjects[nCount].oUnBlurImgElement.imageTagElement.setAttribute("src", aObjects[nCount].oUnBlurImgElement.imageTagElement.getAttribute("data-src"));
            }
}

function changeStyling(oImageElement) {
    for (let nCount = 0; nCount < aObjects.length; nCount++)

        if (!aLoadedUnBlurImages.includes(oImageElement.id) && aObjects[nCount].oUnBlurImgElement.imageTagElement.id === oImageElement.id) {

            aObjects[nCount].oBlurImgElement.imageTagElement.style.display = "none";
            aObjects[nCount].oUnBlurImgElement.imageTagElement.style.display = "inline";
            aLoadedUnBlurImages.push(oImageElement.id);
            break;
        }
}
