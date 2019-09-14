import * as React from 'react';
import styled from 'styled-components';
// I had doubts if I want to take moment for small test task
// for some reason my ts config ignores that moment is installed
// @ts-ignore
import moment from 'moment';

const Wrapper = styled.div`
  max-height: 360px;
  overflow: auto;
  margin-left: 4px;
`;

const Flex = styled.div`
  display: flex;
  cursor: pointer;
  &:hover {
    opacity: 0.9
  }
`;

const SliderText = styled.div`
 display: flex;
 padding: 4px;
 justify-content: space-around;
 flex-direction: column;
 border-bottom: 1px solid #dcdcdc
`;

export interface HistoryItem {
  title: string
  time: number
  date: number
  image: string
}

export const HistoryList: React.SFC<Readonly<{
  data: HistoryItem[];
  onTitleClicked: (title: string) => void;
}>> = React.memo(({ data, onTitleClicked }) => <Wrapper>
  {data.map(({ title, time, date, image }) => (
    <Flex key={title} onClick={() => onTitleClicked(title)}>
      <br />
      <img src={image} alt={title} height={100} width={60} />

      <SliderText>
        <div>{moment(date).fromNow()}:</div>
        <div><b>"{title}"</b></div>
        <div>watched {moment.utc(time * 1000).format(time > 60 * 60 ? 'HH:mm:ss' : 'mm:ss')}</div>
      </SliderText>
    </Flex>
  ))}
</Wrapper>);
