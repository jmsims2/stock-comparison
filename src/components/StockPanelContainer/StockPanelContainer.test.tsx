import StockPanelContainer from "./StockPanelContainer";
jest.mock("../../services/ApiService.ts");
import { fetchStockData } from "../../services/ApiService";
import {
    render,
    screen,
    waitForElementToBeRemoved,
    fireEvent,
} from "@testing-library/react";

describe("StockPanelContainer Tests", () => {
    test("Stock Panel Container fetches data and displays Stock Panel and Line Chart", async () => {
        fetchStockData
            .mockImplementationOnce(() => ({
                "Global Quote": {
                    "01. symbol": "IBM",
                    "02. open": "120.2200",
                    "03. high": "121.3000",
                    "04. low": "118.9000",
                    "05. price": "119.1100",
                    "06. volume": "11723057",
                    "07. latest trading day": "2021-01-29",
                    "08. previous close": "120.0800",
                    "09. change": "-0.9700",
                    "10. change percent": "-0.8078%",
                },
            }))
            .mockImplementationOnce(() => ({
                annualEarnings: [
                    {
                        fiscalDateEnding: "2020-12-31",
                        reportedEPS: "8.67",
                    },
                    {
                        fiscalDateEnding: "2019-12-31",
                        reportedEPS: "12.81",
                    },
                    {
                        fiscalDateEnding: "2018-12-31",
                        reportedEPS: "13.82",
                    },
                    {
                        fiscalDateEnding: "2017-12-31",
                        reportedEPS: "13.83",
                    },
                    {
                        fiscalDateEnding: "2016-12-31",
                        reportedEPS: "13.6",
                    },
                ],
            }));

        const remove = jest.fn();
        const { container } = render(
            <StockPanelContainer
                stock={{ name: "IBM", symbol: "IBM" }}
                key="IBM"
                remove={remove}
            />
        );
        await waitForElementToBeRemoved(() =>
            container.querySelector("svg > circle")
        );
        let icon = container.querySelector(
            'svg[data-icon="symbol-triangle-down"]'
        );
        let price = screen.getByText("119.1100");
        let high = screen.getByText("121.3000");
        let low = screen.getByText("118.9000");
        let lineChartContainer = container.querySelector(
            "object.resize-sensor"
        );

        //triangle down icon exists
        expect(icon).not.toBeTruthy();
        //price, high price and low price are all rendered
        expect(price).toBeTruthy();
        expect(high).toBeTruthy();
        expect(low).toBeTruthy();
        expect(lineChartContainer).toBeTruthy();

        //fire function on remove button click
        fireEvent.click(screen.getByRole("button"));
        expect(remove).toHaveBeenCalled();
    });
    test("Stock Panel Container fetches data and displays Stock Panel and a message when Earnings doesn't exist", async () => {
        fetchStockData
            .mockImplementationOnce(() => ({
                "Global Quote": {
                    "01. symbol": "IBM",
                    "02. open": "120.2200",
                    "03. high": "121.3000",
                    "04. low": "118.9000",
                    "05. price": "119.1100",
                    "06. volume": "11723057",
                    "07. latest trading day": "2021-01-29",
                    "08. previous close": "120.0800",
                    "09. change": "-0.9700",
                    "10. change percent": "-0.8078%",
                },
            }))
            .mockImplementationOnce(() => {
                return { attributeImNotInterestedin: {} };
            });

        const remove = jest.fn();
        const { container } = render(
            <StockPanelContainer
                stock={{ name: "IBM", symbol: "IBM" }}
                key="IBM"
                remove={remove}
            />
        );
        await waitForElementToBeRemoved(() =>
            container.querySelector("svg > circle")
        );
        let icon = container.querySelector(
            'svg[data-icon="symbol-triangle-down"]'
        );
        let price = screen.getByText("119.1100");
        let high = screen.getByText("121.3000");
        let low = screen.getByText("118.9000");
        let noAnnualEarningsMessage = screen.getByText(
            "No Annual Earnings Data Found."
        );
        let lineChartContainer = container.querySelector(
            "object.resize-sensor"
        );

        //triangle down icon exists
        expect(icon).toBeTruthy();
        //price, high price and low price are all rendered
        expect(price).toBeTruthy();
        expect(high).toBeTruthy();
        expect(low).toBeTruthy();
        expect(noAnnualEarningsMessage).toBeTruthy();
        expect(lineChartContainer).toBeFalsy();

        //fire function on remove button click
        fireEvent.click(screen.getByRole("button"));
        expect(remove).toHaveBeenCalled();
    });
});
