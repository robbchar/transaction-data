import * as React from 'react';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import styled from '@emotion/styled';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      getAriaLabel={() => 'Temperature range'}
      getAriaValueText={valuetext}
      disableSwap={true}
      step={null}
      marks={marks}
      slots={{ valueLabel: SliderValueLabel }}
    />
  );
}

interface SliderValueLabelProps {
  children: React.ReactElement<any>;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
  return (
    <span className="label">
      <div className="value">{children}</div>
    </span>
  );
}

function valuetext(value: number) {
  return `${value}°C`;
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B3',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${blue[500]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${grey[300]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${blue[500]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${blue[200]};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${blue[200]};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${blue[200]};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 99%;
    background-color: ${blue[200]};
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${blue[500]};
  }

  & .${sliderClasses.markLabel} {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: 24px;
    transform: translateX(-50%);
    margin-top: 8px;
  }

  & .label {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 14px;
    background: unset;
    background-color: ${blue[600]};
    width: 32px;
    height: 32px;
    padding: 0px;
    visibility: hidden;
    color: #fff;
    border-radius: 50% 50% 50% 0;
    position: absolute;
    transform: translate(0%, -140%) rotate(-45deg) scale(0);
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :hover .label {
    visibility: visible;
    transform: translate(0%, -140%) rotate(-45deg) scale(1);
  }

  :hover .value {
    transform: rotate(45deg);
    text-align: center;
  }
`,
);