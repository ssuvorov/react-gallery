import React from 'react';
import Togglers from './togglers';

const { Component, PropTypes } = React;

const TOGGLER_WIDTH = 45;

class Thumbs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.getInitialPosition()
    };

    this.onItemClickHandler = this.onItemClickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setPosition(nextProps);
  }

  getInitialPosition() {
    return -TOGGLER_WIDTH;
  }

  getItemIndex(item) {
    const { thumbs } = this.props;

    return thumbs.indexOf(item);
  }

  onItemClickHandler(e, item) {
    const { updateIndex } = this.props;
    const index = this.getItemIndex(item);

    e.preventDefault();
    updateIndex(index);
  }

  getItemByIndex(index = 0) {
    return this._list.children[index];
  }

  getItemOffsetByIndex(index) {
    const item = this.getItemByIndex(index);

    return item.offsetLeft;
  }

  getHoldersCenter() {
    const holderWidth = this._holder.clientWidth;
    const item = this.getItemByIndex();

    return holderWidth / 2 - item.clientWidth / 2;
  }

  getLatestPosition() {
    const listWidth = this._list.clientWidth;
    const holderWidth = this._holder.clientWidth;

    return listWidth - holderWidth + TOGGLER_WIDTH;
  }

  isListScrollable() {
    const listWidth = this._list.clientWidth;
    const holderWidth = this._holder.clientWidth;

    return listWidth - (holderWidth - 2 * TOGGLER_WIDTH) > 0;
  }

  setPosition({ activeImageIndex }) {
    const holderCenter = this.getHoldersCenter();
    const offsetNextItem = this.getItemOffsetByIndex(activeImageIndex);

    let newPos = offsetNextItem - holderCenter;

    if (!this.isListScrollable()) {
      newPos = this.getInitialPosition();
    } else if (offsetNextItem < holderCenter) {
      newPos = Math.max(newPos, this.getInitialPosition());
    } else {
      newPos = Math.min(newPos, this.getLatestPosition());
    }

    this.setState({ position: newPos });
  }

  renderPreviews() {
    const { activeImageIndex, thumbs } = this.props;

    return (
      thumbs.map(item => (
        <li className={`thumbs__item ${activeImageIndex === this.getItemIndex(item) ? "is-active" : ""}`}
          key={item.id}
        >
          <a className="thumbs__link"
            href={item.href}
            data-index={item.id}
            onClick={(e) => this.onItemClickHandler(e, item)}
            rel="nofollow"
          >
            <img className="thumbs__image-src" src={item.src} alt={item.caption} />
          </a>
        </li>
      ))
    )
  }

  render() {
    const { onNextClick, onPrevClick } = this.props;
    const { position } = this.state;

    return (
      <div className="thumbs" ref={h => this._holder = h}>
        <Togglers
          modifier="thumbs"
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
        <ul
          className="thumbs__list"
          ref={l => this._list = l}
          style={{left: -position}}
        >
          { this.renderPreviews() }
        </ul>
      </div>
    )
  }
}

Thumbs.propTypes = {
  updateIndex: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,

  activeImageIndex: PropTypes.number,
  thumbs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Thumbs;
