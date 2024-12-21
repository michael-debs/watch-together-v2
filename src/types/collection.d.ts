interface CollectionObjectType {
    id: string;
    [key: string]: unknown;
}

interface Control<T extends CollectionObjectType> {
    add: (item: T) => void;
    remove: (item: CollectionObjectType['id']) => void;
    move: (item: T, foreignControl: Control<T>) => void;
}
