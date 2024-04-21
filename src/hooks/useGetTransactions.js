import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../config/firebase-config';
import useGetUserInfo from './useGetUserInfo';


function useGetTransactions() {
    const [transactions, setTransactions] = useState([]);
    const { userID } = useGetUserInfo() || '';
    const transactionCollectionRef = collection(db, "transactions")
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expences: 0.0,
    })

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where('userID', '==', userID),
                orderBy('createdAt')
            )

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpences = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id })
                    if (data.transactionType === "expence") {
                        totalExpences += Number(data.transactionsAmount);
                    } else {
                        totalIncome += Number(data.transactionsAmount);
                    }
                })
                setTransactions(docs);
                let balance = totalIncome - totalExpences;
                setTransactionTotals({
                    balance,
                    expences: totalExpences,
                    income: totalIncome,
                })
            });
        } catch (error) {
            console.error(error);
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions()
    }, [])
    return { transactions, transactionTotals }

}

export default useGetTransactions