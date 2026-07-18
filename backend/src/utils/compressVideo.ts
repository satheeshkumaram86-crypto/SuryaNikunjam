import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";

ffmpeg.setFfmpegPath(ffmpegPath as string);
ffmpeg.setFfprobePath(ffprobe.path);
import { getVideoDuration } from "./getVideoDuration";

ffmpeg.setFfmpegPath(ffmpegPath as string);

const TARGET_SIZE_MB = 95;
const AUDIO_BITRATE = 128; // kbps
const MAX_VIDEO_BITRATE = 5000; // kbps
const MIN_VIDEO_BITRATE = 500; // kbps

export const compressVideo = async (
  inputPath: string,
  outputPath: string
): Promise<string> => {
  const duration = await getVideoDuration(inputPath);

  if (!duration || duration <= 0) {
    throw new Error("Unable to determine video duration.");
  }

  // Calculate bitrate required for target size
  const targetSizeBits = TARGET_SIZE_MB * 1024 * 1024 * 8;

  let videoBitrate = Math.floor(
    targetSizeBits / duration / 1000 - AUDIO_BITRATE
  );

  // Keep bitrate within reasonable limits
  videoBitrate = Math.max(
    MIN_VIDEO_BITRATE,
    Math.min(videoBitrate, MAX_VIDEO_BITRATE)
  );

  console.log("----------------------------------------");
  console.log("Video Duration :", duration.toFixed(2), "sec");
  console.log("Target Size    :", TARGET_SIZE_MB, "MB");
  console.log("Video Bitrate  :", videoBitrate, "kbps");
  console.log("----------------------------------------");

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .videoBitrate(videoBitrate)
      .audioBitrate(AUDIO_BITRATE)
      .outputOptions([
        "-preset medium",
        "-movflags +faststart",
      ])

      // Only reduce videos larger than 1080p
      .videoFilters(
        "scale='min(1920,iw)':-2"
      )

      .on("start", (commandLine) => {
        console.log("FFmpeg Started");
        console.log(commandLine);
      })

      .on("progress", (progress) => {
        if (progress.percent) {
          /*console.log(
            `Compression: ${progress.percent.toFixed(2)}%`
          );*/
        }
      })

      .on("end", () => {
        console.log("Video compression completed.");
        resolve(outputPath);
      })

      .on("error", (err) => {
        console.error("Compression Error:", err);
        reject(err);
      })

      .save(outputPath);
  });
};