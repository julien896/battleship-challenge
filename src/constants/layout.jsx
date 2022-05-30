/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;
export const BOARD = BOARD_COLUMNS * BOARD_ROWS;

export const SQUARE_STATE = {
  empty: 'empty',
  ship: 'ship',
  hit: 'hit',
  miss: 'miss',
  ship_sunk: 'ship-sunk',
  forbidden: 'forbidden',
  awaiting: 'awaiting'
};

export const stateToClassName = {
  [SQUARE_STATE.empty]: 'empty',
  [SQUARE_STATE.ship]: 'ship',
  [SQUARE_STATE.hit]: 'hit',
  [SQUARE_STATE.miss]: 'miss',
  [SQUARE_STATE.ship_sunk]: 'ship-sunk',
  [SQUARE_STATE.forbidden]: 'forbidden',
  [SQUARE_STATE.awaiting]: 'awaiting'
};

export const generateEmptyLayout = () =>
  new Array(BOARD_ROWS * BOARD_COLUMNS).fill(SQUARE_STATE.empty);

export const coordsToIndex = (coordinates) => {
  const { x, y } = coordinates;

  return y * BOARD_ROWS + x;
};

export const indexToCoords = (index) => ({
  x: index % BOARD_ROWS,
  y: Math.floor(index / BOARD_ROWS)
});

export const entityIndices = (entity) => {
  let position = coordsToIndex(entity.position);

  const indices = [];

  for (let i = 0; i < entity.length; i++) {
    indices.push(position);
    position =
      entity.orientation === 'vertical' ? position + BOARD_ROWS : position + 1;
  }

  return indices;
};

export const entityIndices2 = (entity) => {
  const indices = [];
  for (let i = 0; i < entity.length; i++) {
    const position =
      entity.orientation === 'vertical'
        ? coordsToIndex({ y: entity.position.y + i, x: entity.position.x })
        : coordsToIndex({ y: entity.position.y, x: entity.position.x + i });
    indices.push(position);
  }

  return indices;
};

export const isWithinBounds = (entity) =>
  (entity.orientation === 'vertical' &&
    entity.position.y + entity.length <= BOARD_ROWS) ||
  (entity.orientation === 'horizontal' &&
    entity.position.x + entity.length <= BOARD_COLUMNS);

export const putEntityInLayout = (oldLayout, entity, type) => {
  const newLayout = oldLayout.slice();

  if (type === 'ship') {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.ship;
    });
  }

  if (type === 'forbidden') {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.forbidden;
    });
  }

  if (type === 'hit') {
    newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.hit;
  }

  if (type === 'miss') {
    newLayout[coordsToIndex(entity.position)] = SQUARE_STATE.miss;
  }

  if (type === 'ship-sunk') {
    entityIndices(entity).forEach((idx) => {
      newLayout[idx] = SQUARE_STATE.ship_sunk;
    });
  }

  return newLayout;
};

export const isPlaceFree = (entity, layout) => {
  const shipIndices = entityIndices2(entity);

  return shipIndices.every((idx) => layout[idx] === SQUARE_STATE.empty);
};

export const calculateOverhang = (entity) =>
  Math.max(
    entity.orientation === 'vertical'
      ? entity.position.y + entity.length - BOARD_ROWS
      : entity.position.x + entity.length - BOARD_COLUMNS,
    0
  );

export const canBePlaced = (entity, layout) =>
  isWithinBounds(entity) && isPlaceFree(entity, layout);

export const generateRandomOrientation = () => {
  const randomNumber = Math.floor(Math.random() * Math.floor(2));

  return randomNumber === 1 ? 'vertical' : 'horizontal';
};

export const generateRandomIndex = (value = BOARD) =>
  Math.floor(Math.random() * Math.floor(value));

export const randomizeShipProps = (ship) => {
  const randomStartIndex = generateRandomIndex();

  return {
    ...ship,
    position: indexToCoords(randomStartIndex),
    orientation: generateRandomOrientation()
  };
};

export const placeAllCpuShips = (cpuShips) => {
  let cpuLayout = generateEmptyLayout();
  return cpuShips.map((ship) => {
    while (!canBePlaced(ship, cpuLayout)) {
      const decoratedShip = randomizeShipProps(ship);

      if (canBePlaced(decoratedShip, cpuLayout)) {
        cpuLayout = putEntityInLayout(
          cpuLayout,
          decoratedShip,
          SQUARE_STATE.ship
        );
        return { ...decoratedShip, placed: true };
      }
    }
  });
};

export const updateSunkShips = (currentHits, opponentShips) => {
  const playerHitIndices = currentHits.map((hit) =>
    coordsToIndex(hit.position)
  );

  const indexWasHit = (index) => playerHitIndices.includes(index);

  const shipsWithSunkFlag = opponentShips.map((ship) => {
    const shipIndices = entityIndices2(ship);
    if (shipIndices.every((idx) => indexWasHit(idx))) {
      return { ...ship, sunk: true };
    }
    return { ...ship, sunk: false };
  });

  return shipsWithSunkFlag;
};

export const getNeighbors = (coords) => {
  const firstRow = coords.y === 0;
  const lastRow = coords.y === 9;
  const firstColumn = coords.x === 0;
  const lastColumn = coords.x === 9;

  const neighbors = [];

  if (firstRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y + 1 }
    );
  }

  if (lastRow) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y - 1 }
    );
  }

  if (firstColumn) {
    neighbors.push(
      { x: coords.x + 1, y: coords.y },
      { x: coords.x, y: coords.y + 1 },
      { x: coords.x, y: coords.y - 1 }
    );
  }

  if (lastColumn) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y },
      { x: coords.x, y: coords.y + 1 },
      { x: coords.x, y: coords.y - 1 }
    );
  }

  if (!lastColumn || !firstColumn || !lastRow || !firstRow) {
    neighbors.push(
      { x: coords.x - 1, y: coords.y },
      { x: coords.x + 1, y: coords.y },
      { x: coords.x, y: coords.y - 1 },
      { x: coords.x, y: coords.y + 1 }
    );
  }

  const filteredResult = [
    ...new Set(
      neighbors
        .map((coord) => coordsToIndex(coord))
        .filter((number) => number >= 0 && number < BOARD)
    )
  ];

  return filteredResult;
};
