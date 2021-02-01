import LineChart from "./LineChart";
import { render, screen } from "@testing-library/react";

describe("Line Chart Tests", () => {
    test("should render a line chart", () => {
        const { container } = render(
            <div style={{ height: "500px", width: "500px" }}>
                <LineChart
                    lineData={[
                        { year: "2020", eps: 5 },
                        { year: "2019", eps: 4 },
                        { year: "2018", eps: 3 },
                        { year: "2017", eps: 2 },
                        { year: "2016", eps: 1 },
                    ]}
                    xProperty="year"
                    yProperty="eps"
                    title="EPS by Year"
                    // Must set responsive width/height to false so will render in the test
                    responsiveHeight={false}
                    responsiveWidth={false}
                />
            </div>
        );
        //all the line labels will have this text in their aria-label attribute
        let lineLabels = screen.findByLabelText(/point line starting/i);
        expect(lineLabels).toBeTruthy();
        let title = screen.getByText("EPS by Year");
        expect(title).toBeInTheDocument();
    });
});
