import * as React from 'react';
import styled from 'styled-components';
import { IpadCarousel, Slide } from './IpadCarousel';
// @ts-ignore
import { entries } from './fallback-carousel-data.json';
import { VideoPlayer } from './VideoPlayer';
// yes, I know about tree shaking
import { throttle, uniqBy } from 'lodash-es';
import { prepareForHash, readFromHash } from './hash.utils';
import { HistoryItem, HistoryList } from './HistoryList';
import { readFromMemory, saveToMemory } from './memory.utils';

const Header = styled.header`
  margin: 0;
  margin-bottom: 16px;
  padding: 16px;
  background: #d8d8d8;
  font-family: sans-serif;
  
  & h2 {
    margin: 0;
    padding: 0;
    color: white
  }
`;

const VideoWrapper = styled.div`
 max-width: 640px;
 min-width: 640px;
 background: black;
 height: 360px;
`;

const VideoSection = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  margin: auto;
`;

const { time, selectedTitle } = readFromHash(location.hash);

function rememberNewItemAndGiveNewMemory(time: number, title: string, data: Slide[], memory: HistoryItem[]) {
  const idx = Math.max(data.findIndex(({ title: t }) => t === title), 0);
  const slide = data[idx] as Slide;
  const url = slide!.images[0].url;

  // I think movies have unique title
  return uniqBy([{ title: slide.title, image: url, time, date: Date.now() }, ...memory], 'title');
}

export class App extends React.Component<{}, {
  data: Slide[],
  loaded: boolean,
  selectedTitle: string,
  memory: HistoryItem[],
}> {
  state = {
    selectedTitle,
    memory: [],
    data: [],
    loaded: false
  };

  async componentDidMount() {
    let data: Slide[];

    try {
      // I am skipping paging here, because real carousel is looped, not infinitive
      const CAROUSEL_LIST_URL = 'https://demo2697834.mockable.io/movies';
      data = (await (await fetch(CAROUSEL_LIST_URL)).json()).entries as Slide[];
    } catch (e) {
      // in real prod would be displayed "one of our nodes in microservices is unavailable, try again later" - joke
      data = entries as Slide[];
    }

    this.setState({
      data: data,
      loaded: true,
      memory: rememberNewItemAndGiveNewMemory(time, selectedTitle, data, await readFromMemory())
    });
  }

  render() {
    const state = this.state;
    if (!state.loaded) {
      return <div>Loading carousel...</div>;
    }

    if (!state.data.length) {
      return <div>No data</div>;
    }

    const selectedIdx = Math.max(state.data.findIndex(({ title }) => title === state.selectedTitle), 0);
    const memoryItem = state.memory.find(({ title }) => title === state.selectedTitle);

    return <div>
      <Header>
        {/*lets say - carousel is a boring task, so yes, a bit of humor*/}
        <h2>Only today!</h2>
        <br />
        Take part in competition, 8 movies will increase your changes to
        win one of our new iPads <small>because we care our loyal customers</small>
      </Header>

      <IpadCarousel
        data={state.data}
        // I was thinking to store title or to store index, finally decided to store title
        selectedTitle={state.selectedTitle}
        onChanged={this.onTitleChanged}
      />

      <br />

      <VideoSection>
        <VideoWrapper>
          <VideoPlayer
            // not optimal, but render of parent not happening frequently
            src={(state.data[selectedIdx] as Slide).contents[0].url}
            // this property her only because video url is same in demo data
            selectedTitle={state.selectedTitle}
            time={memoryItem ? memoryItem!.time : 0}
            // may be better not to store url here, in real prod, probably, I will use it from json data
            onTimeChanged={this.onTimeChanged}
          />
        </VideoWrapper>

        <HistoryList data={state.memory} onTitleClicked={this.onTitleChanged} />
      </VideoSection>
    </div>;
  }

  setHash = () => {
    const selectedItem = this.state.memory.find(({ title }) => title === this.state.selectedTitle);
    location.hash = prepareForHash({
      time: selectedItem ? selectedItem!.time : 0,
      selectedTitle: this.state.selectedTitle
    });
    this.throttledSaveToMemory();
  };

  throttledSaveToMemory = throttle(() => {
    // yes, of course we can save particular time for user, i think that "played" time should be stored in localStorage
    // for case if will be "shutDown" or "internetDown" and if not presented - then read from server. And on server
    // make sense to
    saveToMemory(this.state.memory);
  }, 10000); // had doubts about this number, but left long interval

  onTitleChanged = (selectedTitle: string) => {
    const memoized = this.state.memory.find(({ title }) => title === selectedTitle);
    this.setState({
      selectedTitle,
      // agree, looks a bit monstrual
      memory: rememberNewItemAndGiveNewMemory(
        memoized ? memoized!.time : 0,
        selectedTitle,
        this.state.data,
        this.state.memory
      )
    }, this.setHash);
  };

  onTimeChanged = throttle((time: number) => this.setState({
      memory: rememberNewItemAndGiveNewMemory(
        time,
        this.state.memory[0]!.title,
        this.state.data,
        this.state.memory)
    },
    this.setHash), 1000);
}