import React, { Fragment, FC, useCallback, useRef, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { SKIP_COUNT_WIDTH, RUNNING_BAR_MIN_WIDTH, MILLISECONDS } from "../constants/constants";
import "../styles/progress-bar.scss";

let width = 1;
let frame: ReturnType<typeof setInterval>;
let frameSecs: ReturnType<typeof setInterval>;
const ProgressBar: FC<{ answerCount: number }> = ({ answerCount }) => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const progressBarElement = useRef<HTMLDivElement>(null);
  const [audioState, setAudioState] = useState<boolean>(false);
  const [secState, setSecState] = useState<number>(0);
  const skipWidth = SKIP_COUNT_WIDTH[answerCount];
  const minRunningBar = RUNNING_BAR_MIN_WIDTH[answerCount];

  const frameRunningProgressBar = useCallback(() => {
    const progressBarStyle = progressBarElement.current?.style;
    let progressBarWidth = Number(progressBarStyle?.width.replace("%", ""));
    if (progressBarWidth >= 100) {
      audioElement.current?.pause();
      progressBarStyle?.setProperty("width", `${minRunningBar}%`);
      width = 1;
      setSecState(0);
      setAudioState(false);
      clearInterval(frame);
      clearInterval(frameSecs);
    } else {
      width++;
      progressBarStyle?.setProperty("width", `${width * minRunningBar}%`);
    }
  }, [minRunningBar]);

  const framePerSec = useCallback(() => {
    setSecState((prevState) => prevState + 1);
  }, []);

  const playMusic = useCallback(() => {
    if (!audioState) {
      audioElement.current?.play();
      framePerSec();
      frame = setInterval(frameRunningProgressBar, MILLISECONDS[answerCount]);
      frameSecs = setInterval(framePerSec, 1000);
    } else {
      audioElement.current?.pause();
      progressBarElement.current?.style.setProperty("width", `${minRunningBar}%`);
      width = 1;
      setSecState(0);
      clearInterval(frame);
      clearInterval(frameSecs);
    }
    setAudioState((prevState) => !prevState);
  }, [audioState, answerCount, framePerSec, frameRunningProgressBar, minRunningBar]);

  return (
    <Fragment>
      <div style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
        <div style={{ maxWidth: "640px", left: 0, right: 0, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              width: "6.25%",
              height: "20px",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              position: "absolute",
              zIndex: 1,
            }}
          />
          <div
            style={{ width: "12.5%", height: "20px", borderRight: "1px solid black", position: "absolute", zIndex: 1 }}
          />
          <div
            style={{ width: "25%", height: "20px", borderRight: "1px solid black", position: "absolute", zIndex: 1 }}
          />
          <div
            style={{ width: "43.75%", height: "20px", borderRight: "1px solid black", position: "absolute", zIndex: 1 }}
          />
          <div
            style={{ width: "68.75%", height: "20px", borderRight: "1px solid black", position: "absolute", zIndex: 1 }}
          />
          <div
            style={{ width: "100%", height: "20px", borderRight: "1px solid black", position: "absolute", zIndex: 1 }}
          />
        </div>
        <div style={{ maxWidth: "640px", margin: "0 auto", left: 0, right: 0 }}>
          <div
            style={{
              width: `${skipWidth}%`,
              height: "20px",
              backgroundColor: "#666",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{ backgroundColor: "#e173d3", width: `${minRunningBar}%`, height: "20px", position: "absolute" }}
              ref={progressBarElement}
            />
          </div>
        </div>
      </div>
      <audio src="https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3" ref={audioElement} title="test" />
      <div
        style={{
          maxWidth: "640px",
          left: 0,
          right: 0,
          margin: "0 auto",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ margin: "0 auto 0 0" }}>0:{secState.toString().padStart(2, "0")}</div>
          <div style={{ margin: "0 auto 0 0" }}>
            <button
              onClick={playMusic}
              type="button"
              style={{
                background: "none",
                color: "black",
                border: "none",
              }}
            >
              <AiOutlinePlayCircle size={60} />
            </button>
          </div>
          <div>0:16</div>
        </div>
      </div>
    </Fragment>
  );
};
ProgressBar.displayName = "ProgressBar";
export default ProgressBar;
