class FloatingNav01 {
  constructor({ isStarting = true } = {}) {
    this.floatingNav = document.querySelector('.js-floatingNav');
    this.floatingNavAnchors = this.floatingNav.getElementsByTagName('a');
    this.floatingNavHeight = this.floatingNav.offsetHeight;
    // hightlightのタイミングを微調整する値
    this.tuningNum = 10;
    // floatingNav表示開始位置を決める ※.js-floatingNav-appearFlagは必須
    this.appearFlag = document.querySelector('.js-floatingNav-appearFlag');
    // floatingNavの表示開始位置
    this.appearPoint = this.appearFlag.offsetTop - this.floatingNavHeight - this.tuningNum;
    // highlight位置を決める
    this.highlightFlags = document.querySelectorAll('.js-floatingNav-highlightFlag');
    // highlightの終了位置を決める（表示終了位置ではない）
    this.endHighlightFlag = document.querySelector('.js-floatingNav-endHighlightFlag');
    this.isExistedAppearFlag = !!this.appearFlag;
    this.isExistedHighlightFlags = !!this.highlightFlags;
    this.isExistedEndHighlightFlag = !!this.endHighlightFlag;
    // flagのoffsetTopの数値を入れる
    this.highlightFlagOffsetsList = [];
    this.nowHighlightedAnchorIndex = 999;
    // lint error "Do not use 'new' for side effects" 対策
    if (isStarting) {
      this.init();
    }
  }

  /**
   * flagのoffsetTopで配列を作成
   * highlightFlags endHighlightFlag の順番に入れる
   */
  createAnchorOffsetTopList() {
    // .js-floatingNav-appearFlagと.js-floatingNav-highlightFlagどちらも必要
    if (!this.isExistedAppearFlag || !this.isExistedHighlightFlags) return;

    // highlightFlagsを先に入れる
    Array.prototype.forEach.call(this.highlightFlags, (flag, i) => {
      this.highlightFlagOffsetsList[i] = flag.offsetTop - this.floatingNavHeight - this.tuningNum;
    });

    if (this.isExistedEndHighlightFlag) {
      // endHightlightFlagがあれば配列の最後にendHighlightFlagのoffsetTopを追加
      this.highlightFlagOffsetsList.push(this.endHighlightFlag.offsetTop - this.floatingNavHeight);
    } else {
      // endHightlightFlagがなければbody要素の高さを追加(画面の高さを追加)
      this.highlightFlagOffsetsList.push(document.body.offsetHeight);
    }
  }

  /**
   * scrollTopによってfloatingNavを表示非表示にする
   * @param {Number} scrollTop 画面トップからの位置
   */
  toggleFloatingNav(scrollTop) {
    if (!this.isExistedAppearFlag) return;

    if (scrollTop > this.appearPoint) {
      this.floatingNav.classList.add('js-show');
    } else {
      this.floatingNav.classList.remove('js-show');
    }
  }

  /**
   * scrollTopによってfloatingNavのstyleを変更させるクラスを付与する
   * @param {Number} scrollTop 画面トップからの位置
   * @param {Number} shouldHighlightedAnchorIndex getHighlightedAnchorIndex関数の戻り値を入れる変数
   */
  highlightCurrentAnchor(scrollTop) {
    // .js-floatingNav-appearFlagと.js-floatingNav-highlightFlagどちらも必要
    if (!this.isExistedAppearFlag || !this.isExistedHighlightFlags) return;

    const shouldHighlightedIndex = this.getShouldHighlightedAnchorIndex(scrollTop);

    if (shouldHighlightedIndex !== 999) {
      this.floatingNavAnchors[shouldHighlightedIndex].classList.add('js-active');
      // 早期リターン
      if (this.nowHighlightedAnchorIndex === shouldHighlightedIndex) return;
      this.floatingNavAnchors[this.nowHighlightedAnchorIndex].classList.remove('js-active');
      this.nowHighlightedAnchorIndex = shouldHighlightedIndex;
    }

    if (this.nowHighlightedAnchorIndex !== 999 && shouldHighlightedIndex === 999) {
      this.floatingNavAnchors[this.nowHighlightedAnchorIndex].classList.remove('js-active');
    }
  }

  /**
   * highlightされていないといけないanchorのindex番号を返す
   * @param {Number} index
   * @return {Number} anchorが4つの場合は0 ~ 3の数値、shouldHighlightedAnchorIndexがundefinedのままなら999
   */
  getShouldHighlightedAnchorIndex(scrollTop) {
    let index;
    for (let i = 0; i < this.highlightFlagOffsetsList.length - 1; i += 1) {
      if (this.highlightFlagOffsetsList[i] < scrollTop && scrollTop <= this.highlightFlagOffsetsList[i + 1]) {
        index = i;
      }
    }

    if (index === undefined) index = 999;

    // this.nowHighlightedAnchorIndexの初期値を更新 これがないとhighlightCurrentAnchor関数内でのクラスの付け外しの部分でエラーがでてしまう
    if (this.nowHighlightedAnchorIndex === 999 &&
      index !== 999) this.nowHighlightedAnchorIndex = index;

    return index;
  }

  /**
   * 初期化
   * @param {Number} scrollTop 画面トップからの位置
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