import React from 'react';

import { storiesOf } from '@storybook/react';

import { withKnobs, select, number } from '@storybook/addon-knobs';

import Logo from '../components/Logo';
import View from '../components/View';

const optionsColor = {
  red: 'red',
  red_light: 'red_light',
  blue: 'blue',
  blue_light: 'blue_light',
  text: 'text',
  text2: 'text2',
  title: 'title',
};

storiesOf('Logos', module)
  .addDecorator(withKnobs)
  .add('Docplanner', () => {
    const defaultLogoColor = 'business';
    const logoColor = select('Color', optionsColor, defaultLogoColor);
    return (
      <View
        container
        direction="column"
        align="center"
        justify="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Logo
          color={logoColor}
          scale={number('scale', 1.0)}
        />
      </View>
    );
  });
