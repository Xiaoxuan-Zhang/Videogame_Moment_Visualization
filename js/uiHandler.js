function showPage() {
  $("#loading-scene").fadeOut(1000);
  document.getElementById("container").style.display = "block";
  //document.getElementById("float_div").style.display = "block";
  document.getElementById("top_bar").style.display = "block";
  document.getElementById("bottomright-bar").style.display = "block";
}

function addGameInfo(game) {
  $('#game-info').text(game);
}
function addCorporaButtons(){
  var idx = 0;
  for (corpus in spriteManager.spriteGroups){
    var id = corpus + "-btn";
    var wrapper = id + "-wrapper";
    $('#corpora_bar').prepend("<div id='" + wrapper + "'></div>");
    $('#' + wrapper).prepend("<button class='button-sm button-sm-clicked' id='" + id + "' onclick='onShowCorpus(this.id)'>" + corpus + "</button>");
    height = 5;
    gap = 5;
    pct = gap + (gap+height)*idx;
    $('#' + wrapper).css("position", "absolute");
    $('#' + wrapper).css("top", pct+"%");
    $('#' + wrapper).css("left", "15%");
    $('#' + wrapper).css("width", "70%");
    $('#' + wrapper).css("height", height+"%");
    $('#' + id).css("position", "absolute");
    $('#' + id).css("height", "100%");
    $('#' + id).css("width", "100%");
    idx ++;
  }
}
function onShowCorporaBar(id) {
  if (g_dialogVisible) { return; }
  console.log("corporaBtn is clicked!");
  var isClicked = $('#' + id).hasClass("button-clicked");
  if (isClicked) {
    //document.getElementById("float_div").style.display = "none";
    document.getElementById("corpora_bar").style.display = "none";
    $('#corpora-btn').switchClass('button-clicked', 'button','fast');
  } else {
    //document.getElementById("float_div").style.display = "block";
    document.getElementById("corpora_bar").style.display = "block";
    $('#corpora-btn').switchClass('button', 'button-clicked','fast');
  }
}
function onShowBookmarkBar(id){
  if (g_dialogVisible) { return; }
  console.log("Timeline is clicked!");
  var isBkmkBtnClicked = $('#' + id).hasClass("button-clicked");
  if (isBkmkBtnClicked) {
    $('#bookmark-btn').switchClass('button-clicked', 'button','fast');
    //bookmarkManager.hideBookmarkLabels();
    //Add time div
    //document.getElementById("timeline-wrapper").style.display = "none";
    document.getElementById("timeline-wrapper").style.visibility = "hidden";
  } else {
    $('#bookmark-btn').switchClass('button', 'button-clicked','fast');
    //bookmarkManager.showBookmarkLabels();
    //Hide time div
    //document.getElementById("timeline-wrapper").style.display = "block";
    document.getElementById("timeline-wrapper").style.visibility = "visible";
  }
}
function onShowCorpus(id){
  if (g_dialogVisible) { return; }

  var group = id.substr(0, id.lastIndexOf("-btn"));
  var isCorpusBtnClicked = $('#' + id).hasClass("button-sm-clicked");
  if ( isCorpusBtnClicked ) {
    $('#' + id).switchClass('button-sm-clicked', 'button-sm','fast');
    //Hide corpus
    spriteManager.toggleSpriteGroup(group, false);
    spriteManager.toggleGroupRaycasting(group,false);
  } else {
    $('#' + id).switchClass('button-sm', 'button-sm-clicked','fast');
    //Show corpus
    spriteManager.toggleSpriteGroup(group, true);
    spriteManager.toggleGroupRaycasting(group,true);
  }
}
function onShowAnimationBar(id) {
  console.log("Animation is clicked!");
  var isAnimationBtnClicked = $('#' + id).hasClass("button-clicked");
  if ( isAnimationBtnClicked ) {
    $('#' + id).switchClass('button-clicked', 'button','fast');
    videoManager.pause();
    document.getElementById("video-div").style.display = "none";
  } else {
    $('#' + id).switchClass('button', 'button-clicked','fast');
    resizeVideoDiv();
    document.getElementById("video-div").style.display = "block";
  }
}

function resizeVideoDiv() {
  var div = $(".half-page-dialog");
  div.css("position", "absolute");
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  var x = HEIGHT;
  if (x > WIDTH) {
    x = WIDTH;
  }
  var height = x * 0.6;
  var width = height;
  var top = (HEIGHT-height)/2.0;
  var left = (WIDTH - height)/2.0;
  div.css("top", top);
  div.css("left", left);
  div.css("height", height);
  div.css("width", width);
}

