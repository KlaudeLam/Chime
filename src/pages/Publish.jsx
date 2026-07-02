import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  trackAudioPath,
  trackThumbnailPath,
  uploadTrackAudio,
  uploadTrackThumbnail,
  getPublicAudioUrl,
  getPublicThumbnailUrl,
  createTrack,
} from '../api/tracks';

export function Publish() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [trackFile, setTrackFile] = useState(null);
  const [publishing, setPublishing] = useState(false);

  function handleThumbnailChange(e) {
    const file = e.target.files[0];
    setThumbnailFile(file);
    setThumbnailPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handlePublish() {
    if (!thumbnailFile || !trackFile || !title || !description) {
      alert('Please fill in all fields and choose both files.');
      return;
    }

    setPublishing(true);
    try {
      const trackId = crypto.randomUUID();
      const audioPath = trackAudioPath(user.id, trackId);
      const thumbnailPath = trackThumbnailPath(user.id, trackId);

      await uploadTrackAudio(audioPath, trackFile);
      await uploadTrackThumbnail(thumbnailPath, thumbnailFile);

      await createTrack({
        id: trackId,
        artist_id: user.id,
        title,
        description,
        audio_url: getPublicAudioUrl(audioPath),
        thumbnail_url: getPublicThumbnailUrl(thumbnailPath),
      });

      alert('Publish new work successfully.');
      navigate('/library');
    } catch (err) {
      alert(`Error publishing track: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div id="page-body" className="mb-20 flex flex-col gap-[24px] px-[30px] py-[30px]">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">Publish New Track</div>
      <div className="editor mx-auto w-[440px] md:w-[550px] lg:w-[800px] flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-lg">
        <div className="flex justify-between w-full h-fit mb-4">
          <div className="w-40 aspect-square max-h-40 bg-gray-50 border-dashed border-2 border-gray-400 rounded-lg flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden">
            {thumbnailPreview ? (
              <img src={thumbnailPreview} alt="" className="w-full h-full object-cover" />
            ) : (
              <div>
                <input id="input-thumbnail" type="file" className="hidden" accept=".jpg" onChange={handleThumbnailChange} required />
                <label htmlFor="input-thumbnail" className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-700 mx-auto mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <h5 className="mb-1 first-line:font-bold tracking-tight text-gray-700 text-center">Thumbnail</h5>
                  <p className="font-normal text-xs text-gray-400 md:px-6"><b className="text-gray-600">Only JPG format</b></p>
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 w-[58%] md:w-[67%] lg:w-[73%]">
            <input
              className="bg-white border border-gray-300 p-2 outline-none rounded-[4px]"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="bg-white min-h-[66px] p-2 border border-gray-300 outline-none rounded-[4px] overflow-hidden resize-none"
              placeholder="Describe your track"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-white focus:outline-none file:mr-5 file:border-0 file:text-sm file:font-medium rounded-[4px] file:bg-lightbittersweet file:text-black hover:file:cursor-pointer hover:file:bg-bittersweet hover:file:text-white"
              type="file"
              accept=".mp3"
              onChange={(e) => setTrackFile(e.target.files[0])}
              required
            />
            <label className="text-xs">Upload your track above (.mp3)</label>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <button
            onClick={handlePublish}
            disabled={publishing}
            type="button"
            className="w-fit right-0 bg-bittersweet text-white hover:bg-[#ff3f5f] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            {publishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
