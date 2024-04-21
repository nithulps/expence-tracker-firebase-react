import React from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import useGetUserInfo from './useGetUserInfo';

function useAddTransactions() {
    const transactionCollectionRef = collection(db,"transactions")
    const {userID}= useGetUserInfo() || '';
    const addTransaction = async ({
        description,
        transactionsAmount,
        transactionType
    }) => {
       await addDoc(transactionCollectionRef,{
            userID,
            description,
            transactionsAmount,
            transactionType,
            createdAt:serverTimestamp()
        });
        
    }
    return { addTransaction }
}

export default useAddTransactions