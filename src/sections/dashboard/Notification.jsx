import React, { useEffect, useState } from "react";
import { BellRinging } from "@phosphor-icons/react";
import NtfBody from "../../components/notifcations/NtfBody";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsAsync } from "../../redux/features/app/appAsyncThunk";
import { filterNotifications } from "../../services/appServices";
import NotFound from "../../pages/NotFound"

const Notification = () => {
  const [todayNotification, setTodayNotification] = useState([]);
  const [weekNotification, setWeekNotification] = useState([]);
  const [monthNotification, setMonthNotification] = useState([]);
  const [yearNotification, setYearNotification] = useState([]);
  const { loggedInUserId, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { notifications, notificationStatus } = useSelector(
    (state) => state.app.notification
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchNotificationsAsync({ userId: loggedInUserId }));
    }
    const { today, week, month, year } = filterNotifications(notifications);
    setTodayNotification(today);
    setWeekNotification(week);
    setMonthNotification(month);
    setYearNotification(year);
  }, []);

  useEffect(() => {
    if (isLoggedIn && notificationStatus === "success") {
      const { today, week, month, year } = filterNotifications(notifications);
      setTodayNotification(today);
      setWeekNotification(week);
      setMonthNotification(month);
      setYearNotification(year);
    }
  }, [notifications]);

  return (
    <section className="flex flex-col bg-bg-primary w-[400px] h-screen rounded-lg border-r border-hover-primary text-text-primary overflow-y-auto slideModal">
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex justify-between items-center">
        <h4 className="text-2xl font-bold">Notifications</h4>
        <BellRinging size={26} className="cursor-pointer" />
      </div>

      {/* Notifications */}
      {notifications.length > 0 ? <div className="space-y-4">
        {todayNotification.length > 0 && (
          <NtfBody ntfs={todayNotification} forTime={"Today"} />
        )}
        {weekNotification.length > 0 && (
          <NtfBody ntfs={weekNotification} forTime={"This week"} />
        )}
        {monthNotification.length > 0 && (
          <NtfBody ntfs={monthNotification} forTime={"This month"} />
        )}
        {yearNotification.length > 0 && (
          <NtfBody ntfs={yearNotification} forTime={"This year"} />
        )}
      </div> : <NotFound message={"Nothing😭😭"} />}
    </section>
  );
};

export default Notification;
