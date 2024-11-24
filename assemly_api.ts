const { AssemblyAI } = require("assemblyai");

const client = new AssemblyAI({
  apiKey: process.env.API_KEY,
});

const run = async (audioFile) => {
  const params = {
    audio: audioFile,
    speaker_labels: true,
    sentiment_analysis: true,
    summarization: true,
    summary_model: "catchy",
    summary_type: "headline",
  };
  try {
    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === "error") {
      console.error(`Transcription failed: ${transcript.error}`);
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    return transcript;
  } catch (error) {
    throw error;
  }
};
module.exports = { assemblyai: run };
