/* eslint-disable react/prop-types */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../app/store';
import GameStart from './GameStart';

describe('Game start component test', () => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  beforeEach(() => {
    render(<GameStart />, { wrapper: Wrapper });
  });

  afterEach(cleanup);

  it('renders an input', () => {
    const input = screen.getByTestId('player-name');
    expect(input).toHaveAttribute('placeholder', 'Player name');
  });

  it('input updates on change', () => {
    const input = screen.getByTestId('player-name');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('renders a button', () => {
    document.querySelectorAll('button').forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it('check if the button is disabled', () => {
    const input = screen.getByTestId('player-name');
    const button = screen.getByTestId('play-button');

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'name' } });
    expect(button).toBeEnabled();
  });
});
