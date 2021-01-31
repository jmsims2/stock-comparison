const BASE_URL = "https://www.alphavantage.co";
const API_KEY = "9V72LTIQYE8DM1FI";

export interface KeywordResult {
    value: string;
    label: string;
    symbol: string;
    name: string;
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

export const fetchByKeyword = (inputValue: string) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                  {
                    "value": "GS",
                    "label": "Goldman Sachs Group Inc",
                    "3. type": "Equity",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "1.0000"
                  },
                  {
                    "value": "GSAC",
                    "label": "Gelstat Corp",
                    "3. type": "Equity",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "0.6667"
                  },
                  {
                    "value": "GS7.FRK",
                    "label": "GlaxoSmithKline plc",
                    "3. type": "Equity",
                    "4. region": "Frankfurt",
                    "5. marketOpen": "08:00",
                    "6. marketClose": "20:00",
                    "7. timezone": "UTC+01",
                    "8. currency": "EUR",
                    "9. matchScore": "0.5714"
                  },
                  {
                    "value": "GSAAX",
                    "label": "GOLDMAN SACHS MUNICIPAL INCOME COMPLETION FUND SEPARATE ACCOUNT INSTITUTIONAL SHARES",
                    "3. type": "Mutual Fund",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "0.5714"
                  },
                  {
                    "value": "GSACX",
                    "label": "GOLDMAN SACHS CHINA EQUITY FUND CLASS C",
                    "3. type": "Mutual Fund",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "0.5714"
                  },
                  {
                    "value": "GSADX",
                    "label": "Goldman Sachs Small Cap Growth Fund",
                    "3. type": "Mutual Fund",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "0.5714"
                  },
                  {
                    "value": "GS2C.FRK",
                    "label": "GameStop Corp",
                    "3. type": "Equity",
                    "4. region": "Frankfurt",
                    "5. marketOpen": "08:00",
                    "6. marketClose": "20:00",
                    "7. timezone": "UTC+01",
                    "8. currency": "EUR",
                    "9. matchScore": "0.5000"
                  },
                  {
                    "value": "GS51.FRK",
                    "label": "Golden Star Resources Ltd",
                    "3. type": "Equity",
                    "4. region": "Frankfurt",
                    "5. marketOpen": "08:00",
                    "6. marketClose": "20:00",
                    "7. timezone": "UTC+01",
                    "8. currency": "EUR",
                    "9. matchScore": "0.5000"
                  },
                  {
                    "value": "GS7A.FRK",
                    "label": "GlaxoSmithKline plc",
                    "3. type": "Equity",
                    "4. region": "Frankfurt",
                    "5. marketOpen": "08:00",
                    "6. marketClose": "20:00",
                    "7. timezone": "UTC+01",
                    "8. currency": "EUR",
                    "9. matchScore": "0.5000"
                  },
                  {
                    "value": "GS7.DEX",
                    "label": "GlaxoSmithKline plc",
                    "3. type": "Equity",
                    "4. region": "XETRA",
                    "5. marketOpen": "08:00",
                    "6. marketClose": "20:00",
                    "7. timezone": "UTC+01",
                    "8. currency": "EUR",
                    "9. matchScore": "0.5000"
                  }
                ])
        }, 500)
    })
    
    // return fetch(`${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${inputValue.toUpperCase()}&apikey=${API_KEY}`).then(res => res.json).then(res => {
    //     //do some stuff
    // })
}

export const fetchQuote = (symbol: string) => {
    return fetch(`${BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`).then(res => res.json())
}