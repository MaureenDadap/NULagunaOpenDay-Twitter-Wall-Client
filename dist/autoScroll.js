var autoScrollTimer,restartTimer,currentTime,prevTime,timeDiff,fps=100,speedFactor=.001,minDelta=1,autoScrollSpeed=10,isScrolling=!1,prevPos=0,currentPos=0;function handleManualScroll(){currentPos=window.scrollY||window.pageYOffset,clearInterval(autoScrollTimer),restartTimer&&clearTimeout(restartTimer),restartTimer=setTimeout((()=>{prevTime=null,setAutoScroll()}),50)}function setAutoScroll(e){e&&(autoScrollSpeed=speedFactor*e),autoScrollTimer&&clearInterval(autoScrollTimer),autoScrollTimer=setInterval((function(){currentTime=Date.now(),prevTime?isScrolling||(currentPos+=autoScrollSpeed*(timeDiff=currentTime-prevTime),Math.abs(currentPos-prevPos)>=minDelta&&(isScrolling=!0,window.scrollTo(0,currentPos),isScrolling=!1,prevPos=currentPos,prevTime=currentTime)):prevTime=currentTime}),1e3/fps)}window.addEventListener("scroll",(function(e){currentPos=window.scrollY||window.pageYOffset})),window.addEventListener("wheel",handleManualScroll),window.addEventListener("touchmove",handleManualScroll),setAutoScroll(20);