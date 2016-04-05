import React from 'react';
import ReactSwipe from 'react-swipe';
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
    this.swipedHandler = this.swipedHandler.bind(this);
  }

  getPrevPicture() {
    const { pictures } = this.props;
    const index = mod(this.state.activeIndex - 1, pictures.length);

    return pictures[index];
  }

  getActivePicture() {
    const { pictures } = this.props;

    return pictures[this.state.activeIndex];
  }

  getNextPicture() {
    const { pictures } = this.props;
    const index = mod(this.state.activeIndex + 1, pictures.length);

    return pictures[index];
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

  swiped(diff) {
    const { activeIndex } = this.state;
    const { pictures } = this.props;

    const index = mod(this.state.activeIndex + diff, pictures.length);

    this.setState({
      activeIndex: index
    })
  }

  swipedHandler(move) {
    const diff = move ? +1 : -1;
    this.swiped(diff);
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
    const styles = {
      container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        visibility: 'visible'
      },
      wrapper: {
        overflow: 'hidden',
        position: 'relative',
        height: '100%'
      },
      child: {
        float: 'left',
        width: '500px',
        position: 'relative'
      }
    };

    return (
      <div className="gallery">
        <div className="gallery__image" ref={(h) => {this._holder = h;}}>
          { showTogglers
            ? <Togglers
                modifier="gallery"
                onNextClick={this.showNextImage}
                onPrevClick={this.showPrevImage}
              />
            : null
          }
          <ReactSwipe
            className="gallery__holder"
            swipeOptions={{
              continuous: true,
              callback: this.swipedHandler,
              startSlide: 1
            }}
            key={this.state.activeIndex}
            style={styles}
          >
            <div className="gallery__image-src-wrap">
              <img className="gallery__image-src"
                src={this.getPrevPicture()}
                alt={title}
              />
            </div>
            <div className="gallery__image-src-wrap">
              <img className="gallery__image-src"
                src={this.getActivePicture()}
                alt={title}
              />
            </div>
            <div className="gallery__image-src-wrap">
              <img className="gallery__image-src"
                src={this.getNextPicture()}
                alt={title}
              />
            </div>
          </ReactSwipe>
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