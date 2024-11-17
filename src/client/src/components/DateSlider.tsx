import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

// inspired by MUI aslider: https://mui.com/material-ui/react-slider/
const ContainerSpan = styled.span`
  border-radius: 12px;
  box-sizing: content-box;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  color: rgb(144, 202, 249);
  height: 4px;
  width: 100%;
  padding: 13px 0px;
`;

const RailSpan = styled.span`
  display: block;
  position: absolute;
  border-radius: inherit;
  background-color: currentColor;
  opacity: 0.38;
  width: 100%;
  height: inherit;
  top: 50%;
  transform: translateY(-50%);
`;

const ForegroundSpan = styled.span`
  display: block;
  position: absolute;
  border-radius: inherit;
  border: 1px solid currentColor;
  background-color: currentColor;
  transition:
    left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  height: inherit;
  top: 50%;
  transform: translateY(-50%);
  left: 0%;
  width: 100%;
`;

const StartThumbSpan = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  background-color: currentcolor;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  outline: 0px;
  transition:
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1),
    left 150ms cubic-bezier(0.4, 0, 0.2, 1),
    bottom 150ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0%;
`;

const EndhumbSpan = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  background-color: currentcolor;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  outline: 0px;
  transition:
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1),
    left 150ms cubic-bezier(0.4, 0, 0.2, 1),
    bottom 150ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 100%;
`;

interface DateSliderProps {
  startDate: Date;
  endDate: Date;
  dateChanged: () => void;
}

const DateSlider: React.FC<DateSliderProps> = ({
  startDate,
  endDate,
  dateChanged,
}) => {
  const [thumbClicked, setThumbclicked] = useState('none');
  const [startPosition, setStartPosition] = useState({ x: -100 });
  const [endPosition, setEndPosition] = useState({ x: 10000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // used to initialize thumbs after first paint
    if (containerRef.current === null) return;
    const { width } = containerRef.current.getBoundingClientRect();

    setStartPosition({ x: 0 });
    setEndPosition({ x: width });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; }) => {
      if (!event) return;

      if (thumbClicked === 'start') {
        if (containerRef.current === null) return;
        const { left } = containerRef.current.getBoundingClientRect();
        setStartPosition({ x: event.clientX - left });
      } else if (thumbClicked === 'end') {
        if (containerRef.current === null) return;
        const { left } = containerRef.current.getBoundingClientRect();
        setEndPosition({ x: event.clientX - left });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (thumbClicked === 'none') {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [thumbClicked])

  const onThumbDown = (newThumbClicked: string) => {
    if (thumbClicked !== newThumbClicked) {
      setThumbclicked(newThumbClicked);
    }
  };

  const onThumbUp = () => {
    setThumbclicked('none');
  };

  return (
    <ContainerSpan role="group" ref={containerRef}>
      <RailSpan></RailSpan>
      <ForegroundSpan></ForegroundSpan>
      <StartThumbSpan role="slider"
        onMouseUp={onThumbUp}
        onMouseDown={() => onThumbDown('start')}
        style={{ left: startPosition.x }}
      ></StartThumbSpan>
      <EndhumbSpan
        role="slider"
        onMouseUp={onThumbUp}
        onMouseDown={() => onThumbDown('end')}
        style={{ left: endPosition.x }}
      ></EndhumbSpan>
    </ContainerSpan>
  );
};

export default DateSlider;
