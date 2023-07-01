import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/globalContext';
import { useState } from 'react';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';

function ExpenseForm() {

    const {addExpenses,getExpenses,error,setError} = useGlobalContext()

    const [inputState,setInputState] = useState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })

const {title,amount,date,category,description} = inputState;

const handleInput = name => e=>{
    setInputState({...inputState,[name]:e.target.value})
    setError("")
}

const handleSubmit = e =>{
    e.preventDefault()
    addExpenses(inputState)
    setInputState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })
}

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
           {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input 
            type='text'
            value={title}
            name={'title'}
            placeholder="Salary Title"
            onChange={handleInput('title')}/>
      </div>
      <div className='input-control'>
        <input 
            type='text'
            value={amount}
            name={'amount'}
            placeholder={"Salary Amount"}
            onChange={handleInput('amount')}/>
      </div>
      <div className='input-control'>
        <DatePicker 
            id='date'
            selected={date}
            placeholderText="Enter a Date"
            dateFormat="dd/MM/yyyy"
            onChange={(date)=>{
                setInputState({...inputState,date:date})
            }}
        />
      </div>
      <div className='select input-control'>
        <select required value={category} name="category" id="category" onChange={handleInput('category')}>
            <option value="" disabled>Select Option</option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptons">Subscriptons</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothings">Clothings</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
        </select>
      </div>
      <div className='input-control'>
        <textarea 
            value={description}
            cols="30"
            rows="4"
            name='description'
            placeholder="Add a Reference"
            onChange={handleInput('description')}></textarea>
      </div>
      <div className='submit-btn'>
        <Button
           name={'Add Expense'}
           icon={plus}
           bPad={'.8rem 1.6rem'}
           bg={'var(--color-accent'}
           color={'#fff'} 
        />
      </div>
    </ExpenseFormStyled>
  )
}

const ExpenseFormStyled = styled.form`
    display:flex;
    flex-direction:column;
    gap:2rem;
    input,textarea,select{
        font-family:inherit;
        font-size:inherit;
        outline:none;
        border:none;
        padding:.5rem 1rem;
        border-radius:5px;
        border:2px solid #fff;
        background:tansparent;
        resize:none;
        box-shadow:0px 1px 15px rgba(0,0,0,0.06);
        color:rgba(34,34,96,0.9);
        &::placeholder{
            color:rgba(34,34,96,0.4);
        }
    }
    .input-control{
        input{
            width:100%;
        }
    }
    .selects{
        display:flex;
        justify-content:flex-end;
        select{
            color:rgba(34,34,96,0.4);
            &:focus,&:active{
                color:rgba(34,34,96,1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow:0px 1px 15px rgba(0,0,0.06);
            &:hover{
                background:var(--color-green) !important;
            }
        }
    }
`;

export default ExpenseForm
