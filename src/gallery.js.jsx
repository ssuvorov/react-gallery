import React from 'react';
import Thumbs from './thumbs';
import Togglers from './togglers';

const { Component, PropTypes } = React;

const mod = (a, n) => ((a % n) + n) % n;

//const ImageHolder = ({ href, children, ...props }) => {
//  return href
//    ? <a className="gallery__link" href={href} {...props}>{ children }</a>
//    : <span className="gallery__holder" {...props}>{ children }</span>;
//};

const MIN_PICTURES_COUNT = 1;

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
  }

  getActivePicture() {
    const { pictures } = this.props;

    return pictures[this.state.activeIndex];
  }

  getCaption() {
    const { thumbs } = this.props;

    return thumbs ? thumbs[this.state.activeIndex].caption : '';
  }

  updateIndex(index) {
    this.setState({ activeIndex: index });
  }

  changeActiveImage(diff) {
    const { pictures } = this.props;
    const { activeIndex } = this.state;
    const newActiveIndex = mod(activeIndex + diff, pictures.length);

    this.updateIndex(newActiveIndex);
  }

  showPrevImage(e) {
    e.preventDefault();

    this.changeActiveImage(-1);
  }

  showNextImage(e) {
    e.preventDefault();

    this.changeActiveImage(+1);
  }

  renderThumbs() {
    const { thumbs } = this.props;
    const { activeIndex } = this.state;

    if (thumbs) {
      return (
        <Thumbs
          activeImageIndex={activeIndex}
          onNextClick={this.showNextImage}
          onPrevClick={this.showPrevImage}
          thumbs={thumbs}
          updateIndex={this.updateIndex}
        />
      );
    }
  }

  render() {
    const {
      hideTogglers,
      pictures,
      title,
      thumbs,
      trackInfo,
      url
      } = this.props;

    const { activeIndex } = this.state;

    const showTogglers = !hideTogglers && pictures.length > MIN_PICTURES_COUNT;
    const caption = this.getCaption();
    const counter = `${activeIndex + 1}/${pictures.length}`;

    return (
      <div className="gallery">
        <div className="gallery__image">
          { showTogglers
            ? <Togglers
                modifier="gallery"
                onNextClick={this.showNextImage}
                onPrevClick={this.showPrevImage}
              />
            : null
          }
          <div className="gallery__holder" href={url}>
            <img className="gallery__image-src"
              src={this.getActivePicture()}
              alt={title}
            />
            {
              thumbs
                ? <div className="gallery__caption" title={caption}>{ caption }</div>
                : null
            }
          </div>
        </div>
        { this.renderThumbs() }
      </div>
    );
  }
}

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,

  title: PropTypes.string,
  thumbs: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string
};

export default Gallery;