//Make the DIV element draggagle:
dragElement(document.getElementById(("video-div")));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function onPlay(id) {
  switch (id) {
    case "playpause-btn":
      startId = Number(document.getElementById('video_startId').value);
      stopId = Number(document.getElementById('video_stopId').value);
      element = document.getElementById('playpause');
      if ( element.innerText == "play_circle_outline") {
        element.innerText = "pause_circle_outline";
        //play animation
        videoManager.play();
        document.getElementById('moment-index-paused').innerHTML= "";
      } else {
        element.innerText = "play_circle_outline";
        //pause animation
        videoManager.pause();
        videoManager.getCurrentMoment();
        document.getElementById('moment-index-paused').innerHTML= "Global Id: " + videoManager.getCurrentMoment();
      }
      break;
    case "loop-reset-btn":
      videoManager.reset();
      if ( element.innerText == "pause_circle_outline") {
        element.innerText = "play_circle_outline";
        //pause animation
        videoManager.pause();
        videoManager.getCurrentMoment();
        document.getElementById('moment-index-paused').innerHTML= "Global Id: " + videoManager.getCurrentMoment();
      }
      break;
    case "replay-btn":
      //videoManager.videoElement.currentTime = videoManager.startTime;
      videoManager.replay();
      break;
    case "fastfwd-btn":
      //videoManager.videoElement.currentTime += 1.0 / 24.0;
      videoManager.forward();
      document.getElementById('moment-index-paused').innerHTML= "Global Id: " + videoManager.getCurrentMoment();
      break;
    case "fastrwd-btn":
      //videoManager.videoElement.currentTime -= 1.0 / 24.0;
      videoManager.rewind();
      document.getElementById('moment-index-paused').innerHTML= "Global Id: " + videoManager.getCurrentMoment();
      break;
    // default:
  }
}

function addTimelineDivs(){
  css_class = 'timeline';
  text_class = 'timeline-text';
  timeline_number = Object.keys(spriteManager.spriteGroups).length;
  div_height_pct = 100.0 /timeline_number;
  var idx = 0;
  var order = 1;
  for (corpus in spriteManager.spriteGroups){
    var pct = idx * div_height_pct;
    var id = "timeline-" + corpus;
    var text_id = id + "-textbox";
    $('#timeline-wrapper').prepend("<div id='" + text_id + "', class='" + text_class + "'>" + corpus + "</div>");
    $('#' + text_id).css("position", "relative");
    //$('#' + text_id).css("bottom", pct+"%");
    $('#' + text_id).css("height", div_height_pct+"%");
    $('#' + text_id).css("order", order);
    order ++;

    $('#timeline-wrapper').prepend("<div id='" + id + "', class='" + css_class + "'></div>");
    $('#' + id).css("position", "relative");
    //$('#' + id).css("bottom", pct+"%");
    $('#' + id).css("height", div_height_pct+"%");
    $('#' + id).css("order", order);
    order ++;

    idx++ ;
  }
}
function onShowHelp() {
  g_dialogVisible = true;
  helpDialog.showDialog();
}
function onNavigateToIndex() {
  window.location.href = './index.html';
}
function onUnmute() {
  var element = document.getElementById("mute-button");
  if ( element.innerText == "volume_off") {
    element.innerText = "volume_up";
    audioManager.muted = false;
  } else { //"volume_on"
    element.innerText = "volume_off";
    audioManager.muted = true;
  }
}
function onShare() {
  g_dialogVisible = true;
  shareDialog.showDialog();
}

function showFavoriteBtn() {
  $("#ml-menu-wrapper").css("visibility","visible");
  $("#ml-dropdown-btn").text("Global Id: " + g_currentTarget);
}
function hideFavoriteBtn() {
  $("#ml-menu-wrapper").css("visibility","hidden");
}
function onAddBookmark() {
  var objNameVal = Number(g_lastSelected.object.name);
  var objComment = null;
  if (bookmarkManager.comments.hasOwnProperty(objNameVal)) {
      objComment = bookmarkManager.comments[objNameVal];
  }

  bookmarkDialog.showDialog(function(objName, comment) {
    bookmarkManager.addBookmark(objName, comment);
    urlManager.updateURL(URLKeys.BOOKMARK, bookmarkManager.getBookmarks());
  },
  objNameVal,
  objComment);
}
function onRemoveBookmark() {
  var objNameVal = Number(g_lastSelected.object.name);
  bookmarkManager.removeBookmark(objNameVal);
}
function onNextBtnClicked(){
  // should check if selected item is part of some object
  if (g_lastSelected.object == null || (g_currentTarget >= Object.keys(spriteManager.spriteDictionary).length - 1)){
    return;
  }
  g_autoRotate = false;
  ////////////////////////////////////////////////////////////Chris's Code
  audioManager.playSound(audioManager.soundOnNext); //sound for next page
	//////////////////////////////////////////////////////////////////////
  g_currentTarget += 1;
  labelManager.showNearbyLabels(g_currentTarget, 5, false);
  urlManager.updateURL(URLKeys.MOMENT, g_currentTarget);
  g_lastSelected.object = spriteManager.spriteDictionary[g_currentTarget].object;
  $("#ml-dropdown-btn").text("Global Id: " + g_currentTarget);
}
function onPreviousBtnClicked() {
  if (g_lastSelected.object== null || (g_currentTarget == 0)){
    return;
  }
  g_autoRotate = false;
  ////////////////////////////////////////////////////////////Chris's Code
  audioManager.playSound(audioManager.soundOnNext); //sound for next page
  ////////////////////////////////////////////////////////////Chris's Code
  g_currentTarget -= 1;
  labelManager.showNearbyLabels(g_currentTarget, 5, false);
  urlManager.updateURL(URLKeys.MOMENT, g_currentTarget);
  g_lastSelected.object = spriteManager.spriteDictionary[g_currentTarget].object;
  $("#ml-dropdown-btn").text("Global Id: " + g_currentTarget);
}
function onShowLabelDropdown() {
  if ($("#ml-dropdown-list").css("display") == "none") {
    $("#ml-dropdown-list").css("display","block");
  } else {
    $("#ml-dropdown-list").css("display","none");
  }
}
