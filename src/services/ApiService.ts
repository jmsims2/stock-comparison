const BASE_URL = "https://www.alphavantage.co";
const API_KEY = "9V72LTIQYE8DM1FI";

export interface KeywordResult {
    value: string;
    label: string;
    symbol: string;
    name: string;
}

export interface SearchResponse {
    "1. symbol": string;
    "2. name": string;
}

export interface QuoteResponse {
    "Global Quote": {
        "03. high": string;
        "04. low": string;
        "05. price": string;
        "10. change percent": string;
    };
}

export interface EarningsResponse {
    "annualEarnings": {fiscalDateEnding: string, reportedEPS: string}[];
}

export interface StockData {
    name: string;
    changePercent: string | undefined;
    price: string | undefined;
    high: string | undefined;
    low: string | undefined;
    symbol: string;
    annualEarnings: Earnings[] | undefined;  
}

export interface Earnings {
    year: string;
    eps: number
}

export const fetchStockData = (command: string, data: string) => {
    return fetch(`${BASE_URL}/query?function=${command}&symbol=${data}&apikey=${API_KEY}`).then(res => res.json())
}

export const fetchByKeyword = (inputValue: string): Promise<KeywordResult[]> => {
    return fetch(`${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${inputValue.toUpperCase()}&apikey=${API_KEY}`).then(res => res.json()).then((res: {bestMatches: SearchResponse[]}) => {
        if(!res.hasOwnProperty("bestMatches")) throw new Error("API Error.");
        return res.bestMatches.map((match: SearchResponse) => {
            return {
                name: match["2. name"],
                symbol: match["1. symbol"],
                label: `${match["1. symbol"]} - ${match["2. name"]}`,
                value: match["1. symbol"]
            }
        })
    }).catch((error) => {
        throw new Error(error);
    })
}

export const fetchQuote = (symbol: string) => {
    return fetch(`${BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`).then(res => res.json())
}