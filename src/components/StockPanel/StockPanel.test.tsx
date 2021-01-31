import StockPanel from "./StockPanel";
import { StockData } from "../../services/ApiService";
import { render, screen } from "@testing-library/react";

const negativeStock: StockData = {
    symbol: "JMS",
    name: "Johnson & Johnson",
    high: "1.00",
    low: "0.90",
    price: "0.95",
    changePercent: "-5.00%",
    annualEarnings: undefined,
};

const positiveStock: StockData = {
    symbol: "JMS",
    name: "Johnson & Johnson",
    high: "1.00",
    low: "0.90",
    price: "0.95",
    changePercent: "5.00%",
    annualEarnings: undefined,
};

const noChangeStock: StockData = {
    symbol: "JMS",
    name: "Johnson & Johnson",
    high: "1.00",
    low: "0.90",
    price: "0.95",
    changePercent: "0.00%",
    annualEarnings: undefined,
};

describe("Stock Panel Tests", () => {
    test("should display a red upside down triangle and red price change text when the change is negative", () => {
        const { container } = render(<StockPanel stock={negativeStock} />);
        let icon = container.querySelector(
            'svg[data-icon="symbol-triangle-down"]'
        );
        let changeText = container.querySelector("span.ub-color_bf0e08");
        //triangle down icon exists
        expect(icon).toBeTruthy();
        //change text has red color class
        expect(changeText).toBeTruthy();
    });
    test("should display a green upside down triangle and green price change text when the change is positive", () => {
        let { container } = render(<StockPanel stock={positiveStock} />);
        let positiveChangeIcon = container.querySelector(
            'svg[data-icon="symbol-triangle-up"]'
        );
        let positiveChangeText = container.querySelector(
            "span.ub-color_00783e"
        );
        //triangle up icon exists
        expect(positiveChangeIcon).toBeTruthy();
        //change text has green color class
        expect(positiveChangeText).toBeTruthy();
    });
    test("should display a green upside down triangle and green price change text when there is no change", () => {
        let { container } = render(<StockPanel stock={noChangeStock} />);
        let noChangeIcon = container.querySelector(
            'svg[data-icon="symbol-triangle-up"]'
        );
        let noChangeText = container.querySelector("span.ub-color_00783e");
        //triangle up icon exists
        expect(noChangeIcon).toBeTruthy();
        //change text has green color class
        expect(noChangeText).toBeTruthy();
    });
});
