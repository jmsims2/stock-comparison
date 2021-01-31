import React from "react";
import { Pane } from "evergreen-ui";
import ResponsiveXYFrame from "semiotic/lib/ResponsiveXYFrame";
import "./LineChart.css";

export default function LineChart(props: any) {
    console.log("LINE CHART PROPS", props);
    return (
        <Pane display="flex" flex={1}>
            <ResponsiveXYFrame
                lines={props.lineData}
                responsiveWidth={true}
                responsiveHeight={true}
                margin={{ top: 60, bottom: 30, left: 25, right: 15 }}
                /*@ts-ignore */
                xAccessor="year"
                yAccessor="yAxis"
                yExtent={[0]}
                lineStyle={{ stroke: "#3cc3b2", strokeWidth: 2, fill: "none" }}
                title={
                    <text
                        textAnchor="middle"
                        fill="#234361;"
                        fontFamily={`"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`}
                    >
                        {props.title}
                    </text>
                }
                hoverAnnotation={true}
                tooltipContent={(d: any) => (
                    <div style={{ paddingTop: 10 }}>{d.yAxis}</div>
                )}
                showLinePoints={false}
                showSummaryPoints={false}
                axes={[
                    {
                        orient: "left",
                        className: "axis-color",
                    },
                    {
                        orient: "bottom",
                        className: "axis-color",
                        tickValues: props.lineData.map((d: any) => d.year),
                    },
                ]}
            />
        </Pane>
    );
}
