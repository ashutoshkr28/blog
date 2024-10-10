"use client"

import { db } from '@/lib/firebase'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'

export function useAdmin({ uid }) {
    const { data, error } = useSWRSubscription([`admins/${uid}`], ([path], { next }) => {
        const ref = doc(db, path);
        console.log(ref, path)

        const unsub = onSnapshot(ref, (snaps) => {
            next(null, snaps.exists() ? snaps.data() : null)
        }, (error) => {
            next(error?.message)
        })
        return () => unsub();
    })
    console.log(data, error)

    return {
        data,
        error,
        isLoading: data === undefined ? true : false,
    }
}