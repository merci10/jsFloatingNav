class FloatingNav01 {
  constructor({ isStarting = true } = {}) {
    this.floatingNav = document.querySelector('.js-floatingNav');
    this.floatingNavAnchors = this.floatingNav.getElementsByTagName('a');
    // floatingNav表示開始位置を決める ※.js-floatingNav-startFlagは必須
    this.startFlag = document.querySelector('.js-floatingNav-startFlag');
    // highlight位置を決める
    this.flags = document.querySelectorAll('.js-floatingNav-flag');
    // highlightの終了位置を決める（表示終了位置ではない）
    this.endFlag = document.querySelector('.js-floatingNav-endFlag');
    this.isExistStartFlag = !!this.startFlag;
    this.isExistFlags = !!this.flags;
    this.isExistEndFlag = !!this.endFlag;
    // flagのoffsetTopの数値を入れる（highlightさせる位置)
    this.flagOffsetsList = [];
    // hightlightのタイミングを微調整する値
    this.tuningNum = 5;
    this.nowHighlitedAnchorIndex = 999;
    // lint error "Do not use 'new' for side effects" 対策
    if (isStarting) {
      this.init();
    }
  }

  /**
   * flagのoffsetTopで配列を作成
   * @param {Number} floatingNavHeight
   */
  createAnchorOffsetTopList() {
    if (!this.isExistStartFlag) return; // .js-floatingNav-startFlagがなければ処理を終了

    const floatingNavHeight = this.floatingNav.offsetHeight;

    this.flagOffsetsList[0] = this.startFlag.offsetTop - floatingNavHeight - this.tuningNum;
    Array.prototype.forEach.call(this.flags, (flag, i) => {
      this.flagOffsetsList[i + 1] = flag.offsetTop - floatingNavHeight - this.tuningNum;
    });

    if (this.isExistEndFlag) {
      // endFlagがあれば配列の最後にendFlagのoffsetTopを追加
      this.flagOffsetsList.push(this.endFlag.offsetTop - floatingNavHeight);
    } else {
      // endFlagがなければbody要素の高さを追加(画面最下部のoffsetTopを追加)
      this.flagOffsetsList.push(document.body.offsetHeight);
    }
  }

  /**
   * scrollTopによってfloatingNavを表示非表示にする
   * @param {Number} scrollTop window.scrollTop
   * @param {Number} showPoint floatingNavの表示開始位置
   */
  toggleFloatingNav(scrollTop) {
    const showPoint = this.flagOffsetsList[0];
    if (scrollTop > showPoint) {
      this.floatingNav.classList.add('js-show');
    } else {
      this.floatingNav.classList.remove('js-show');
    }
  }

  /**
   * scrollTopによってfloatingNavのstyleを変更させるクラスを付与する
   * @param {Number} scrollTop window.scrollTop
   */
  highlightCurrentAnchor(scrollTop) {
    // .js-floatingNav-startFlagと.js-floatingNav-flagどちらも必要
    if (!this.isExistStartFlag || !this.isExistFlags) return;

    const nextHighlightedAnchorIndex = this.getNextHighlightedAnchorIndex(scrollTop);

    if (nextHighlightedAnchorIndex !== 999) {
      this.floatingNavAnchors[nextHighlightedAnchorIndex].classList.add('js-active');
      if (this.nowHighlitedAnchorIndex === nextHighlightedAnchorIndex) return;
      this.floatingNavAnchors[this.nowHighlitedAnchorIndex].classList.remove('js-active');
      this.nowHighlitedAnchorIndex = nextHighlightedAnchorIndex;
    }

    if (nextHighlightedAnchorIndex === 999 && this.nowHighlitedAnchorIndex !== 999) {
      this.floatingNavAnchors[this.nowHighlitedAnchorIndex].classList.remove('js-active');
    }

    // Array.prototype.forEach.call(this.floatingNavAnchors, (anchor) => {
    //   anchor.classList.remove('js-active');
    // });

    // Array.prototype.forEach.call(this.floatingNavAnchors, (anchor, i) => {
    //   if ((this.flagOffsetsList[i + 1]) < scrollTop && scrollTop <= (this.flagOffsetsList[i + 2])) {
    //     anchor.classList.add('js-active');
    //   }
    // });
  }

  /**
   * 次にhighlightされるべきanchorをindex番号で返す
   * @return {Number} anchorが4つの場合は0 ~ 3の数値、nextHighlightedAnchorIndexがundefinedのままなら999
   */
  getNextHighlightedAnchorIndex(scrollTop) {
    let nextHighlightedAnchorIndex;
    for (let i = 0; i < this.flagOffsetsList.length - 2; i += 1) {
      if ((this.flagOffsetsList[i + 1]) < scrollTop && scrollTop <= (this.flagOffsetsList[i + 2])) {
        nextHighlightedAnchorIndex = i;
      }
    }
    if (nextHighlightedAnchorIndex === undefined) nextHighlightedAnchorIndex = 999;

    if (this.nowHighlitedAnchorIndex === 999 && nextHighlightedAnchorIndex != 999) {
      this.nowHighlitedAnchorIndex = nextHighlightedAnchorIndex;
    }

    return nextHighlightedAnchorIndex;
  }

  /**
   * 初期化
   */
  init() {
    window.onload = () => {
      this.createAnchorOffsetTopList();
    };

    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.toggleFloatingNav(scrollTop);
      this.highlightCurrentAnchor(scrollTop);
    };
  }
}

const floatingNav01 = new FloatingNav01({ isStarting: false });
floatingNav01.init();