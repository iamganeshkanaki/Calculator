import { ACTION } from "./NewCalculator.js"

export default function DigitButton({ dispatch, digit }) {
    return <button onClick={() => dispatch({ type: ACTION.ADD_DIGITS, payload: { digit } })}>{digit}</button>
}