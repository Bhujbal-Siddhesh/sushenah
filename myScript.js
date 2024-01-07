"use strict";

let aObjects = [];
let aLoadedBlurImages = [];
let aLoadedUnBlurImages = [];

(function () {
    const aBlurImageLinks = [
        "testImages/1.webp",
        "testImages/2.webp",
        "testImages/3.webp",
    ];
    const aUnBlurImageLinks = [
        "testImages/01.webp",
        "testImages/02.webp",
        "testImages/03.webp",
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
            const oChildDivElement = document.createElement("div");
            oChildDivElement.setAttribute("id", aPairs[nCount_0] + "_" + aDivIds[nCount_1]);
            oParentDivElement.appendChild(oChildDivElement);

            const oChildDiv = {};
            oChildDiv.childDivID = aPairs[nCount_0] + "_" + aDivIds[nCount_1];
            oChildDiv.childDivElement = oChildDivElement;

            //  creating image elements
            const oImageElement = document.createElement("img");
            oImageElement.setAttribute("id", aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img");
            oImageElement.setAttribute("alt", "");
            oImageElement.setAttribute("width", "50%");
            oImageElement.setAttribute("height", "50%");

            const oImageTag = {};
            oImageTag.imageTagID = aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img";

            if (aDivIds[nCount_1] == "Blur") {
                oImageElement.setAttribute("src", aBlurImageLinks[nCount_0]);
                oImageElement.setAttribute("onload", "loadUnBlurImages(" + oImageTag.imageTagID + ")");
                oImageTag.imageTagElement = oImageElement;
            }
            else if (aDivIds[nCount_1] == "UnBlur") {
                oChildDivElement.style.display = "none";
                oImageElement.setAttribute("data-src", aUnBlurImageLinks[nCount_0]);
                oImageTag.imageTagElement = oImageElement;
            }

            oChildDiv.oImageElement = oImageTag;
            oParentDiv["o" + aDivIds[nCount_1] + "DivElement"] = oChildDiv;//oBlurDivElement, oUnBlurDivElement
            oChildDivElement.appendChild(oImageElement);
        }
        aObjects.push(oParentDiv);
    }
})()

function loadUnBlurImages(oImageElement) {
    aLoadedBlurImages.push(oImageElement.id);
}

let aIntervalLoadedImages = [];
let myInterval = setInterval(() => {
    if (aIntervalLoadedImages.length == aObjects.length)
        clearInterval(myInterval);

    for (let nCount = 0; nCount < aLoadedBlurImages.length; nCount++) {
        if (aIntervalLoadedImages.includes(aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagID))
            continue;

        if (aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagElement.hasAttribute("src") == false) {
            aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagElement.setAttribute("src", aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagElement.getAttribute("data-src"));
            break;
        }

        if (aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagElement.complete == false)
            break;
        else {
            aObjects[nCount].oBlurDivElement.childDivElement.style.display = "none";
            aObjects[nCount].oUnBlurDivElement.childDivElement.style.display = "inline";
            aIntervalLoadedImages.push(aObjects[nCount].oUnBlurDivElement.oImageElement.imageTagID);
        }
    }
}, 1000);
