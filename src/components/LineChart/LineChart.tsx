import React from "react";
import { Pane } from "evergreen-ui";
import ResponsiveXYFrame from "semiotic/lib/ResponsiveXYFrame";
import "./LineChart.css";

const lineChartMargin = { top: 60, bottom: 30, left: 25, right: 15 };
const lineStyle = { stroke: "#3cc3b2", strokeWidth: 2, fill: "none" };

interface LineChartProps {
    lineData: object[];
    xProperty: string;
    yProperty: string;
    title: string;
    responsiveWidth?: boolean;
    responsiveHeight?: boolean;
}

export default function LineChart(props: LineChartProps) {
    return (
        <Pane display="flex" flex={1}>
            <ResponsiveXYFrame
                lines={props.lineData}
                responsiveWidth={true}
                responsiveHeight={true}
                margin={lineChartMargin}
                /*@ts-ignore */
                xAccessor={props.xProperty}
                yAccessor={props.yProperty}
                yExtent={[0]}
                lineStyle={lineStyle}
                title={
                    <text textAnchor="middle" className="chart-title">
                        {props.title}
                    </text>
                }
                hoverAnnotation={true}
                tooltipContent={(d: any) => (
                    <div className="tooltip-style">{d[props.yProperty]}</div>
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
                        tickValues: props.lineData.map(
                            (d: any) => d[props.xProperty]
                        ),
                    },
                ]}
            />
        </Pane>
    );
}
