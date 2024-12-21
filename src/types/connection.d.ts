import Peer, { DataConnection } from "peerjs";

interface PeerType {
    user: UserType;
}

interface ConnectionCollectionType extends CollectionObjectType {
    peer: PeerType;
    connection: DataConnection;
    id: string;
}

interface DataEventType {
    type: string;
    action: string;
    payload?: unknown;
}

interface MetadataType {
    user: UserType;
    actions: string[];
}