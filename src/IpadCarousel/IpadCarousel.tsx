import * as React from 'react';
import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import { RefObject, useRef, useState } from 'react';
import Slider from 'react-slick';
// @ts-ignore
import whiteIpad from './white-ipad.png';
// @ts-ignore
import blackIpad from './black-ipad.png';

export interface Slide {
  title: string;
  images: { url: string }[];
  contents: { id: string, url: string }[]
}

interface CarouselProps {
  data: Slide[],
  selectedTitle: string,
  onChanged: (title: string) => void
}

export const IpadCarousel: React.SFC<Readonly<CarouselProps>> = React.memo(({ data, onChanged, selectedTitle }) => {
  const sliderRef = useRef() as RefObject<Slider>;

  const [title, setTitle] = useState(selectedTitle);
  if (title !== selectedTitle) {
    sliderRef!.current!.slickGoTo(data.findIndex(({ title }) => title === selectedTitle));
    setTitle(selectedTitle);
  }

  const [initialSlide, setInitialSlide] = useState(-1);
  if (initialSlide == -1 && title) {
    setInitialSlide(data.findIndex(({ title }) => title === selectedTitle));
  }

  return <SliderWrapper>
    <ReactSlick
      ref={sliderRef}
      dots={false}
      centerMode={true}
      focusOnSelect={true}
      variableWidth={true}
      infinite={true}
      speed={200}
      slidesToShow={5}
      slidesToScroll={1}
      centerPadding="0"
      className="center"
      initialSlide={initialSlide}
      afterChange={(idx: number) => onChanged(data[idx].title)}
    >
      {data.map(({ title, images: [{ url }] }, idx) => <SlideWrapper key={idx}>
        <div className="inner-slide">
          <div className="img-wrapper">
            <img src={url} alt={title} />
          </div>


          <h3>{title}</h3>
        </div>
      </SlideWrapper>)}
    </ReactSlick>
  </SliderWrapper>;
}, (prev, next) => prev.data === next.data && prev.selectedTitle === next.selectedTitle);

const SliderWrapper = styled.div`
  overflow: hidden;
  font-family: sans-serif;
  
  & h3 {
    margin: 0;
    text-align: center;
    position: absolute;
    background: #ffffffb0;
    padding: 4px;
    bottom: 35px;
    left: 12px;
    right: 12px;
  }
  
  & .img-wrapper {
    position: absolute;
    bottom: 35px;
    top: 35px;
    left: 12px;
    right: 12px;
    overflow: hidden;
  }
  
  & img {
    width: 100%;
  }

  .slick-slide [tabindex]:focus {
    // yea, not nice to remove outline
    outline: none;
  }
  
  .slick-slide .inner-slide {
    cursor: pointer;
    transform: scale(0.9, 0.9);
    height: 300px;
    width: 200px;
    position: relative;
    overflow: hidden;
    background-image: url(${whiteIpad});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  & .slick-slide.slick-current .inner-slide {
    transform: scale(1.05, 1.05);
    background-image: url(${blackIpad});
  } 
  
  & .slick-track {
    padding-top: 10px;
    height: 310px;
    overflow: hidden;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
`;