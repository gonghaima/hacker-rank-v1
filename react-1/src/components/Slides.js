import React, { useState } from 'react';

function Slides({ slides }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [disableRestart, setDisableRestart] = useState(true);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const setPositionStatus = (cIndex, navValue) => {
    if (cIndex + navValue > 0) {
      setDisableRestart(false);
    } else {
      setDisableRestart(true);
    }

    if (cIndex === 0 && navValue === -1) {
      // setCurrentSlideIdx
      setDisableRestart(false);
      setDisablePrev(true);
      return setDisableNext(false);
    }
    if (cIndex === 1 && navValue === -1) {
      setCurrentSlideIdx(0);
      setDisableRestart(true);
      setDisablePrev(true);
      return setDisableNext(false);
    }

    if (cIndex === slides.length - 1 && navValue === 1) {
      setDisableRestart(false);
      setDisablePrev(false);
      return setDisableNext(true);
    }
    if (cIndex === slides.length - 2 && navValue === 1) {
      setCurrentSlideIdx(slides.length - 1);
      setDisableRestart(false);
      setDisablePrev(false);
      return setDisableNext(true);
    }

    setDisablePrev(false);
    setDisableNext(false);
    setCurrentSlideIdx(cIndex + navValue);
  };

  const setRestart = () => {
    setCurrentSlideIdx(0);
    setDisablePrev(true);
    setDisableNext(false);
    setDisableRestart(true);
  };

  return (
    <div>
      <div id="navigation" className="text-center">
        <button
          onClick={() => setRestart()}
          disabled={disableRestart}
          data-testid="button-restart"
          className="small outlined"
        >
          Restart
        </button>
        <button
          disabled={disablePrev}
          onClick={() => setPositionStatus(currentSlideIdx, -1)}
          data-testid="button-prev"
          className="small"
        >
          Prev
        </button>
        <button
          disabled={disableNext}
          onClick={() => setPositionStatus(currentSlideIdx, 1)}
          data-testid="button-next"
          className="small"
        >
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{slides[currentSlideIdx].title}</h1>
        <p data-testid="text">{slides[currentSlideIdx].text}</p>
      </div>
    </div>
  );
}

export default Slides;
