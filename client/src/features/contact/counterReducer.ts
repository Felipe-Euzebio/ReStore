export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

export interface CounterState {
    count: number;
    title: string;
}

const initialState: CounterState = {
    count: 0,
    title: 'YARC - Yet Another React Counter'
}

export function increment(amount: number = 1){
    return {
        type: COUNTER_INCREMENT,
        payload: amount
    }
}

export function decrement(amount: number = 1){
    return {
        type: COUNTER_DECREMENT,
        payload: amount
    }
}

export default function counterReducer(state = initialState, action: any){
    switch (action.type) {
        case COUNTER_INCREMENT: 
            return {
                ...state,
                count: state.count + action.payload
            }

        case COUNTER_DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
    
        default:
            return state;
    }

    return state;
}