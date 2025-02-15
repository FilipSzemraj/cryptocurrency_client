import {CryptocurrencyUpdateAll} from "../dto/interface.ts";
import styles from "../../styles/CryptoUpdateAllComponent.module.scss";
import React from "react";
import { FilterType, useHeadersMap} from "../../utils/headersMap.ts";


interface CryptoUpdateAllComponentProps{
    data: CryptocurrencyUpdateAll[];
    filters: FilterType;
}

const CryptoUpdateAllComponent: React.FC<CryptoUpdateAllComponentProps> = ({ data, filters }) => {
    const HEADERS_MAP = useHeadersMap();
    const headers = HEADERS_MAP[filters];

    const columnStyle = {
        gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
    };

    return (
        <div className={styles.gridTable}>
            <h3>Filtr: {filters}</h3>

            <div className={styles.gridHeader} style={columnStyle}>
                {headers.map((h, idx) => (
                    <div key={idx} className={styles.gridHeaderCell}>
                        {h.label}
                    </div>
                ))}
            </div>

            <div className={styles.gridBody}>
                {data.map((item, rowIndex) => (
                    <div key={rowIndex} className={styles.gridRow} style={columnStyle}>
                        {headers.map((h, colIndex) => {
                            const value = item[h.key];
                            if (h.key === "TS" && typeof value === "number") {
                                return (
                                    <div key={colIndex} className={styles.gridCell}>
                                        {new Date(value * 1000).toLocaleString()}
                                    </div>
                                );
                            }
                            if (typeof value === "number") {
                                return (
                                    <div key={colIndex} className={styles.gridCell}>
                                        {value.toFixed(6)}
                                    </div>
                                );
                            }
                            return (
                                <div key={colIndex} className={styles.gridCell}>
                                    {value || "-"}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoUpdateAllComponent;
