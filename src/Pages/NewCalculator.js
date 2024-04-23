import React, { useReducer } from 'react';
import "../Pages/style.css";
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
export const ACTION = {
    ADD_DIGITS: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DEGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION.ADD_DIGITS:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOprand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === '0' && state.currentOprand === '0') {
                return state;
            }
            if (payload.digit === '.' && state.currentOprand.includes('.')) {
                return state;
            }
            return {
                ...state,
                currentOprand: `${state.currentOprand || ""}${payload.digit}`
            }

        case ACTION.CLEAR:
            return {}
        case ACTION.CHOOSE_OPERATION:
            if (state.currentOprand == null && state.previousOperand == null) {
                return state;
            }
            if (state.currentOprand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOprand,
                    currentOprand: null
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOprand: null
            }

        case ACTION.EVALUATE:
            if (state.operation == null ||
                state.currentOprand == null ||
                state.previousOperand == null
            ) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOprand: evaluate(state)
            }

        case ACTION.DELETE_DEGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOprand: null
                }
            }
            if (state.currentOprand == null) {
                return state
            }
            if (state.currentOprand.length === 1) {
                return { ...state, currentOprand: null }
            }
            return {
                ...state,
                currentOprand: state.currentOprand.slice(0, -1)
            }
        default:
            return state
    }
}
function evaluate({ currentOprand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOprand);
    if (isNaN(prev) || isNaN(curr)) return ""
    let compution = "";
    switch (operation) {
        case '+':
            compution = prev + curr;
            break;

        case '-':
            compution = prev - curr;
            break;

        case '*':
            compution = prev * curr;
            break;

        case '÷':
            compution = prev / curr;
            break;
        default:
            return null;

    }
    return compution.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})
function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".");
    if(decimal == null ) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal  }`
}
function NewCalculator() {
    const [{ currentOprand, previousOperand, operation }, dispatch] = useReducer(reducer, {});
    // dispatch({ type: ACTION.ADD_DIGITS, payload: { digit: 1 } });
    return (
        <div>
            <div className='calculator-grid'>
                <div className='output'>
                    <div className='previous-operand'>{previousOperand}{operation}</div>
                    <div className='current-operand'>{formatOperand(currentOprand)}</div>
                </div>
                <button className='span-two' onClick={() => dispatch({ type: ACTION.CLEAR })}>AC</button>
                <button onClick={() => dispatch({ type: ACTION.DELETE_DEGIT })}>DEL</button>
                <OperationButton operation='÷' dispatch={dispatch} />
                <DigitButton digit='1' dispatch={dispatch} />
                <DigitButton digit='2' dispatch={dispatch} />
                <DigitButton digit='3' dispatch={dispatch} />
                <OperationButton operation='*' dispatch={dispatch} />
                <DigitButton digit='4' dispatch={dispatch} />
                <DigitButton digit='5' dispatch={dispatch} />
                <DigitButton digit='6' dispatch={dispatch} />
                <OperationButton operation='+' dispatch={dispatch} />
                <DigitButton digit='7' dispatch={dispatch} />
                <DigitButton digit='8' dispatch={dispatch} />
                <DigitButton digit='9' dispatch={dispatch} />
                <OperationButton operation='-' dispatch={dispatch} />
                <DigitButton digit='.' dispatch={dispatch} />
                <DigitButton digit='0' dispatch={dispatch} />
                {/* <DigitButton digit='=' className="span-two" dispatch={dispatch} />                 */}
                <button className='span-two' onClick={() => dispatch({ type: ACTION.EVALUATE })}>=</button>
            </div>
        </div>
    )
}

export default NewCalculator
