import React from 'react';
import glamorous from 'glamorous';

import { COLOR_PALETTE } from '../Constants';

const shape = {
  round: '200px',
  square: 0,
  default: 6,
};

const size = {
  small: {
    fontSize: 14,
    minHeight: 30,
  },
  medium: {
    fontSize: 18,
    minHeight: 54,
  },
  large: {
    fontSize: 22,
    minHeight: 60,
  },
};

const template = (props) => {
  const templateRemake = {
    default: {
      background: props.type ? COLOR_PALETTE[props.type] : COLOR_PALETTE.red,
      border: 0,
      color: 'white',
    },
    outlined: {
      backgroundColor: 'white',
      border: '2px solid',
      borderColor: COLOR_PALETTE[props.bordercolor],
      color: props.bordercolor ? COLOR_PALETTE[props.bordercolor] : COLOR_PALETTE.night,
      ':hover:enabled': {
        background: (props.bordercolor === 'black' || !props.bordercolor) ?
          COLOR_PALETTE.night : 'white',
        color: (props.bordercolor === 'black' || !props.bordercolor) ?
          'white' : props.bordercolor,
      },
    },
    link: {
      backgroundColor: 'transparent',
      border: 0,
      color: props.bordercolor ? COLOR_PALETTE[props.bordercolor] : COLOR_PALETTE.night,
      ':hover:enabled': {
        boxShadow: 'none',
        color: props.bordercolor ?
          props.bordercolor === 'black' ? 'white' : props.bordercolor
          : 'black',
      },
    },
  };

  const theme = templateRemake[props.template ? props.template : 'default'];
  const templateMod = Object.assign(
    {},
    theme,
  );

  return templateMod;
};

const Icon = glamorous.i(
  {
    fontSize: 22,
    fontWeight: 300,
    display: 'flex',
  },
  props => ({
    fontSize: props.iconSize,
    width: props.iconWidth,
    fontWeight: props.iconWeight,
  }),
);

const ButtonBox = glamorous.button(
  {
    fontFamily: 'Lato, sans-serif',
    margin: '0 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
    padding: '0 22px',
    WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
    ':hover:enabled': {
      boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
    },
    ':focus': {
      outline: 0,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  props => ({
    ...template(props),
    ...size[props.size ? props.size : 'medium'],
    borderRadius: props.shape ? shape[props.shape] : shape.default,
    fontWeight: props.bold ? 700 : 300,
    minWidth: props.fullWidth ? '100%' : 'initial',
    textTransform: props.uppercase ? 'uppercase' : 'initial',
    transform: props.noanim ? 'none' : 'translateY(-1px)',
    ':active:enabled': {
      transform: props.noanim ? 'none' : 'translateY(1px)',
    },
  }),
);

const Button = props => (
  <ButtonBox {...props} >
    {props.icon &&
    <Icon
      iconWeight={props.iconWeight}
      iconSize={props.iconSize}
      iconWidth={props.iconWidth}
      className={`${props.iFont} ${props.iFont}-${props.icon}`}
      aria-hidden="true"
    />
    }
    {props.children}
  </ButtonBox>
);

export default Button;