"use strict";

let aObjects = [];
let aLoadedBlurImages = [];
let aLoadedUnBlurImages = [];

(function () {
    const aBlurImageLinks = [
        "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg",
        "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg",
        "https://images.pexels.com/photos/3680912/pexels-photo-3680912.jpeg",
    ];
    const aUnBlurImageLinks = [
        "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg",
        "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg",
        "https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg",
    ];
    let aPairs = [];

    for (let nCount = 0; nCount < aUnBlurImageLinks.length; nCount++) {
        let nCountTemp = nCount;
        aPairs.push("Pair_" + ++nCountTemp);
    }

    const aDivIds = ["Blur", "UnBlur"];
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
            oImageElement.setAttribute("width", "412px");
            oImageElement.setAttribute("height", "300px");

            const oImageTag = {};
            oImageTag.imageTagID = aPairs[nCount_0] + "_" + aDivIds[nCount_1] + "_Img";

            if (aDivIds[nCount_1] == "Blur") {
                oImageElement.setAttribute("src", aBlurImageLinks[nCount_0]);
                oImageElement.setAttribute("onload", "loadUnBlurImages()");
                oImageTag.imageTagElement = oImageElement;
                oChildDiv.blurImageElement = oImageTag;
                oParentDiv.oBlurDivElement = oChildDiv;
            }
            else if (aDivIds[nCount_1] == "UnBlur") {
                oChildDivElement.style.display = "none";
                oImageElement.setAttribute("data-src", aUnBlurImageLinks[nCount_0]);
                oImageTag.imageTagElement = oImageElement;
                oChildDiv.unBlurImageElement = oImageTag;
                oParentDiv.oUnBlurDivElement = oChildDiv;
            }

            oChildDivElement.appendChild(oImageElement);
        }
        aObjects.push(oParentDiv);
    }
})()

function loadUnBlurImages() {
    for (let nCount = 0; nCount < aObjects.length; nCount++) {
        if (aLoadedBlurImages.includes(aObjects[nCount]))
            continue;

        if (aObjects[nCount].oBlurDivElement.blurImageElement.imageTagElement.complete)
            aLoadedBlurImages.push(aObjects[nCount])
    }
}

let aIntervalLoadedImages = [];
let myInterval = setInterval(() => {
    if (aIntervalLoadedImages.length == aObjects.length)
        clearInterval(myInterval);

    for (let nCount = 0; nCount < aLoadedBlurImages.length; nCount++) {
        if (aIntervalLoadedImages.includes(aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagID))
            continue;

        if (aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagElement.hasAttribute("src") == false) {
            aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagElement.setAttribute("src", aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagElement.getAttribute("data-src"));
            break;
        }

        if (aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagElement.complete == false)
            break;
        else {
            aLoadedBlurImages[nCount].oBlurDivElement.childDivElement.style.display = "none";
            aLoadedBlurImages[nCount].oUnBlurDivElement.childDivElement.style.display = "inline";
            aIntervalLoadedImages.push(aLoadedBlurImages[nCount].oUnBlurDivElement.unBlurImageElement.imageTagID);
        }
    }
}, 10);