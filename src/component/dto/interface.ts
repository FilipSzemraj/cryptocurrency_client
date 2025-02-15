/*
export interface CryptocurrencyUpdatePQFT {
    p: number | null;  // cena
    q: number | null;  // ilość
    fsym: string | null;   // symbol bazowy
    tsym: string | null;   // symbol kwotowany
    total: number | null;  // łączna wartość
}
export interface CryptocurrencyUpdateQF {
    q: number | null;  // ilość
    fsym: string | null;   // symbol bazowy
}
export interface CryptocurrencyUpdateMFTQPT {
    m: string | null;      // giełda
    fsym: string | null;   // symbol bazowy
    tsym: string | null;   // symbol kwotowany
    q: number | null;      // ilość
    p: number | null;      // cena
    total: number | null;  // łączna wartość
    ts: number | null;     // timestamp transakcji
}
export interface CryptocurrencyUpdate {
    type: string | null;  // będzie "0"
    m: string | null;     // giełda, np. "Coinbase"
    fsym: string | null;  // symbol bazowy, np. "BTC"
    tsym: string | null;  // symbol kwotowany, np. "USD"
    p: number | null;     // cena
    q: number | null;     // ilość
    total: number | null; // łączna wartość
    ts: number | null;    // timestamp transakcji
}
*/
export interface CryptocurrencyUpdateAll {
    TYPE?: string | null;  // "0"
    M?: string | null;     // giełda, np. "Coinbase"
    FSYM?: string | null;  // symbol bazowy, np. "BTC"
    TSYM?: string | null;  // symbol kwotowany, np. "USD"
    P?: number | null;     // cena
    Q?: number | null;     // ilość
    TOTAL?: number | null; // łączna wartość
    TS?: number | null;    // timestamp transakcji
}

