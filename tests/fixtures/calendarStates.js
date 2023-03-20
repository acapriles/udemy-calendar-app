export const events = [
	{
		id: '1',
		start: new Date('2023-03-21 13:00:00'),
		end: new Date('2023-03-21 15:00:00'),
		title: 'Cumpleaños de Anderson',
		notes: 'Alguna nota',
	},
	{
		id: '2',
		start: new Date('2023-03-09 13:00:00'),
		end: new Date('2023-03-09 15:00:00'),
		title: 'Cumpleaños de Mónica',
		notes: 'Alguna nota de Mónica',
	},
];

export const initialState = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarWithEventsState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: null,
};

export const calendarWithActiveEventState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: { ...events[0] },
};
