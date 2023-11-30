import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Header from "../components/postpage/Header";
import Comments from "../components/postpage/Comments";
import Footer from "../components/postpage/Footer";
import { postPageStatusToggle } from "../redux/features/app/appSlice";
import { fetchPostInfoAsync } from "../redux/features/app/appAsyncThunk";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../components/loaders/ProfileLoader";
import { Play, SpeakerHigh, SpeakerSimpleSlash } from "@phosphor-icons/react";
import { useState } from "react";

export default function PostPage({ open }) {
  const cancelButtonRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isPlay, setIsPlay] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { postPageInfo, postPageInfoStatus } = useSelector(
    (state) => state.app
  );
  const videoRef = useRef();

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    if (id && !postPageInfo && open) {
      dispatch(fetchPostInfoAsync(id));
    }
    setIsPlay(null);
    setMuted(null);
  }, [open]);

  const handleClose = () => {
    dispatch(postPageStatusToggle());
    navigate(-1);
  };

  const handleMute = () => {
    if (videoRef.current) {
      if (muted) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
      setMuted(!muted);
    }
  };

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlay(!isPlay);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-bg-primary/10 backdrop-blur-sm bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-bg-primary text-left shadow-xl transition-all w-[85vw] h-[95vh] border border-hover-primary">
                <div className="w-full h-full flex items-center justify-center text-text-primary">
                  {/* post image/video */}
                  {postPageInfoStatus ? (
                    <>
                      <div className="w-[45%] border-r border-hover-primary h-full flex items-center justify-center">
                        {postPageInfo.type === "post" ? (
                          <img
                            src={postPageInfo.file}
                            alt={postPageInfo.description}
                            className="object-cover h-full"
                          />
                        ) : (
                          <div className="relative">
                            <video
                              ref={videoRef}
                              onClick={() => handlePlayToggle()}
                              className="object-cover w-[300px] h-[534px]"
                              autoPlay
                              loop
                            >
                              <source src={postPageInfo.file} />
                            </video>
                            <div
                              onClick={() => handleMute()}
                              className="absolute left-2 bottom-2 w-[40px] h-[40px] rounded-full bg-modal-bg flex items-center justify-center text-text-primary cursor-pointer"
                            >
                              {muted ? (
                                <SpeakerSimpleSlash size={15} />
                              ) : (
                                <SpeakerHigh size={15} />
                              )}
                            </div>
                            <div
                              onClick={() => handlePlayToggle()}
                              className={`absolute ${
                                isPlay === null && "hidden"
                              }  ${!isPlay && "playBgIn"} ${
                                isPlay && "playBgOut"
                              } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary/60 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer`}
                            >
                              <Play
                                size={40}
                                className={`${
                                  isPlay === null && "opacity-0"
                                }  ${!isPlay && "playIn"} ${
                                  isPlay && "playOut"
                                } `}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-[55%] flex flex-col h-full">
                        <Header user={postPageInfo.user} />
                        <Comments
                          description={postPageInfo.description}
                          user={postPageInfo.user}
                          comments={postPageInfo.comments}
                        />
                        <Footer
                          likes={postPageInfo.likes.length}
                          time={postPageInfo.createdAt}
                        />
                      </div>
                    </>
                  ) : (
                    <ProfileLoader />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
