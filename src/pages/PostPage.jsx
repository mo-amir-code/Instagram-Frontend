import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Header from "../components/postpage/Header";
import Comments from "../components/postpage/Comments";
import Footer from "../components/postpage/Footer";
import {
  postPageStatusToggle,
} from "../redux/features/app/appSlice";
import {
  fetchPostInfoAsync,
} from "../redux/features/app/appAsyncThunk";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../components/loaders/ProfileLoader";

export default function PostPage({ open }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { postPageInfo, postPageInfoStatus } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    if (id && !postPageInfo) {
      dispatch(fetchPostInfoAsync(id));
    }
  }, [open]);

  const handleClose = () => {
    dispatch(postPageStatusToggle());
    navigate(-1);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-bg-primary text-left shadow-xl transition-all w-[1000px] h-[550px] border border-hover-primary">
                <div className="w-full h-full flex items-center justify-center text-text-primary">
                  {/* post image/video */}
                  {postPageInfoStatus ? (
                    <>
                      <div className="w-[45%] border-r border-hover-primary h-full flex items-center justify-center">
                        <img
                          src={postPageInfo.file}
                          alt={postPageInfo.description}
                          className="object-cover h-full"
                        />
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
