import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResultsAsync } from "../../redux/features/app/appAsyncThunk";
import Chat from "../../components/message/Chat";
import HomePostsLoader from "../../components/loaders/HomePostsLoader";
import { socket } from "../../socket";
import {
  currentConversationStatusUpdate,
  updateCurrentConversation,
} from "../../redux/features/app/appSlice";

export default function NewMessageModal({
  open,
  setOpen,
  selected,
  setSelected,
}) {
  const [inputText, setInputText] = useState("");
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { searchResults, searchStatus } = useSelector((state) => state.app);
  const { loggedInUserId } = useSelector((state) => state.auth);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      fetchSearchResultsAsync({ searching: inputText, user: loggedInUserId })
    );
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleStartChat = ({ userId }) => {
    dispatch(currentConversationStatusUpdate("pending"));
    socket.emit("start-conversation", { userId, loggedInUserId }, (cbData) => {
      if (cbData.status === "success") {
        dispatch(updateCurrentConversation(cbData));
      } else {
        dispatch(currentConversationStatusUpdate("error"));
      }
    });
    setOpen(false);
    setSelected(null);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-hover-primary text-left shadow-xl transition-all w-[600px] h-[400px] border border-hover-primary text-text-primary">
                <div className="flex flex-col h-full pb-4">
                  <h4 className="text-base font-bold  text-center py-4 border-b border-text-secondary">
                    New Message
                  </h4>
                  <div className="flex items-center p-2 border-b border-text-secondary space-x-4">
                    <span className="text-base font-semibold">To:</span>
                    <input
                      type="text"
                      value={inputText}
                      onChange={handleInputChange}
                      placeholder="Search..."
                      className="bg-transparent outline-none text-sm"
                    />
                  </div>
                  {/* Searched results */}
                  <div className="flex-grow pt-4 overflow-auto">
                    {searchStatus === "pending" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <HomePostsLoader />
                      </div>
                    ) : (
                      searchResults.map((el, idx) => (
                        <Chat key={idx} {...el} handleClick={handleStartChat} />
                      ))
                    )}
                  </div>
                  {/* End Searched results */}
                  <div className="px-4">
                    <button
                      disabled={!selected}
                      className={`w-full py-3 bg-text-link rounded-lg ${
                        !selected && "opacity-[0.4]"
                      } font-medium`}
                    >
                      Chat
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
