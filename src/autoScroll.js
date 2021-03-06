var fps = 100;
var speedFactor = 0.001;
var minDelta = 1;
var autoScrollSpeed = 10;
var autoScrollTimer, restartTimer;
var isScrolling = false;
var prevPos = 0,
    currentPos = 0;
var currentTime, prevTime, timeDiff;

window.addEventListener("scroll", function (e) {
    // window.pageYOffset is the fallback value for IE
    currentPos = window.scrollY || window.pageYOffset;

    //if bottom of page is reached
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
       //location.reload();
       window.scrollTo(0, 0); //scroll to top
    }
});

window.addEventListener("wheel", handleManualScroll);
window.addEventListener("touchmove", handleManualScroll);

function handleManualScroll() {
    // window.pageYOffset is the fallback value for IE
    currentPos = window.scrollY || window.pageYOffset;
    clearInterval(autoScrollTimer);
    if (restartTimer) {
        clearTimeout(restartTimer);
    }
    restartTimer = setTimeout(() => {
        prevTime = null;
        setAutoScroll();
    }, 20);
}

function setAutoScroll(newValue) {
    if (newValue) {
        autoScrollSpeed = speedFactor * newValue;
    }
    if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
    }
    autoScrollTimer = setInterval(function () {
        currentTime = Date.now();
        if (prevTime) {
            if (!isScrolling) {
                timeDiff = currentTime - prevTime;
                currentPos += autoScrollSpeed * timeDiff;
                if (Math.abs(currentPos - prevPos) >= minDelta) {
                    isScrolling = true;
                    window.scrollTo(0, currentPos);
                    isScrolling = false;
                    prevPos = currentPos;
                    prevTime = currentTime;
                }   
            }
        } else {
            prevTime = currentTime;
        }
    }, 1000 / fps);
}

setAutoScroll(20);