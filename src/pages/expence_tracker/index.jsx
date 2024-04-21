import React, { useState } from 'react'
import useAddTransactions from '../../hooks/useAddTransactions';
import useGetTransactions from '../../hooks/useGetTransactions';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom'

function ExpenceTracker() {
    const { addTransaction } = useAddTransactions();
    const { transactions, transactionTotals } = useGetTransactions();
    const { name, profilephoto } = useGetUserInfo();
    const navigate = useNavigate()

    const [description, setDescription] = useState("")
    const [transactionsAmount, setTransactionsAmount] = useState(0)
    const [transactionType, setTransactionType] = useState("expence")

    const { balance, income, expences } = transactionTotals

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionsAmount,
            transactionType
        })
        setDescription("")
        setTransactionsAmount("")
    };
    const signUserOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <header>
                {profilephoto && (
                    <div className='profile'>
                        <img className='profile-photo' src={profilephoto} alt="" />
                    </div>
                )}
                {name}'s Expence Tracker
                <button className='sign-out-btn' onClick={signUserOut}>
                    Sign Out
                </button>
            </header>
            <div className='home'>
                <div className=''>

                </div>

                <div className='expence-tracker'>
                    <div className='container'>

                        <div className='balance'>
                            <h2>Your Balance&nbsp;:</h2> &nbsp;&nbsp;
                            {balance >= 0 ? <h2 className='clr'>${balance}</h2> : <h2 className='clrn'>-${balance * -1}</h2>}
                        </div>
                        <div className='summary'>
                            <div className='income'>
                                <h2>Income&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h2>&nbsp;&nbsp;
                                <h3>${income}</h3>
                            </div>
                            <div className='expences'>
                                <h2>Expences&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; </h2>
                                <h3>${expences}</h3>
                            </div>
                        </div>
                        <form className='add-transaction' onSubmit={onSubmit}>
                            <input className='f-box' type="text" placeholder='Description' value={description} required
                                onChange={(e) => setDescription(e.target.value)} />

                            <input className='f-box' type="number" placeholder='Amount' value={transactionsAmount} required
                                onChange={(e) => setTransactionsAmount(e.target.value)} />

                            <input type="radio" id='expence' value='expence'
                                checked={transactionType === "expence"}
                                onChange={(e) => setTransactionType(e.target.value)} />
                            <label className='exp' htmlFor="expence">Expence</label>

                            <input type="radio" id='income' value='income'
                                checked={transactionType === "income"}
                                onChange={(e) => setTransactionType(e.target.value)} />
                            <label htmlFor="income">Income</label>

                            <div className='btnbx'>
                                <button className='btn' type='submt'>Add Transaction </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='transactions'>
                    <h1>Transactions History</h1>
                    <div className='trnsbx'>
                        <ul>
                            {transactions.map((transaction) => {
                                const { description, transactionsAmount, transactionType } =
                                    transaction;
                                return (
                                    <li className='hstry'>
                                        <h4 className='descrip'>{description} &nbsp;</h4>
                                        <p>
                                            ${transactionsAmount}. <label style={{ color: transactionType === "expence" ? "red" : "green" }}>{transactionType}</label>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpenceTracker;