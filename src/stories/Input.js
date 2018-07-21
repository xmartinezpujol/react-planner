import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Input from '../components/Input';
import View from '../components/View';

const optionsShape = {
  round: 'round',
  square: 'square',
  default: 'default',
};

const optionsBorder = {
  night: 'night',
  positive: '#86D9C5',
  negative: '#EF8B8B',
  temporary: '#FBB86D',
  neutral: '#6E7A83',
};

const labelShape = 'Shape';
const labelBorderColor = 'Border Color';
const defaultShape = 'default';
const defaultborderColor = 'text';

storiesOf('Input Types', module).addDecorator(withKnobs)
  .add('Input', () => {
    const shape = select(labelShape, optionsShape, defaultShape);
    const borderColor = select(labelBorderColor, optionsBorder, defaultborderColor);

    return (
      <Input
        style={{ width: 300 }}
        disabled={boolean('Disabled', false)}
        placeholder={text('Placeholder','Text here...')}
        onClick={action('focused')}
        borderColor={borderColor}
        shape={shape}
        type={text('Type (text/password/numeric): ', 'text')}
        icon={text('Icon (fa/custom): ','')}
        togglePassword={boolean('Allow toggle password visibility ( must be type=password ): ', false)}
        loading={boolean('Show animation while loading: ', false)}
        outerStyle={JSON.parse(text('Styles:  ', '{}'))}
      />
    );
  });