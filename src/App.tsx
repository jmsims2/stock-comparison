import React, { useState } from "react";
import { Pane } from "evergreen-ui";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import StockPanelContainer from "./components/StockPanelContainer/StockPanelContainer";

interface Stock {
    symbol: string;
    name: string;
}

function App() {
    const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);

    const selectStock = (value: any) => {
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
        <Pane display="flex" flexDirection="column" style={{ height: "100vh" }}>
            <Header />
            <Search handleChange={selectStock} />
            <Pane
                display="flex"
                flexGrow={1}
                style={{
                    flexWrap: "wrap",
                    flexDirection: "row-reverse",
                    justifyContent: "flex-end",
                }}
            >
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
