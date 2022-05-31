import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../app/store';
import CommentsPanel from './CommentsPanel';

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

Wrapper.propTypes = {
  children: PropTypes.any.isRequired
};

const setup = (winner, hitsByComputer, hitsByPlayer, gameState) =>
  render(
    <CommentsPanel
      winner={winner}
      hitsByComputer={hitsByComputer}
      hitsByPlayer={hitsByPlayer}
      gameState={gameState}
    />,
    { wrapper: Wrapper }
  );

it('check the winner notification', () => {
  setup('player', [{ type: 'miss' }], [{ type: 'hit' }], 'cpu-turn');
  const notification = screen.getByTestId('winner');
  expect(notification).toHaveTextContent('You win!');
});

it('check the game state notification', () => {
  setup(null, [{ type: 'miss' }], [{ type: 'hit' }], 'cpu-turn');
  const notification = screen.getByTestId('game-state');
  expect(notification).toHaveTextContent('Playing: CPU');
});

it('renders restart button', () => {
  setup('player', [{ type: 'hit' }], [{ type: 'hit' }], 'player-turn');
  const restartButton = screen.getByTestId('restart');
  expect(restartButton).toBeInTheDocument();
});
