import React, { useState, useEffect } from 'react';
import { CryptocurrencyUpdateAll } from "../dto/interface.ts";
import CryptoUpdateAllComponent from "../crypto/CryptoUpdateAllComponent.tsx";
import styles from "../../styles/WebSocketFilter.module.scss";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const WebSocketFilter = () => {
    const [frequency, setFrequency] = useState(1);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [data, setData] = useState<CryptocurrencyUpdateAll[]>([]);
    const [filterType, setFilterType] = useState<"FULL" | "QF" | "PQFT" | "MFTQPT">("FULL");
    const [visibleItems, setVisibleItems] = useState(10);


    const wsUrl = 'ws://localhost:8080/ws-endpoint';


    useEffect(() => {
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('Połączono z WebSocketem')
            toast.error("");
            //setErrorMessage("");
        };

        ws.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                //console.log(JSON.stringify(parsedData, null, 2));
                if (parsedData?.type === "ERROR") {
                    toast.error(parsedData.message);
                    //setErrorMessage(parsedData.message || "Wystąpił nieznany błąd");
                } else {
                    setData((prev) => [...(prev || []), parsedData].slice(-visibleItems));
                }
            } catch (error) {
                console.error('Błąd parsowania danych:', error);
                toast.error(error.message);
                //setErrorMessage("Błąd parsowania danych z WebSocket: " + (error as Error).message);
            }
        };

        ws.onerror = (error) => {
            console.error('Błąd WebSocket:', error);
            toast.error("Błąd połączenia z serwerem.");
            //setErrorMessage("Błąd WebSocket – sprawdź konsolę po więcej informacji.");
        };

        ws.onclose = () => {
            console.log('WebSocket został zamknięty');
            toast.error("Utracono połączenie z serwerem.");
            // setErrorMessage("Połączenie z WebSocket zostało zamknięte.");
        };

        setSocket(ws);

        return () => ws.close();
    }, [wsUrl, visibleItems]);

    useEffect(() => {
        setData((prev) => prev.slice(-visibleItems));
    }, [visibleItems]);

    const updatePreferences = (type: "FULL" | "QF" | "PQFT" | "MFTQPT") => {
        setFilterType(type);

        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = { action: 'updatePreferences', filterType: type, frequency };
            socket.send(JSON.stringify(message));

            console.log('Wysłano wiadomość:', message);
        } else {
            console.error('WebSocket nie jest połączony');
            toast.error("Nie można aktualizować filtrów z powodu braku połączenia z serwerem.");
            //setErrorMessage("Nie można wysłać – WebSocket nie jest połączony.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <label htmlFor="frequency">
                    Częstotliwość (1-5):&nbsp;
                    <input
                        id="frequency"
                        type="number"
                        min="1"
                        max="5"
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                        className={styles.selectField}
                    />
                </label>
                <label>
                    Widoczne elementy:&nbsp;
                    <select
                        id="visibleItems"
                    value={visibleItems}
                    onChange={(e) => setVisibleItems(Number(e.target.value))}
                    className={styles.selectField}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </div>

            <div>
                <button onClick={() => updatePreferences("QF")} className={styles.button}>QF</button>
                <button onClick={() => updatePreferences("PQFT")} className={styles.button}>PQFT</button>
                <button onClick={() => updatePreferences("MFTQPT")} className={styles.button}>MFTQPT</button>
                <button onClick={() => updatePreferences("FULL")} className={styles.button}>FULL</button>
            </div>

            {/*{errorMessage && (
                <div className={styles.errorMessage}>
                    <strong>Błąd:</strong> {errorMessage}
                </div>
            )}*/}

            <div className={styles.formWrapper}>
                {data && <CryptoUpdateAllComponent data={data} filters={filterType} />}
            </div>
        </div>
    );
};

export default WebSocketFilter;