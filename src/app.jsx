import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './gallery'

const mountNode = document.getElementById('container');

const pictures = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg'
];

let thumbs = [];

for (const [index, item] of pictures.entries()) {
  thumbs.push({
    id: index*100,
    src: item,
    href: item,
    caption: `picture ${index+1}`
  });
}

ReactDOM.render(
  <Gallery
    pictures={pictures}
    thumbs={thumbs}
  />,
  mountNode
);