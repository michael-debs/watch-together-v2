import React, { useState } from 'react'
import { v4 } from 'uuid';


function useCollection<T extends CollectionObjectType>(): Control<T> {
    const [collection, setCollection] = useState<T[]>([] as T[])

    function add(item: T) {
        const newItem = { ...item, id: item.id ?? v4() } as T
        setCollection((prev) => [...prev, newItem])
    }

    function remove(item: T['id']) {
        setCollection((prev) => prev.filter((i) => i.id !== item))
    }

    function move(item: T, foreignControl: Control<T>) {
        remove(item.id)
        foreignControl.add(item)
    }

    return {
        add,
        remove,
        move,
    }

}

export default useCollection