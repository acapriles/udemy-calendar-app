import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				// Updating...
				await calendarApi.put(
					`/events/${calendarEvent.id}`,
					calendarEvent
				);
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}

			// Creating...
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(
				onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Failed to save', error.response.data.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent.id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire('Failed to delete', error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');
			const events = convertEventsToDateEvents(data.eventos);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log('Error loading events');
			console.log(error);
		}
	};

	return {
		//*Properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//*Methods
		setActiveEvent,
		startLoadingEvents,
		startSavingEvent,
		startDeletingEvent,
	};
};
