import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

import Button from './Button';

import { COLOR_PALETTE } from '../Constants';

const InputContainer = glamorous.div(
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    '> i': {
      position: 'absolute',
      right: 25,
    },
  }, props => ({
    minWidth: props.mWidth ? props.mWidth : 'auto',
  }),
);

const shapeStyle = {
  round: '200px',
  square: 0,
  default: 6,
};

const InputBox = glamorous.input(
  {
    fontFamily: 'Lato, sans-serif',
    flex: '1 0 auto',
    border: '2px solid #F4F4F4',
    height: 50,
    fontSize: 16,
    margin: 0,
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: 6,
    color: '#000',
    transition: 'all 1s',
    ':hover': {
      opacity: 0.8,
    },
    ':focus': {
      outline: 0,
      borderColor: '#6E7A83',
    },
    ':disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  },
  props => ({
    borderColor: COLOR_PALETTE[props.borderColor] || '#F4F4F4',
    borderRadius: props.shape ? shapeStyle[props.shape] : shapeStyle.default,
    ':focus': {
      borderColor: props.borderFocus ? COLOR_PALETTE[props.borderFocus] : '#6E7A83',
    },
  }),
);

const loadingAnimation = glamor.css.keyframes({
  '0%': { transform: 'rotate(0deg)', opacity: 0.5 },
  '50%': { opacity: 1 },
  '100%': { transform: 'rotate(360deg)', opacity: 0.5 },
});

const LoadingIcon = glamorous.i({
  transform: 'rotate(0deg)',
  color: '#6d6d6d',
  fontSize: '22px',
  animation: `${loadingAnimation} 1s infinite`,
});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      togglePasswordStatus: this.props.type,
    };
    this.toggleType = this.toggleType.bind(this);
  }

  toggleType() {
    this.setState(prevState => ({
      togglePasswordStatus: prevState.togglePasswordStatus === 'password'
        ? 'text'
        : 'password',
    }));
  }

  render() {
    const {
      outerStyle,
      togglePassword,
      input,
      placeholder,
      required,
      borderColor,
      borderFocus,
      shape,
      loading,
      type,
      icon,
      min,
      max,
    } = this.props;
    const { togglePasswordStatus } = this.state;
    return (
      <InputContainer style={outerStyle} togglePassword={togglePassword}>
        <InputBox
          {...this.props}
          {...typeof input !== 'undefined' ? input : null}
          placeholder={placeholder}
          required={required}
          borderColor={borderColor}
          borderFocus={borderFocus}
          shape={shape}
          loading={loading}
          type={type === 'password' && togglePassword ? togglePasswordStatus : type}
          min={min}
          max={max}
        />
        {togglePassword && type === 'password' && !loading && !icon && (
          <Button
            iFont="fa"
            icon={togglePasswordStatus === 'password' ? 'eye' : 'eye-slash'}
            iconSize={20}
            style={{
              padding: '0px 15px',
              position: 'absolute',
              right: 0,
            }}
            border
            shape="round"
            bold
            template="link"
            onClick={this.toggleType}
          />
        )}
        {icon && !loading && <i className={icon} />}
        {loading && <LoadingIcon className="fa fa-repeat" />}
      </InputContainer>
    );
  }
}

export default Input;
