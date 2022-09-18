import { FunctionComponent } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import styled from '@emotion/styled';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';


type HeatmapProps = {
    startDate: Date,
    endDate: Date,
    values: Object[]
}

const HeatmapWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 70vw;
margin: 100px auto 0;

@media (max-width: 768px) {
  width: 100%;
  margin-top: 50px;
  padding: 0 20px;
}
`

const getTooltipDataAttrs = (value) => {
    if (!value || !value.date) {
        return null;
    }
    return {
        'data-tip': `${value.date}`,
    };
}

const Heatmap: FunctionComponent<HeatmapProps> = function ({ startDate, endDate, values }) {
    return (
        <HeatmapWrapper>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={values}
                tooltipDataAttrs={getTooltipDataAttrs}
            />
            <ReactTooltip />
        </HeatmapWrapper>


    )
}

export default Heatmap