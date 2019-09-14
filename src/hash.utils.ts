interface TimeAndSelectedTitle {
  time: number;
  selectedTitle: string;
}

export function readFromHash(hash: string): TimeAndSelectedTitle {
  const [selectedTitle, stringTime = '0:0'] = hash.replace('#', '').split('_t=');
  const [min, sec] = stringTime.split(':');

  return {
    time: Number(min) * 60 + Number(sec),
    selectedTitle: selectedTitle.replace(/_/g, ' ')  // agree, can loose information here, but want readable url
  };
}

export function prepareForHash({ time, selectedTitle }: TimeAndSelectedTitle): string {
  const sec = Math.floor(time);
  const min = Math.floor(sec / 60);

  // youtube have similar approach when you share the time of video to other user
  return `${selectedTitle.replace(/ /g, '_')}_t=${min}:${sec - min * 60}`;
}
