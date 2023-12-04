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
import {
  Play,
  SpeakerHigh,
  SpeakerSimpleSlash,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function PostPage({ open }) {
  const cancelButtonRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isPlay, setIsPlay] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { postPageInfo, postPageInfoStatus, width } = useSelector(
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
    dispatch(postPageStatusToggle(false));
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

  const dummyFunction = () => {};

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={width >= 1280 ? handleClose : dummyFunction}
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
              <Dialog.Panel className="relative transform rounded-lg bg-bg-primary text-left shadow-xl transition-all w-[85vw] h-[95vh] max-h-[550px] max-w-[1100px] border border-hover-primary">
                <div className="w-full h-full flex max-sm:flex-col max-sm:max-h-max items-center justify-center text-text-primary overflow-y-auto">
                  {/* post image/video */}
                  {postPageInfoStatus ? (
                    <>
                      <div className="w-[45%] max-sm:w-full border-r border-hover-primary h-auto flex items-center justify-center">
                        {postPageInfo.type === "post" ? (
                          <div className="w-full h-full max-sm:h-[600px] max-2xl:h-full max-[464px]:h-[450px] max-[350px]:h-[350px]">
                            <img
                              src={postPageInfo.file}
                              alt={postPageInfo.description}
                              className="object-cover h-full max-sm:w-full"
                            />
                          </div>
                        ) : (
                          <div className="relative max-sm:pt-64">
                            <video
                              ref={videoRef}
                              onClick={() => handlePlayToggle()}
                              className="object-cover w-[300px] max-sm:w-auto h-[534px]"
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
                      <div className="w-[55%] max-sm:w-full flex flex-col h-full">
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
                <button
                  onClick={() => handleClose()}
                  className="p-1 hidden max-sm:block rounded-full bg-hover-primary text-text-primary absolute top-2 right-2"
                >
                  <X size={12} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
            <button
              onClick={() => handleClose()}
              className="p-1 hidden max-xl:block max-sm:hidden rounded-full bg-hover-primary text-text-primary absolute top-2 right-2"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
