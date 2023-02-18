import {React} from "react";

const VideoInput = () => {
  return (
    <div className="VideoInput">
    <form className="vidForm">
      <h1>Upload <span className="red">Video</span></h1>
      <label>
        <p>Title</p>
        <input className="vidText" type="text" name="name" />
      </label>
      <label>
        <p>Charges</p>
        <input className="vidText" type="number" name="charge" />
      </label>
      <br /><br />
        <input className="file-upload" type="file"/>
        <br /><br />
        <input className="vidBtn" type="submit" value="Upload" />
    </form>
    </div>
  );
}

export default VideoInput;
