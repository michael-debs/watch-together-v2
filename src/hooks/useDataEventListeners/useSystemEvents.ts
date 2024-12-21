import { ConnectionCollectionType, DataEventType } from "@/types/connection";
import { useCallback } from "react";

function useSystemEvents() {

    const handleSystemEvents = useCallback((connection: ConnectionCollectionType,data: DataEventType) => { }, [])

    return { handleSystemEvents }
}

export default useSystemEvents;