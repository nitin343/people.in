import { doc, getDoc } from 'firebase/firestore';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export function useFetchInterview(props) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interviewData, setInterviewData] = useState([]);
    const { currentUser } = useAuth();

    const router = useRouter();
    const query = router.query;
    const name = query.page;

    const interviewDetail = useSelector((state) => state.interviewCandidate.data)

    useEffect(() => {
        async function fetchData() {
            try {
            
                setTimeout(async () => {
                    setLoading(true)
                    const docRef = doc(db, 'user', currentUser.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        var objfav = await docSnap.data().interviewCandidate
                        if(objfav){
                            var favData = await Object.values(objfav)
                        }else{
                            var favData = []
                        }
                        setInterviewData(favData)
                        setLoading(false)
                    }
                }, 1000)
            } catch (err) {
                setError('Failed to load data')
            } finally {
                setTimeout(() => {
                    setLoading(false)
                },1100)
            }
        }
        fetchData();
    }, [interviewDetail, name])
    return { loading, error, interviewData };
}