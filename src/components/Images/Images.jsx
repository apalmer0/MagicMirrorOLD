import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

class Images extends Component {
  render () {
    const { images } = this.props;
    const imagesCollection = images.map((image) => {
      return {
        original: image.url,
        description: image.caption,
      };
    });

    return (
      <div>
        <ImageGallery
          autoPlay
          items={imagesCollection}
          showFullscreenButton={false}
          showNav={false}
          showPlayButton={false}
          showThumbnails={false}
          slideInterval={10000}
          useBrowserFullscreen={false}
        />
        <h3>
          Text your photo and caption to {process.env.PHONE_NUMBER}
        </h3>
      </div>
    );
  }
}

Images.propTypes = {
  images: arrayOf(shape({
    caption: string,
    created_at: string,
    from_number: string,
    id: number,
    query: string,
    updated_at: string,
    url: string,
  })),
};

Images.defaultProps = {
  images: [],
};

const mapStateToProps = (state) => {
  const { twilioImages: images } = state.app;

  return { images };
};

export default connect(mapStateToProps)(Images);
