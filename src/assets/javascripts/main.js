const floatingNav = document.querySelector('.js-floatingNav');
const floatingNavAnchors = floatingNav.getElementsByTagName('a');
const anchorStartFlag = document.querySelector('.js-floatingNav-startFlag');
const anchorFlags = document.querySelectorAll('.js-floatingNav-flag');
const anchorEndFlag = document.querySelector('.js-floatingNav-endFlag');
const anchorOffsets = [];

// スクロール位置を測定する要素を設定
let documentElement  = null;
if (navigator.userAgent.toLowerCase().match(/webkit|msie 5/)) {
  // Webkit系（Safari, Chrome, iOS）判定
  if(navigator.userAgent.indexOf('Chrome') != -1){
    // Chromeはhtml要素
    documentElement = document.documentElement;
  } else {
    // Chrome以外はbody要素
    documentElement = document.body;
  }
} else {
  // IE（6以上）、Firefox、Operaはhtml要素
  documentElement = document.documentElement;
}

const createAnchorList = () => {
  if (!(anchorFlags.length > 0)) return;

  const floatingNavHeight = floatingNav.offsetHeight;

  if (anchorStartFlag) anchorOffsets[0] = anchorStartFlag.offsetHeight;

  Array.prototype.forEach.call(anchorFlags, (elem, i) => {
    if (anchorStartFlag) i = i + 1;

    anchorOffsets[i] = elem.offsetTop - floatingNavHeight;
  });

  if (anchorEndFlag) anchorOffsets.push(anchorEndFlag.offsetTop - floatingNavHeight);
  else anchorOffsets.push(documentElement.offsetHeight);
}

const toggleFloatingNav = (scrollTop) => {
  const showPoint = anchorStartFlag ? anchorStartFlag.offsetTop : anchorOffsets[0];
  if (scrollTop > showPoint) {
    floatingNav.classList.add('js-show');
  } else {
    floatingNav.classList.remove('js-show');
  }
}

const highlightCurrentAnchor = (scrollTop) => {
  if (!anchorFlags.length) return;

  Array.prototype.forEach.call(floatingNavAnchors, (elem, i) => {
    elem.classList.remove('js-active');
  });

  Array.prototype.forEach.call(floatingNavAnchors, (elem, i) => {
    if (anchorStartFlag) i = i + 1;

    if (anchorOffsets[i] < scrollTop && scrollTop < anchorOffsets[i + 1]) {
      elem.classList.add('js-active');
    }
  });
}

window.onload = () => {
  createAnchorList();
}

window.onscroll = () => {
  let scrollTop = documentElement.scrollTop;
  toggleFloatingNav(scrollTop);
  highlightCurrentAnchor(scrollTop);
}


// todo 最後のnavFlog要素の終わりのポイントを取得したい。