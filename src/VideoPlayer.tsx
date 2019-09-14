import * as React from 'react';

interface VideoProps {
  src: string,
  time?: number,
  onTimeChanged: (time: number) => void,
  selectedTitle?: string
}

// did not used hooks here, need very exact config and don't want to write custom hooks
export class VideoPlayer extends React.Component<VideoProps> {
  videoRef = React.createRef<HTMLVideoElement>();

  componentDidMount() {
    this.videoRef.current!.addEventListener('timeupdate', this.onTimeChanged);
    this.videoRef.current!.src = this.props.src;
    this.videoRef.current!.currentTime = this.props.time || 0;
    // afraid to play video at the beginning
  }

  componentWillUnmount() {
    this.videoRef.current!.removeEventListener('timeupdate', this.onTimeChanged);
    this.onTimeChanged();
  }

  onTimeChanged = () => this.props.onTimeChanged(this.videoRef.current!.currentTime);

  async componentWillReceiveProps(props: VideoProps) {
    if (props.src && (this.props.selectedTitle !== props.selectedTitle || props.src !== this.videoRef.current!.src)) {
      this.videoRef.current!.src = props.src;
      this.videoRef.current!.currentTime = props.time || 0;
      try {
        await this.videoRef.current!.play();
      } catch (e) {
        console.warn('Can not play video', e);
      }
    }
  }

  render() {
    // you will ask - why I decided not to use custom player - my answer (except lazy)
    // I dislike custom players on mobile for example, and internal players, they just work
    // and I can share to my Apple TV for example
    return <video ref={this.videoRef} width={640} height={360} controls muted />;
  }
}