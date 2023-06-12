import { useState } from 'react';
import './App.css';
import { createStore, bindActionCreators } from 'redux';

const initialState = {
	count: 0,
};

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const RESET_COUNTER = 'COUNTER_RESET';

const increment = (qty = 1) => ({
	type: INCREMENT_COUNTER,
	payload: qty,
});

const decrement = (qty = 1) => ({
	type: DECREMENT_COUNTER,
	payload: qty,
});

const reset = () => ({
	type: RESET_COUNTER,
	payload: 0,
});

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT_COUNTER: {
			return { ...state, count: state.count + action.payload };
		}
		case DECREMENT_COUNTER: {
			return { ...state, count: state.count - action.payload };
		}
		case RESET_COUNTER: {
			return { ...state, count: 0 };
		}
		default:
			return state;
	}
};

const store = createStore(counterReducer);
const unsubscribe = store.subscribe(() => console.log(store.getState()));

const actions = bindActionCreators(
	{ increment, decrement, reset },
	store.dispatch,
);

const App = () => {
	const [counter, setCounter] = useState(store.getState().count);

	const decrementHandler = () => {
		actions.decrement();
		setCounter(store.getState().count);
	};

	const incrementHandler = () => {
		actions.increment();
		setCounter(store.getState().count);
	};

	const resetHandler = () => {
		actions.reset();
		setCounter(store.getState().count);
	};

	return (
		<main>
			<div>
				<button onClick={decrementHandler}>-</button>
				<span className='counter'>{counter}</span>
				<button onClick={incrementHandler}>+</button>
			</div>
			<button className='resetBtn' onClick={resetHandler}>
				Reset
			</button>
		</main>
	);
};

unsubscribe();

export default App;
