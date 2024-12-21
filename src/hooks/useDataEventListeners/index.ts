import { useCallback, useRef } from "react";
import useSystemEvents from "./useSystemEvents";
import { ConnectionCollectionType, DataEventType } from "@/types/connection";

function useDataEventListeners() {
    const userEventListeners = useRef<DataEventType[]>([]);
    const { handleSystemEvents } = useSystemEvents();

    const handleDataEvents = useCallback((conn: ConnectionCollectionType, data: DataEventType) => {
        const { type } = data;
        console.log("Received data:", data);
        switch (type) {
            case "SYSTEM":
                handleSystemEvents(conn, data);
                break;
        }
        // eventListeners.current.forEach((listener) => listener.listener(data));
    }, []);

    return { handleDataEvents };
}

export default useDataEventListeners;