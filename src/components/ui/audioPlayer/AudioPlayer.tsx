import React, { useState, useEffect, useRef } from "react";

import images from "@/assets/index";

const AudioPlayer = ({ source, durationTime }: { source: string; durationTime: string; }): React.ReactElement => {
  const [audioBlobUrl, setAudioBlobUrl] = useState<string>(source);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const sliderRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }
  }, []);

  useEffect(() => {
    setAudioBlobUrl(source);
  }, [source]);

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      const slider = sliderRef.current;
      const min: any = slider.min;
      const max: any = slider.max;
      const currentVal: any = currentTime;

      slider.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%";
    }
  }, [currentTime]);
  
  if (source === "") {
    return <>{durationTime}</>;
  }

  return (
    <div className="bg-ui-light-gray rounded-[48px] w-full max-w-[352px] flex items-center py-0 px-4 gap-x-2">
      <audio
        ref={audioRef}
        src={audioBlobUrl}
        preload="metadata"
        className="absolute top-[-1000px] left-[-1000px] -z-50 opacity-0"
      />

      <span>
        {Math.floor(currentTime)} / {Math.floor(duration)}
      </span>
      <button onClick={handlePlayPause} disabled={audioBlobUrl === ""}>
        {isPlaying ? (
          <img
            alt="button_pause"
            className="transition-none duration-300"
            src={images.buttons.ButtonPause}
            width={24}
            height={24}
          />
        ) : (
          <img
            alt="button_play"
            className="transition-none duration-300"
            src={images.buttons.ButtonPlay}
            width={24}
            height={24}
          />
        )}
      </button>
      <input
        type="range"
        min="0"
        className="w-full bg-ui-light-blue-primary accent"
        max={duration}
        value={currentTime}
        onChange={handleSliderChange}
        disabled={audioBlobUrl === ""}
        ref={sliderRef}
      />
      <div className="flex flex-1 justify-between">
        {audioBlobUrl !== "" && (
          <a className="download_btn" target="_blank" href={audioBlobUrl}>
            <img
              alt="button_download"
              src={images.buttons.ButtonDownload}
              width={13}
              height={16}
            />
          </a>
        )}
        {/* <button>
          <img
            alt="button_close"
            src={images.buttons.ButtonClose}
            width={14}
            height={14}
          />
        </button> */}
      </div>
    </div>
  );
};

export default AudioPlayer;
