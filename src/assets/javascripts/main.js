const floatingNav = document.querySelector('.js-floatingNav');
const floatingNavAnchors = floatingNav.getElementsByTagName('a');
const anchorStartFlag = document.querySelector('.js-floatingNav-startFlag');
const anchorFlags = document.querySelectorAll('.js-floatingNav-flag');
const anchorEndFlag = document.querySelector('.js-floatingNav-endFlag');
const anchorOffsets = [];

const createAnchorList = () => {
  if (!(anchorFlags.length > 0)) return;

  const floatingNavHeight = floatingNav.offsetHeight;

  if (anchorStartFlag) anchorOffsets[0] = anchorStartFlag.offsetHeight;

  Array.prototype.forEach.call(anchorFlags, (elem, i) => {
    if (anchorStartFlag) i = i + 1;

    anchorOffsets[i] = elem.offsetTop - floatingNavHeight;
  });

  if (anchorEndFlag) anchorOffsets.push(anchorEndFlag.offsetTop - floatingNavHeight);
  else anchorOffsets.push(document.body.offsetHeight);
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
  let scrollTop = document.documentElement.scrollTop || document.body.srcollTop;
  toggleFloatingNav(scrollTop);
  highlightCurrentAnchor(scrollTop);
}