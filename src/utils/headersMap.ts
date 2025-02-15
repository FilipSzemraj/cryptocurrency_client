import { CryptocurrencyUpdateAll } from "../component/dto/interface";
import {useMemo} from "react";

export type FilterType = "FULL" | "QF" | "PQFT" | "MFTQPT";

interface HeaderConfig {
    key: keyof CryptocurrencyUpdateAll;
    label: string;
}

export const useHeadersMap = () => useMemo(() => ({
    QF: [
        { key: "FSYM", label: "Symbol bazowy" },
        { key: "Q", label: "Ilość" },
    ],
    PQFT: [
        { key: "FSYM", label: "Symbol bazowy" },
        { key: "TSYM", label: "Symbol kwotowany" },
        { key: "P", label: "Cena" },
        { key: "Q", label: "Ilość" },
        { key: "TOTAL", label: "Łączna wartość" },
    ],
    MFTQPT: [
        { key: "M", label: "Giełda" },
        { key: "FSYM", label: "Symbol bazowy" },
        { key: "TSYM", label: "Symbol kwotowany" },
        { key: "P", label: "Cena" },
        { key: "Q", label: "Ilość" },
        { key: "TOTAL", label: "Łączna wartość" },
        { key: "TS", label: "Timestamp" },
    ],
    FULL: [
        { key: "M", label: "Giełda" },
        { key: "FSYM", label: "Symbol bazowy" },
        { key: "TSYM", label: "Symbol kwotowany" },
        { key: "P", label: "Cena" },
        { key: "Q", label: "Ilość" },
        { key: "TOTAL", label: "Łączna wartość" },
        { key: "TS", label: "Timestamp" },
    ],
}), []);