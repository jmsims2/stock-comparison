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
    //uncomment if hitting api limits
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve([
    //               {
    //                 "value": "GS",
    //                 "label": "GS - Goldman Sachs Group Inc",
    //                 "symbol": "GS",
    //                 "name": "Goldman Sachs Group Inc",
    //               },
    //               {
    //                 "value": "GSAC",
    //                 "label": "GSAC - Gelstat Corp",
    //                 "symbol": "GSAC",
    //                 "name": "Gelstat Corp",
    //               },
    //               {
    //                 "value": "GS7.FRK",
    //                 "label": "GS7.FRK - GlaxoSmithKline plc",
    //                 "symbol": "GS7.FRK",
    //                 "name": "GlaxoSmithKline plc",
    //               },
    //               {
    //                 "value": "GSAAX",
    //                 "label": "GSAAX - GOLDMAN SACHS MUNICIPAL INCOME COMPLETION FUND SEPARATE ACCOUNT INSTITUTIONAL SHARES",
    //                 "symbol": "GSAAX",
    //                 "name": "GOLDMAN SACHS MUNICIPAL INCOME COMPLETION FUND SEPARATE ACCOUNT INSTITUTIONAL SHARES",
    //               },
    //               {
    //                 "value": "GSACX",
    //                 "label": "GSACX - GOLDMAN SACHS CHINA EQUITY FUND CLASS C",
    //                 "symbol": "GSACX",
    //                 "name": "GOLDMAN SACHS CHINA EQUITY FUND CLASS C",
    //               },
    //               {
    //                 "value": "GSADX",
    //                 "label": "GSADX - Goldman Sachs Small Cap Growth Fund",
    //                 "symbol": "GSADX",
    //                 "name": "Goldman Sachs Small Cap Growth Fund",
    //               },
    //               {
    //                 "value": "GS2C.FRK",
    //                 "label": "GS2C.FRK - GameStop Corp",
    //                 "symbol": "GS2C.FRK",
    //                 "name": "GameStop Corp",
    //               },
    //               {
    //                 "value": "GS51.FRK",
    //                 "label": "GS51.FRK - Golden Star Resources Ltd",
    //                 "symbol": "GS51.FRK",
    //                 "name": "Golden Star Resources Ltd",
    //               }
    //             ])
    //     }, 500)
    // })
    
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