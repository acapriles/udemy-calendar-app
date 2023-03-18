import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "..";
import { localizer, getMessagesES } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

    const { user } = useAuthStore();

    const { openDateModal } = useUiStore();

    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    useEffect(() => {
        startLoadingEvents();
    }, []);

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log({event, start, end, isSelected});

        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
         // console.log({onDoubleClick: event})
         openDateModal();
    };

    const onSelect = (event) => {
         // console.log({onSelect: event})
         setActiveEvent( event );
    };

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    };


    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventStyleGetter }
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
