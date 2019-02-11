const floatingNav = document.querySelector('.modFloatingNav');
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

const toggleFloatingNav = (scrollTop) => {
  const showPoint = anchorStartFlag ? anchorStartFlag : anchorOffsets[0];
  if (scrollTop > showPoint) {
    floatingNav.classList.add('js-show');
  } else {
    floatingNav.classList.remove('js-show');
  }
}

const createAnchorList = () => {
  if (!(anchorFlags.length > 0)) return;

  Array.prototype.forEach.call(anchorFlags, (elem, i) => {
    anchorOffsets[i] = elem.offsetTop;
  });

  if (anchorEndFlag) anchorOffsets.push(anchorEndFlag.offsetTop);
  else anchorOffsets.push(600);
}

const highlightCurrentAnchor = (scrollTop) => {
  if (!anchorFlags.length) return;

  Array.prototype.forEach.call(floatingNavAnchors, (elem, i) => {
    elem.classList.remove('js-active');
  });

  Array.prototype.forEach.call(floatingNavAnchors, (elem, i) => {
    if (anchorOffsets[i] < scrollTop && scrollTop < anchorOffsets[i + 1]) {
      elem.classList.add('js-active');
    }
  });
}

window.onload = () => {
  createAnchorList();
}

window.onscroll = (event) => {
  let scrollTop = documentElement.scrollTop;
  toggleFloatingNav(scrollTop);
  highlightCurrentAnchor(scrollTop);
}


// todo 最後のnavFlog要素の終わりのポイントを取得したい。