import { createSelector } from 'reselect';
import moment from 'moment';

const getWeeklySlots = state => state.weeklyslots;
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const getWeeklySlotsByDay = createSelector(
  [getWeeklySlots],
  (weeklyslots) => {
    if (weeklyslots.isLoading) {
      return [];
    }

    const weeklySlotsByDay = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    const startDay = moment(weeklyslots.slots[0].Start).startOf('day');
    let currentDay;
    // Group slots in the same day
    weeklyslots.slots.forEach((slot) => {
      currentDay = moment(slot.Start).startOf('day');
      weeklySlotsByDay[week[currentDay.diff(startDay, 'days')]].push(slot);
    });

    return weeklySlotsByDay;
  },
);
