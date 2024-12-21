"use client"
import PeerConstructor, { DataConnection, Peer } from "peerjs";
import React, { use, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import useCollection from "@/hooks/useCollection";
import useDataEventListeners from "@/hooks/useDataEventListeners";
import { ConnectionCollectionType, DataEventType } from "@/types/connection";
import { CONNECTION_REQUEST } from "@/constants/EventActions";

interface PeerContextType {
  requestConnection: (id: string) => void;
  partyControl: Control<ConnectionCollectionType>;
  invitationsControl: Control<ConnectionCollectionType>;
  requestsControl: Control<ConnectionCollectionType>;
  getPeer: () => PeerConstructor;
}

const PeerContext = React.createContext<PeerContextType | undefined>(undefined);

function PeerContextProvider({ children }: { children: React.ReactNode }) {
  const peer = useRef<Peer>(null);
  const { user } = useAuth();

  const partyControl = useCollection<ConnectionCollectionType>();
  const invitationsControl = useCollection<ConnectionCollectionType>();
  const requestsControl = useCollection<ConnectionCollectionType>();

  const { handleDataEvents } = useDataEventListeners();

  function getPeer(): PeerConstructor {
    if (!peer.current) {
      peer.current = new PeerConstructor();
    }
    return peer.current;
  }

  useEffect(() => {
    // Initialize PeerJS instance
    const newPeer = getPeer();

    // Set up peer events
    newPeer.on("open", (id) => {
      console.log("My Peer ID is:", id);
    });

    newPeer.on("connection", (conn) => {
      console.log("Incoming connection from:", conn.peer);

      if (conn.metadata?.actions?.includes(CONNECTION_REQUEST)) {
        setupConnection(conn, requestsControl);
      } else {
        conn.close();
      }
    });

    return () => {
      newPeer.destroy();
    };
  }, []);

  const setupConnection = (
    conn: DataConnection,
    controlGroup: Control<ConnectionCollectionType>
  ) => {
    const newConnection = {
      id: conn.peer,
      connection: conn,
      peer: { user: { username: conn.metadata?.username } },
    };
    controlGroup.add(newConnection);
    conn.on("data", (data) => {
      console.log(conn.peer, "sent data:", data);
      handleDataEvents(newConnection, data as DataEventType);
    });

    conn.on("open", () => {
      console.log("Connection established", conn.peer);
    });

    conn.on("close", () => {
      console.log("Connection closed", conn.peer);
    });
  };

  const requestConnection = (id: string) => {
    const peer = getPeer();
    const conn = peer.connect(id, {
      metadata: {
        username: user && user.username,
        actions: [CONNECTION_REQUEST],
      },
    });
    setupConnection(conn, invitationsControl);
  };

  return (
    <PeerContext.Provider
      value={{
        requestConnection,
        partyControl,
        invitationsControl,
        requestsControl,
        getPeer,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}

export const usePeerContext = (): PeerContextType => {
  const context = React.useContext(PeerContext);
  if (!context) {
    throw new Error("usePeerContext must be used within a PeerContextProvider");
  }
  return context;
};

export default PeerContextProvider;
