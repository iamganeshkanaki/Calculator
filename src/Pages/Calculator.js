import React from 'react'
import './Calculator.css';
function Calculator() {
    return (
        <>
            <div className='container'>
            <h1 className='title'> Calculator </h1>
            <input type='number' className='int' placeholder='Enter Numbers' />
                <div className='btns'>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button> <br />
                    <button>4</button>
                    <button>5</button>
                    <button>6</button> <br />
                    <button>7</button>
                    <button>8</button>
                    <button>9</button> <br />
                    <button>0</button>
                    <button>+</button>
                    <button>-</button> <br />
                    <button>X</button>
                    <button>/</button>
                    <button>.</button> <br />
                    <button>=</button>
                    <button>AC</button>
                </div>
            </div>
        </>
    )
}

export default Calculator
