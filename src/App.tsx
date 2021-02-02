import React, { useState } from "react";
import { Pane } from "evergreen-ui";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import StockPanelContainer from "./components/StockPanelContainer/StockPanelContainer";
import { KeywordResult } from "./services/ApiService";

interface Stock {
    symbol: string;
    name: string;
}

function App() {
    const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);

    const selectStock = (value: KeywordResult) => {
        let newArray = [...selectedStocks].filter(
            (stock: Stock) => stock.symbol !== value.value
        );
        if (newArray.length === 3) newArray.pop();
        newArray.push({ symbol: value.value, name: value.label });

        setSelectedStocks(newArray);
    };

    const removeStock = (symbol: string) => {
        setSelectedStocks(
            selectedStocks.filter((stock: Stock) => stock.symbol !== symbol)
        );
    };

    return (
        <Pane display="flex" flexDirection="column" className="app-container">
            <Header />
            <Search handleChange={selectStock} />
            <Pane display="flex" flexGrow={1} className="stocks-container">
                {selectedStocks.map((stock: any) => {
                    return (
                        <StockPanelContainer
                            remove={removeStock}
                            key={stock.symbol}
                            stock={stock}
                        />
                    );
                })}
            </Pane>
        </Pane>
    );
}

export default App;
